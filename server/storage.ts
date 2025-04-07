import { 
  User, 
  InsertUser, 
  Test, 
  InsertTest, 
  Question, 
  InsertQuestion, 
  UserTestResult, 
  InsertUserTestResult,
  users,
  tests,
  questions,
  userTestResults
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import { pool } from "./db";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, userData: Partial<User>): Promise<User>;
  deleteUser(id: number): Promise<boolean>;
  
  // Test methods
  getAllTests(): Promise<Test[]>;
  getTestById(id: number): Promise<Test | undefined>;
  createTest(test: InsertTest): Promise<Test>;
  incrementTestAttemptCount(id: number): Promise<void>;
  
  // Question methods
  getQuestionById(id: number): Promise<Question | undefined>;
  getQuestionsByTestId(testId: number): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // Result methods
  getUserTestResults(userId: number): Promise<UserTestResult[]>;
  getUserTestResultByTestId(userId: number, testId: number): Promise<UserTestResult | undefined>;
  createUserTestResult(result: InsertUserTestResult): Promise<UserTestResult>;
  
  // Category methods
  getAllCategories(): Promise<string[]>;
  
  // Session store
  sessionStore: any; // Using any for session store to avoid TypeScript issues
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tests: Map<number, Test>;
  private questions: Map<number, Question>;
  private userTestResults: Map<number, UserTestResult>;
  sessionStore: any; // Using any for session store to avoid TypeScript issues
  
  private userIdCounter: number;
  private testIdCounter: number;
  private questionIdCounter: number;
  private resultIdCounter: number;

  constructor() {
    this.users = new Map();
    this.tests = new Map();
    this.questions = new Map();
    this.userTestResults = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    this.userIdCounter = 1;
    this.testIdCounter = 1;
    this.questionIdCounter = 1;
    this.resultIdCounter = 1;
    
    // Initialize with sample tests and questions
    this.initSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    
    // Create updated user
    const updatedUser: User = { ...user, ...userData, id };
    this.users.set(id, updatedUser);
    
    return updatedUser;
  }
  
  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }
  
  // Test methods
  async getAllTests(): Promise<Test[]> {
    return Array.from(this.tests.values());
  }
  
  async getTestById(id: number): Promise<Test | undefined> {
    return this.tests.get(id);
  }
  
  async createTest(test: InsertTest): Promise<Test> {
    const id = this.testIdCounter++;
    const newTest: Test = { ...test, id, attemptCount: 0 };
    this.tests.set(id, newTest);
    return newTest;
  }
  
  async incrementTestAttemptCount(id: number): Promise<void> {
    const test = this.tests.get(id);
    if (test) {
      test.attemptCount = (test.attemptCount || 0) + 1;
      this.tests.set(id, test);
    }
  }
  
  // Question methods
  async getQuestionById(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }
  
  async getQuestionsByTestId(testId: number): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(
      (question) => question.testId === testId
    );
  }
  
  async createQuestion(question: InsertQuestion): Promise<Question> {
    const id = this.questionIdCounter++;
    const newQuestion: Question = { ...question, id };
    this.questions.set(id, newQuestion);
    return newQuestion;
  }
  
  // Result methods
  async getUserTestResults(userId: number): Promise<UserTestResult[]> {
    return Array.from(this.userTestResults.values()).filter(
      (result) => result.userId === userId
    );
  }
  
  async getUserTestResultByTestId(userId: number, testId: number): Promise<UserTestResult | undefined> {
    return Array.from(this.userTestResults.values()).find(
      (result) => result.userId === userId && result.testId === testId
    );
  }
  
  async createUserTestResult(result: InsertUserTestResult): Promise<UserTestResult> {
    const id = this.resultIdCounter++;
    const newResult: UserTestResult = { ...result, id };
    this.userTestResults.set(id, newResult);
    return newResult;
  }
  
  // Category methods
  async getAllCategories(): Promise<string[]> {
    const categoriesSet = new Set<string>();
    
    for (const test of this.tests.values()) {
      if (test.category) {
        categoriesSet.add(test.category);
      }
    }
    
    return Array.from(categoriesSet);
  }
  
  // Initialize sample data
  private initSampleData() {
    // Sample tests
    const tests: InsertTest[] = [
      {
        title: "Banking Exam - Set 1",
        description: "Comprehensive test covering banking fundamentals, financial awareness, and banking regulations.",
        category: "Banking",
        duration: 45,
        numberOfQuestions: 100,
        difficulty: "Moderate",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
      },
      {
        title: "Government Service - Set 2",
        description: "Test your knowledge of government procedures, policies, and administrative skills.",
        category: "Government",
        duration: 60,
        numberOfQuestions: 150,
        difficulty: "Hard",
        imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
      },
      {
        title: "Aptitude Training",
        description: "Basic aptitude test to improve your numerical and logical reasoning skills.",
        category: "Entrance Exams",
        duration: 30,
        numberOfQuestions: 50,
        difficulty: "Easy",
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
      },
      {
        title: "Complete Mock Test",
        description: "Comprehensive test covering all topics for competitive exams preparation.",
        category: "Certification",
        duration: 90,
        numberOfQuestions: 200,
        difficulty: "Hard",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
      }
    ];
    
    tests.forEach(test => {
      const id = this.testIdCounter++;
      this.tests.set(id, { ...test, id, attemptCount: Math.floor(Math.random() * 5000) });
    });
    
    // Sample questions
    const bankingOptions1 = JSON.stringify([
      { id: "a", text: "Money Market" },
      { id: "b", text: "Capital Market" },
      { id: "c", text: "Foreign Exchange Market" },
      { id: "d", text: "Derivative Market" }
    ]);
    
    const bankingOptions2 = JSON.stringify([
      { id: "a", text: "SLF-MF" },
      { id: "b", text: "TLTRO" },
      { id: "c", text: "LTRO" },
      { id: "d", text: "MSF" }
    ]);
    
    const bankingOptions3 = JSON.stringify([
      { id: "a", text: "Banker to the Government" },
      { id: "b", text: "Issuing currency notes" },
      { id: "c", text: "Approving infrastructure projects" },
      { id: "d", text: "Regulation of foreign exchange" }
    ]);
    
    const questions: InsertQuestion[] = [
      {
        testId: 1,
        text: "Which of the following is the financial market where borrowing and lending take place for one year or less?",
        options: bankingOptions1,
        correctAnswer: "a",
        explanation: "The Money Market is a segment of the financial market where financial instruments with high liquidity and short-term maturities (less than one year) are traded."
      },
      {
        testId: 1,
        text: "What is the name of RBI's special liquidity facility for mutual funds introduced in April 2020?",
        options: bankingOptions2,
        correctAnswer: "a",
        explanation: "Special Liquidity Facility for Mutual Funds (SLF-MF) was announced by RBI on April 27, 2020, to ease liquidity pressures on Mutual Funds."
      },
      {
        testId: 1,
        text: "Which of the following is NOT a function of the Reserve Bank of India?",
        options: bankingOptions3,
        correctAnswer: "c",
        explanation: "Approving infrastructure projects is primarily a function of the government planning bodies or specialized infrastructure financing institutions, not the RBI."
      }
    ];
    
    questions.forEach(question => {
      const id = this.questionIdCounter++;
      this.questions.set(id, { ...question, id });
    });
  }
}

export class DatabaseStorage implements IStorage {
  sessionStore: any; // Using any for session store to avoid TypeScript issues

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
  
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    // Remove id from the update data if it exists
    const { id: _, ...updateData } = userData;
    
    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    
    if (!updatedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    
    return updatedUser;
  }
  
  async deleteUser(id: number): Promise<boolean> {
    const result = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id });
    
    return result.length > 0;
  }

  // Test methods
  async getAllTests(): Promise<Test[]> {
    return await db.select().from(tests);
  }

  async getTestById(id: number): Promise<Test | undefined> {
    const [test] = await db.select().from(tests).where(eq(tests.id, id));
    return test;
  }

  async createTest(test: InsertTest): Promise<Test> {
    const [newTest] = await db.insert(tests).values(test).returning();
    return newTest;
  }

  async incrementTestAttemptCount(id: number): Promise<void> {
    const [test] = await db.select().from(tests).where(eq(tests.id, id));
    if (test) {
      await db.update(tests)
        .set({ attemptCount: (test.attemptCount || 0) + 1 })
        .where(eq(tests.id, id));
    }
  }

  // Question methods
  async getQuestionById(id: number): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question;
  }

  async getQuestionsByTestId(testId: number): Promise<Question[]> {
    return await db.select().from(questions).where(eq(questions.testId, testId));
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [newQuestion] = await db.insert(questions).values(question).returning();
    return newQuestion;
  }

  // Result methods
  async getUserTestResults(userId: number): Promise<UserTestResult[]> {
    return await db.select().from(userTestResults).where(eq(userTestResults.userId, userId));
  }

  async getUserTestResultByTestId(userId: number, testId: number): Promise<UserTestResult | undefined> {
    const [result] = await db.select().from(userTestResults).where(
      and(
        eq(userTestResults.userId, userId),
        eq(userTestResults.testId, testId)
      )
    );
    return result;
  }

  async createUserTestResult(result: InsertUserTestResult): Promise<UserTestResult> {
    const [newResult] = await db.insert(userTestResults).values(result).returning();
    return newResult;
  }

  // Category methods
  async getAllCategories(): Promise<string[]> {
    const results = await db.select({ category: tests.category }).from(tests);
    
    // Filter out duplicates and nulls
    const categories = results
      .map(row => row.category)
      .filter((category): category is string => category !== null && category !== undefined);
    
    // Return unique categories
    return Array.from(new Set(categories));
  }
}

// Switch from MemStorage to DatabaseStorage
export const storage = new DatabaseStorage();
