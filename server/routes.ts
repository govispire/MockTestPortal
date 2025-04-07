import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { Test, Question, UserTestResult, insertTestSchema, insertQuestionSchema, insertUserTestResultSchema } from "@shared/schema";

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

  const httpServer = createServer(app);

  return httpServer;
}
