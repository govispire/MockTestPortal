import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Test, UserTestResult, Question, QuestionWithParsedOptions, UserAnswer } from "@shared/schema";
import { Loader2 } from "lucide-react";
import NavigationLayout from "@/components/navigation-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestProgressBar from "@/components/test-progress-bar";

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const testId = Number(id);
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("summary");

  // Fetch test
  const { data: test, isLoading: isLoadingTest } = useQuery<Test>({
    queryKey: [`/api/tests/${testId}`],
  });

  // Fetch questions
  const { data: questions, isLoading: isLoadingQuestions } = useQuery<Question[]>({
    queryKey: [`/api/tests/${testId}/questions`],
    enabled: !!testId,
  });

  // Fetch test result
  const { data: result, isLoading: isLoadingResult } = useQuery<UserTestResult>({
    queryKey: [`/api/user/results/${testId}`],
  });

  if (isLoadingTest || isLoadingQuestions || isLoadingResult) {
    return (
      <NavigationLayout>
        <div className="flex items-center justify-center min-h-[500px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </NavigationLayout>
    );
  }

  if (!test || !questions || !result) {
    return (
      <NavigationLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Result Not Found</h2>
          <p className="text-gray-600 mb-6">The test result you're looking for doesn't exist or hasn't been taken yet.</p>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </div>
      </NavigationLayout>
    );
  }

  // Parse user answers
  const userAnswers: UserAnswer[] = JSON.parse(result.userAnswers);

  // Parse question options
  const parsedQuestions: QuestionWithParsedOptions[] = questions.map(q => ({
    ...q,
    options: JSON.parse(q.options)
  }));

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScorePercentage = () => {
    return Math.round((result.score / result.totalQuestions) * 100);
  };

  const getAccuracyPercentage = () => {
    return result.attemptedQuestions > 0 
      ? Math.round((result.correctAnswers / result.attemptedQuestions) * 100) 
      : 0;
  };

  // Group questions by topics (just a mock implementation)
  const topics = {
    "Banking Awareness": { score: 85, questions: parsedQuestions.slice(0, 3) },
    "Quantitative Aptitude": { score: 72, questions: parsedQuestions.slice(3, 6) },
    "Reasoning": { score: 90, questions: parsedQuestions.slice(0, 2) },
    "English Language": { score: 65, questions: parsedQuestions.slice(2, 4) },
  };

  return (
    <NavigationLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Test Results</h2>
        <p className="text-gray-600">{test.title}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Overview */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <h3 className="text-lg font-medium text-gray-800">Your Score</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-primary">{result.score}</span>
                    <span className="ml-1 text-gray-600">/{result.totalQuestions}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Completed on {new Date(result.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="relative h-36 w-36">
                  {/* Circular progress indicator */}
                  <div className="absolute inset-0 rounded-full bg-gray-100"></div>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                      className="text-primary"
                      strokeDasharray={`${Math.min(getScorePercentage(), 100) * 2.83} 283`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{getScorePercentage()}%</div>
                      <div className="text-xs text-gray-600">Score</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Accuracy</span>
                    <span className="text-sm font-medium text-gray-700">{getAccuracyPercentage()}%</span>
                  </div>
                  <TestProgressBar value={getAccuracyPercentage()} variant="success" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Time Utilization</span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round((result.timeTaken / (test.duration * 60)) * 100)}%
                    </span>
                  </div>
                  <TestProgressBar value={Math.round((result.timeTaken / (test.duration * 60)) * 100)} variant="warning" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Questions Attempted</span>
                    <span className="text-sm font-medium text-gray-700">
                      {result.attemptedQuestions}/{result.totalQuestions}
                    </span>
                  </div>
                  <TestProgressBar 
                    value={Math.round((result.attemptedQuestions / result.totalQuestions) * 100)} 
                    variant="primary" 
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-base font-medium text-gray-700 mb-3">Performance by Topic</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(topics).map(([topic, data]) => (
                    <div key={topic} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">{topic}</span>
                        <span className="text-sm font-medium text-gray-700">{data.score}%</span>
                      </div>
                      <TestProgressBar 
                        value={data.score} 
                        variant={data.score >= 80 ? "success" : data.score >= 70 ? "primary" : "warning"} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Detail & Actions Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Performance Summary */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Questions</span>
                  <span className="text-sm font-medium text-gray-800">{result.totalQuestions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Attempted</span>
                  <span className="text-sm font-medium text-gray-800">{result.attemptedQuestions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Correct Answers</span>
                  <span className="text-sm font-medium text-green-600">{result.correctAnswers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Incorrect Answers</span>
                  <span className="text-sm font-medium text-red-600">{result.incorrectAnswers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Unattempted</span>
                  <span className="text-sm font-medium text-gray-800">
                    {result.totalQuestions - result.attemptedQuestions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Time Taken</span>
                  <span className="text-sm font-medium text-gray-800">
                    {formatTime(result.timeTaken)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button className="w-full" onClick={() => setActiveTab("detailed")}>
                  View Detailed Analysis
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary/10"
                  onClick={() => setActiveTab("questions")}
                >
                  Review All Questions
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Comparison */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">How You Compare</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Your Score</span>
                    <span className="text-xs font-medium text-gray-800">{getScorePercentage()}%</span>
                  </div>
                  <Progress value={getScorePercentage()} className="h-2 bg-gray-200" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Average Score</span>
                    <span className="text-xs font-medium text-gray-800">65%</span>
                  </div>
                  <Progress value={65} className="h-2 bg-gray-200" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Top Scorer</span>
                    <span className="text-xs font-medium text-gray-800">92%</span>
                  </div>
                  <Progress value={92} className="h-2 bg-gray-200" />
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                You scored better than 78% of all test takers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Detailed Question Analysis */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="questions">Question Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          {/* Summary content is already visible */}
        </TabsContent>
        
        <TabsContent value="questions">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Question Analysis</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Q.No
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Your Answer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Correct Answer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parsedQuestions.map((question, index) => {
                      const userAnswer = userAnswers.find(a => a.questionId === question.id);
                      const userAnswerText = userAnswer 
                        ? question.options.find(o => o.id === userAnswer.answerId)?.text 
                        : "Not answered";
                      const correctAnswerText = question.options.find(o => o.id === question.correctAnswer)?.text;
                      const isCorrect = userAnswer?.answerId === question.correctAnswer;

                      return (
                        <tr key={question.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {userAnswerText}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {correctAnswerText}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {userAnswer ? (
                              isCorrect ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Correct
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Incorrect
                                </span>
                              )
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Unattempted
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </NavigationLayout>
  );
}
