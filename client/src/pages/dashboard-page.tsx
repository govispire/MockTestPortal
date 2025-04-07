import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Test, UserTestResult } from "@shared/schema";
import { useState } from "react";
import { 
  Loader2, Search, BookOpen, Clock, Target, 
  CheckCircle, PlusCircle, Calendar, Trash2,
  Library, BookMarked, LineChart, FileText, 
  Activity, Settings, LogOut, Zap, Info
} from "lucide-react";
import { Input } from "@/components/ui/input";
import NavigationLayout from "@/components/navigation-layout";
import TestCard from "@/components/test-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import PerformanceChart from "@/components/performance-chart";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Utility function to format dates
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Tests");
  const [flashcards, setFlashcards] = useState<Array<{id: number, question: string, answer: string}>>([
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    { id: 2, question: "What is the formula for calculating area of a circle?", answer: "πr²" }
  ]);
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState<Array<{id: number, text: string, completed: boolean, dueDate: string, priority: 'high' | 'medium' | 'low'}>>([
    { 
      id: 1, 
      text: "Complete Mathematics Practice Set", 
      completed: false,
      dueDate: "2025-04-10",
      priority: "high" 
    },
    { 
      id: 2, 
      text: "Review Biology Notes", 
      completed: true,
      dueDate: "2025-04-08",
      priority: "medium"
    }
  ]);

  // Mock dashboard stats
  const stats = {
    activeCourses: 4,
    studyHours: 24,
    targetExams: 3,
    latestScore: 78
  };
  
  const targetExams = [
    { id: 1, name: "Mathematics Final", dueDate: "2025-05-15", progress: 65 },
    { id: 2, name: "Physics Midterm", dueDate: "2025-04-20", progress: 45 },
    { id: 3, name: "Computer Science Project", dueDate: "2025-04-30", progress: 90 }
  ];

  // Function to add a task
  const addTask = () => {
    if (newTaskText.trim()) {
      setTasks([
        ...tasks, 
        { 
          id: Date.now(), 
          text: newTaskText, 
          completed: false,
          dueDate: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
          priority: "medium" as 'medium'
        }
      ]);
      setNewTaskText("");
    }
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Fetch tests
  const { data: tests, isLoading: isLoadingTests } = useQuery<Test[]>({
    queryKey: ["/api/tests"],
  });

  // Fetch categories
  const { data: categories, isLoading: isLoadingCategories } = useQuery<string[]>({
    queryKey: ["/api/categories"],
  });

  // Fetch user test results
  const { data: results, isLoading: isLoadingResults } = useQuery<UserTestResult[]>({
    queryKey: ["/api/user/results"],
    enabled: !!user,
  });

  const filteredTests = tests?.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          test.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Tests" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoadingTests || isLoadingCategories || isLoadingResults) {
    return (
      <NavigationLayout>
        <div className="flex items-center justify-center min-h-[500px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </NavigationLayout>
    );
  }

  return (
    <NavigationLayout>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation - only visible on larger screens */}
        <aside className="hidden lg:block w-64 shrink-0">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="pb-4">
                  <p className="text-sm font-medium text-muted-foreground">MENU</p>
                </div>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
                  <BookOpen className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
                  <Library className="h-4 w-4" />
                  <span>Courses</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
                  <BookMarked className="h-4 w-4" />
                  <span>Tests</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
                  <LineChart className="h-4 w-4" />
                  <span>Performance</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
                  <FileText className="h-4 w-4" />
                  <span>PDF Courses</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
                  <Activity className="h-4 w-4" />
                  <span>Current Affairs</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
                  <Zap className="h-4 w-4" />
                  <span>Speed Drills</span>
                </Button>
                
                <div className="py-4">
                  <p className="text-sm font-medium text-muted-foreground">ACCOUNT</p>
                </div>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
                  <Info className="h-4 w-4" />
                  <span>Help</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-red-500" onClick={() => {}}>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
        
        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Active Courses */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeCourses}</div>
                <p className="text-xs text-muted-foreground">
                  Courses in progress
                </p>
              </CardContent>
            </Card>
            
            {/* Study Hours */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.studyHours}</div>
                <p className="text-xs text-muted-foreground">
                  Total study time
                </p>
              </CardContent>
            </Card>
            
            {/* Target Exams */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Target Exams</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.targetExams}</div>
                <p className="text-xs text-muted-foreground">
                  Exams to prepare for
                </p>
              </CardContent>
            </Card>
            
            {/* Test Score */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.latestScore}%</div>
                <p className="text-xs text-muted-foreground">
                  From your last test
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Test Search, Categories and Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Target Exam Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle>Target Exam Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {targetExams.map(exam => (
                      <div key={exam.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{exam.name}</span>
                          <span className="text-sm text-muted-foreground">Due: {formatDate(exam.dueDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={exam.progress} className="h-2" />
                          <span className="text-sm font-medium">{exam.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Performance Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  {results?.length ? (
                    <div>
                      <PerformanceChart results={results} />
                      <div className="mt-2 text-sm text-muted-foreground text-center">
                        Your recent test scores
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-500">No test attempts yet</p>
                      <p className="text-xs text-gray-400 mt-1">Performance data will appear here after taking tests</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Available Tests */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Tests</CardTitle>
                  <div className="relative mt-2">
                    <Input
                      type="text"
                      placeholder="Search tests..."
                      className="pl-10 pr-4"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Test Categories */}
                  <div className="flex space-x-2 px-6 pb-4 overflow-x-auto">
                    <Button
                      variant={selectedCategory === "All Tests" ? "default" : "outline"}
                      className="rounded-full text-xs"
                      size="sm"
                      onClick={() => setSelectedCategory("All Tests")}
                    >
                      All Tests
                    </Button>
                    {categories?.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="rounded-full whitespace-nowrap text-xs"
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Test Cards */}
                  {filteredTests && filteredTests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 pt-0">
                      {filteredTests.slice(0, 4).map((test) => (
                        <TestCard key={test.id} test={test} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg mx-6 mb-6">
                      <p className="text-gray-500">No tests found matching your criteria.</p>
                    </div>
                  )}
                  
                  {filteredTests && filteredTests.length > 4 && (
                    <div className="px-6 pb-6">
                      <Button variant="outline" className="w-full">View All Tests</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Sidebars */}
            <div className="space-y-6">
              {/* Flashcards */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Flashcards</CardTitle>
                    <Button variant="ghost" size="icon">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="flashcard-1">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="flashcard-1">Card 1</TabsTrigger>
                      <TabsTrigger value="flashcard-2">Card 2</TabsTrigger>
                    </TabsList>
                    {flashcards.map((card, index) => (
                      <TabsContent key={card.id} value={`flashcard-${index + 1}`}>
                        <Card>
                          <CardContent className="p-4">
                            <Accordion type="single" collapsible>
                              <AccordionItem value="question">
                                <AccordionTrigger className="text-left">
                                  {card.question}
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-0 text-primary-foreground bg-primary rounded-md mt-2 p-3">
                                  {card.answer}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                  <div className="text-center mt-2">
                    <Button variant="link" size="sm" className="text-xs">
                      View All Flashcards
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Task Manager */}
              <Card>
                <CardHeader>
                  <CardTitle>Task Manager</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add a new task..." 
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                      />
                      <Button onClick={addTask}>Add</Button>
                    </div>
                    
                    <div className="space-y-2">
                      {tasks.map(task => (
                        <div key={task.id} className="flex items-start justify-between p-2 border rounded-md">
                          <div className="flex items-start gap-2">
                            <div className="pt-0.5">
                              <input 
                                type="checkbox" 
                                checked={task.completed} 
                                onChange={() => toggleTaskCompletion(task.id)}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                            </div>
                            <div>
                              <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {task.text}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {task.priority}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Due: {formatDate(task.dueDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-muted-foreground"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* User Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tests Taken</span>
                      <span className="text-sm font-medium">{results?.length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Score</span>
                      <span className="text-sm font-medium">
                        {results?.length 
                          ? `${Math.round(results.reduce((acc, r) => acc + (r.score / r.totalQuestions) * 100, 0) / results.length)}%` 
                          : "0%"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Time Spent</span>
                      <span className="text-sm font-medium">
                        {results?.length 
                          ? `${Math.round(results.reduce((acc, r) => acc + r.timeTaken / 3600, 0))} hrs` 
                          : "0 hrs"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
