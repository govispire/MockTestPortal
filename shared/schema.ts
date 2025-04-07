import { pgTable, text, serial, integer, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  role: text("role").notNull().default('student'),
});

export const usersRelations = relations(users, ({ many }) => ({
  testResults: many(userTestResults),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  role: true,
});

// Test Schema
export const tests = pgTable("tests", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"),
  duration: integer("duration").notNull(), // Duration in minutes
  numberOfQuestions: integer("number_of_questions").notNull(),
  difficulty: text("difficulty"),
  attemptCount: integer("attempt_count").default(0),
  imageUrl: text("image_url"),
});

export const testsRelations = relations(tests, ({ many }) => ({
  questions: many(questions),
  testResults: many(userTestResults),
}));

export const insertTestSchema = createInsertSchema(tests).omit({
  id: true,
});

// Question Schema
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  testId: integer("test_id").notNull(),
  text: text("text").notNull(),
  options: text("options").notNull(), // JSON string of options
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation"),
});

export const questionsRelations = relations(questions, ({ one }) => ({
  test: one(tests, {
    fields: [questions.testId],
    references: [tests.id],
  }),
}));

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

// UserTest Results Schema
export const userTestResults = pgTable("user_test_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  testId: integer("test_id").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  attemptedQuestions: integer("attempted_questions").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  incorrectAnswers: integer("incorrect_answers").notNull(),
  timeTaken: integer("time_taken").notNull(), // In seconds
  completedAt: timestamp("completed_at").notNull(),
  userAnswers: text("user_answers").notNull(), // JSON string of user answers
});

export const userTestResultsRelations = relations(userTestResults, ({ one }) => ({
  user: one(users, {
    fields: [userTestResults.userId],
    references: [users.id],
  }),
  test: one(tests, {
    fields: [userTestResults.testId],
    references: [tests.id],
  }),
}));

export const insertUserTestResultSchema = createInsertSchema(userTestResults).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Test = typeof tests.$inferSelect;
export type InsertTest = z.infer<typeof insertTestSchema>;

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export type UserTestResult = typeof userTestResults.$inferSelect;
export type InsertUserTestResult = z.infer<typeof insertUserTestResultSchema>;

// Utility types for frontend
export type QuestionOption = {
  id: string;
  text: string;
};

export type QuestionWithParsedOptions = Omit<Question, 'options'> & {
  options: QuestionOption[];
};

export type UserAnswer = {
  questionId: number;
  answerId: string;
};

export interface TestWithQuestions extends Test {
  questions: QuestionWithParsedOptions[];
}
