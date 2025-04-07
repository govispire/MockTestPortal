import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "mocktestplatform-secret",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Fix: Use correct LocalStrategy implementation for Passport 0.7.0
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        try {
          const user = await storage.getUserByUsername(username);
          
          if (!user) {
            console.log(`Login attempt failed: No user found with username ${username}`);
            return done(null, false, { message: 'Incorrect username or password' });
          }
          
          const isPasswordValid = await comparePasswords(password, user.password);
          
          if (!isPasswordValid) {
            console.log(`Login attempt failed: Invalid password for user ${username}`);
            return done(null, false, { message: 'Incorrect username or password' });
          }
          
          console.log(`User authenticated successfully: ${username}`);
          return done(null, user);
        } catch (error) {
          console.error('Authentication error:', error);
          return done(error);
        }
      }
    )
  );

  // Serialize the user ID to the session
  passport.serializeUser((user: Express.User, done) => {
    console.log(`Serializing user: ${user.username} (${user.id})`);
    done(null, user.id);
  });

  // Deserialize the user from the session
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      if (!user) {
        console.log(`Deserialization failed: No user found with ID ${id}`);
        return done(null, false);
      }
      console.log(`Deserialized user: ${user.username} (${user.id})`);
      done(null, user);
    } catch (error) {
      console.error('Deserialization error:', error);
      done(error);
    }
  });

  // Registration endpoint
  app.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).send("Username already exists");
      }

      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      req.login(user, (err) => {
        if (err) return next(err);
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).send("Registration failed");
    }
  });

  // Login endpoint
  app.post("/api/login", (req, res, next) => {
    // @ts-ignore - Passport types are a bit outdated
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Login error:', err);
        return next(err);
      }
      
      if (!user) {
        return res.status(401).json({ message: info?.message || 'Login failed' });
      }
      
      req.login(user, (err) => {
        if (err) {
          console.error('Session error:', err);
          return next(err);
        }
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        return res.status(200).json(userWithoutPassword);
      });
    })(req, res, next);
  });

  // Logout endpoint
  app.post("/api/logout", (req, res, next) => {
    const username = req.user ? (req.user as Express.User).username : 'unknown';
    console.log(`Logging out user: ${username}`);
    
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destruction error:', err);
          return next(err);
        }
        res.clearCookie('connect.sid');
        res.sendStatus(200);
      });
    });
  });

  // User info endpoint
  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      console.log('User not authenticated');
      return res.sendStatus(401);
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user as Express.User;
    res.json(userWithoutPassword);
  });
}
