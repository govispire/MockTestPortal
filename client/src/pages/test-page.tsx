import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { Test, Question, QuestionWithParsedOptions, UserAnswer, InsertUserTestResult } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuestionNavigation from "@/components/question-navigation";
import QuestionDisplay from "@/components/question-display";
import Timer from "@/components/timer";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function TestPage() {
  const { id } = useParams<{ id: string }>();
  const testId = Number(id);
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [startTime] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch test
  const { data: test, isLoading: isLoadingTest } = useQuery<Test>({
    queryKey: [`/api/tests/${testId}`],
  });

  // Fetch questions
  const { data: questions, isLoading: isLoadingQuestions } = useQuery<Question[]>({
    queryKey: [`/api/tests/${testId}/questions`],
    enabled: !!testId,
  });

  // Parse options JSON
  const parsedQuestions: QuestionWithParsedOptions[] = questions
    ? questions.map(q => ({
        ...q,
        options: JSON.parse(q.options)
      }))
    : [];

  // Set timer based on test duration
  useEffect(() => {
    if (test?.duration) {
      setTimeRemaining(test.duration * 60); // Convert minutes to seconds
    }
  }, [test]);

  // Handle answer selection
  const handleAnswerSelect = useCallback((questionId: number, answerId: string) => {
    setUserAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex >= 0) {
        // Update existing answer
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = { questionId, answerId };
        return newAnswers;
      } else {
        // Add new answer
        return [...prev, { questionId, answerId }];
      }
    });
  }, []);

  // Navigate between questions
  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < parsedQuestions.length) {
      setCurrentQuestionIndex(index);
    }
  }, [parsedQuestions.length]);
  
  const goToNextQuestion = useCallback(() => {
    goToQuestion(currentQuestionIndex + 1);
  }, [currentQuestionIndex, goToQuestion]);
  
  const goToPreviousQuestion = useCallback(() => {
    goToQuestion(currentQuestionIndex - 1);
  }, [currentQuestionIndex, goToQuestion]);

  // Submit test
  const handleSubmitTest = async () => {
    if (!user || !test || !questions || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Calculate score and metrics
      let correctAnswers = 0;
      
      questions.forEach(question => {
        const userAnswer = userAnswers.find(a => a.questionId === question.id);
        if (userAnswer && userAnswer.answerId === question.correctAnswer) {
          correctAnswers++;
        }
      });
      
      const endTime = new Date();
      const timeTaken = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
      
      const testResult: InsertUserTestResult = {
        userId: user.id,
        testId,
        score: correctAnswers,
        totalQuestions: questions.length,
        attemptedQuestions: userAnswers.length,
        correctAnswers,
        incorrectAnswers: userAnswers.length - correctAnswers,
        timeTaken,
        completedAt: endTime,
        userAnswers: JSON.stringify(userAnswers),
      };
      
      // Submit result to API
      const response = await apiRequest("POST", "/api/user/results", testResult);
      const result = await response.json();
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/user/results"] });
      
      // Navigate to result page
      navigate(`/results/${testId}`);
      
    } catch (error) {
      console.error("Error submitting test:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your test. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle timer expiration
  const handleTimerExpired = useCallback(() => {
    toast({
      title: "Time's up!",
      description: "Your test time has ended. Submitting your answers...",
      variant: "destructive",
    });
    handleSubmitTest();
  }, [handleSubmitTest, toast]);

  if (isLoadingTest || isLoadingQuestions) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!test || !questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="p-6 max-w-md">
          <h2 className="text-xl font-semibold mb-4">Test Not Found</h2>
          <p className="mb-4">The test you're looking for doesn't exist or has no questions.</p>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  const currentQuestion = parsedQuestions[currentQuestionIndex];
  const userAnswerForCurrentQuestion = userAnswers.find(a => a.questionId === currentQuestion?.id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">{test.title}</h1>
            <div className="flex items-center">
              {timeRemaining !== null && (
                <div className="mr-4 px-3 py-1 bg-primary-50 border border-primary-200 rounded-md flex items-center">
                  <Timer 
                    initialSeconds={timeRemaining} 
                    onExpire={handleTimerExpired} 
                  />
                </div>
              )}
              <Button onClick={handleSubmitTest} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Test"}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Question Navigation (Left Sidebar) */}
          <div className="hidden lg:block lg:col-span-1">
            <QuestionNavigation
              questions={parsedQuestions}
              currentQuestionIndex={currentQuestionIndex}
              userAnswers={userAnswers}
              onQuestionClick={goToQuestion}
            />
          </div>
          
          {/* Question Content (Main Content) */}
          <div className="lg:col-span-3 mt-5 lg:mt-0">
            <Card className="p-6">
              <QuestionDisplay
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                selectedAnswerId={userAnswerForCurrentQuestion?.answerId}
                onAnswerSelect={(answerId) => handleAnswerSelect(currentQuestion.id, answerId)}
                showMobileNav
                onPrevious={currentQuestionIndex > 0 ? goToPreviousQuestion : undefined}
                onNext={currentQuestionIndex < parsedQuestions.length - 1 ? goToNextQuestion : undefined}
              />
              
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center"
                >
                  <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  Previous
                </Button>
                
                <Button
                  onClick={currentQuestionIndex < parsedQuestions.length - 1 ? goToNextQuestion : handleSubmitTest}
                  className="flex items-center"
                >
                  {currentQuestionIndex < parsedQuestions.length - 1 ? (
                    <>
                      Next
                      <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </>
                  ) : (
                    "Submit Test"
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
