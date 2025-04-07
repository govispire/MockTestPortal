import express, { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, hashPassword } from "./auth";
import { z } from "zod";
import { Test, Question, UserTestResult, User, insertTestSchema, insertQuestionSchema, insertUserTestResultSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Tests routes
  app.get("/api/tests", async (req, res) => {
    try {
      const tests = await storage.getAllTests();
      res.json(tests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tests" });
    }
  });

  app.get("/api/tests/:id", async (req, res) => {
    try {
      const testId = parseInt(req.params.id);
      const test = await storage.getTestById(testId);
      
      if (!test) {
        return res.status(404).json({ error: "Test not found" });
      }
      
      res.json(test);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch test" });
    }
  });

  app.post("/api/tests", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const testData = insertTestSchema.parse(req.body);
      const newTest = await storage.createTest(testData);
      res.status(201).json(newTest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create test" });
    }
  });

  // Questions routes
  app.get("/api/tests/:testId/questions", async (req, res) => {
    try {
      const testId = parseInt(req.params.testId);
      const questions = await storage.getQuestionsByTestId(testId);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.post("/api/questions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const questionData = insertQuestionSchema.parse(req.body);
      const newQuestion = await storage.createQuestion(questionData);
      res.status(201).json(newQuestion);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create question" });
    }
  });

  // Test results routes
  app.get("/api/user/results", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.user!.id;
      const results = await storage.getUserTestResults(userId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch results" });
    }
  });

  app.get("/api/user/results/:testId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.user!.id;
      const testId = parseInt(req.params.testId);
      const result = await storage.getUserTestResultByTestId(userId, testId);
      
      if (!result) {
        return res.status(404).json({ error: "Result not found" });
      }
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch result" });
    }
  });

  app.post("/api/user/results", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.user!.id;
      const resultData = insertUserTestResultSchema.parse({
        ...req.body,
        userId
      });
      
      const newResult = await storage.createUserTestResult(resultData);
      
      // Update test attempt count
      await storage.incrementTestAttemptCount(resultData.testId);
      
      res.status(201).json(newResult);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to save test result" });
    }
  });

  // Categories endpoint
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // User management endpoints - Only accessible by Owner role
  
  // Middleware to check if user is an Owner
  const isOwner = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    if (req.user?.role !== 'owner') {
      return res.status(403).json({ error: "Access denied. Only owners can manage users." });
    }
    
    next();
  };
  
  // Get all users (Owner only)
  app.get("/api/admin/users", isOwner, async (req, res) => {
    try {
      // We'll need to add this method to storage
      const users = await storage.getAllUsers();
      
      // Remove passwords before sending
      const safeUsers = users.map((user: User) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.json(safeUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  
  // Create a new admin/employee user (Owner only)
  app.post("/api/admin/users", isOwner, async (req, res) => {
    try {
      const { role } = req.body;
      
      // Validate role - only allow 'admin' or 'employee' creation through this endpoint
      if (role !== 'admin' && role !== 'employee') {
        return res.status(400).json({ 
          error: "Invalid role. Only 'admin' or 'employee' roles can be created." 
        });
      }
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      // Create the user
      const userData = insertUserSchema.parse({
        ...req.body,
        password: await hashPassword(req.body.password)
      });
      
      const newUser = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error('Error creating user:', error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });
  
  // Update a user (Owner only)
  app.patch("/api/admin/users/:id", isOwner, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      // Get the existing user
      const existingUser = await storage.getUser(userId);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // We'll need to add this method to storage
      const updatedUser = await storage.updateUser(userId, req.body);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });
  
  // Delete a user (Owner only)
  app.delete("/api/admin/users/:id", isOwner, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      // We'll need to add this method to storage
      const deleted = await storage.deleteUser(userId);
      
      if (!deleted) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
