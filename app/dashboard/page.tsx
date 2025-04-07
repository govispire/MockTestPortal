'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { 
  BookOpen, Library, BookMarked, Calendar, 
  LineChart, FileText, Activity, Zap, 
  Settings, Info, LogOut, Menu, X, Target,
  Clock, CheckCircle, Search, PlusCircle, Trash2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../client/src/components/ui/card';
import { Button } from '../../client/src/components/ui/button';
import { Progress } from '../../client/src/components/ui/progress';
import { Input } from '../../client/src/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../client/src/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../client/src/components/ui/accordion';
import { Test, User, UserTestResult } from '../types';

const NavigationLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          // If not authenticated, redirect to login
          router.push('/auth');
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
        router.push('/auth');
      }
    };
    
    fetchUser();
  }, [router]);
  
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        router.push('/auth');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  
  const getInitials = () => {
    if (!user) return "";
    if (user.name) {
      return user.name.split(" ")
        .map(name => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user.username.slice(0, 2).toUpperCase();
  };
  
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Courses", path: "/courses", icon: <Library className="h-4 w-4" /> },
    { name: "Tests", path: "/tests", icon: <BookMarked className="h-4 w-4" /> },
    { name: "Calendar", path: "/calendar", icon: <Calendar className="h-4 w-4" /> },
    { name: "Performance", path: "/performance", icon: <LineChart className="h-4 w-4" /> },
    { name: "PDF Courses", path: "/pdf-courses", icon: <FileText className="h-4 w-4" /> },
    { name: "Current Affairs", path: "/current-affairs", icon: <Activity className="h-4 w-4" /> },
    { name: "Speed Drills", path: "/speed-drills", icon: <Zap className="h-4 w-4" /> },
  ];
  
  const accountItems = [
    { name: "Settings", path: "/settings", icon: <Settings className="h-4 w-4" /> },
    { name: "Help", path: "/help", icon: <Info className="h-4 w-4" /> },
  ];

  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 
                  className="text-2xl font-bold text-primary cursor-pointer" 
                  onClick={() => router.push('/dashboard')}
                >
                  MockPrep
                </h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.slice(0, 3).map(item => (
                <Button 
                  key={item.path}
                  variant={router.pathname === item.path ? "default" : "ghost"} 
                  onClick={() => router.push(item.path)}
                  className="gap-2"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Button>
              ))}
              
              <div className="ml-3 flex items-center gap-1">
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                  onClick={() => router.push('/profile')}
                >
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white">
                    {getInitials()}
                  </div>
                  <span>{user?.name || user?.username}</span>
                </button>
                <button 
                  className="text-red-500 hover:text-red-700 px-3 py-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1 px-2">
              {menuItems.map(item => (
                <Button 
                  key={item.path}
                  variant="ghost"
                  className="w-full justify-start gap-2" 
                  onClick={() => {
                    router.push(item.path);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                    {getInitials()}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name || user?.username}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    router.push('/profile');
                    setIsMenuOpen(false);
                  }}
                >
                  <Settings className="h-4 w-4" />
                  <span>Your Profile</span>
                </Button>
                {accountItems.map(item => (
                  <Button 
                    key={item.path}
                    variant="ghost" 
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      router.push(item.path);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Button>
                ))}
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-red-500"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function DashboardPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Tests");
  const [user, setUser] = useState<User | null>(null);
  const [tests, setTests] = useState<Test[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [results, setResults] = useState<UserTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch user data
        const userRes = await fetch('/api/user');
        if (!userRes.ok) {
          router.push('/auth');
          return;
        }
        const userData = await userRes.json();
        setUser(userData);
        
        // Fetch tests
        const testsRes = await fetch('/api/tests');
        if (testsRes.ok) {
          const testsData = await testsRes.json();
          setTests(testsData);
        }
        
        // Fetch categories
        const categoriesRes = await fetch('/api/categories');
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
        
        // Fetch results
        const resultsRes = await fetch('/api/user/results');
        if (resultsRes.ok) {
          const resultsData = await resultsRes.json();
          setResults(resultsData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [router]);

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

  const filteredTests = tests?.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          test.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Tests" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <NavigationLayout>
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
        </div>
      </NavigationLayout>
    );
  }

  const TestCard = ({ test }: { test: Test }) => {
    const handleStartTest = () => {
      router.push(`/test/${test.id}`);
    };
  
    return (
      <Card className="overflow-hidden flex flex-col">
        <div className="relative h-36 bg-primary-100">
          {test.imageUrl && (
            <img 
              src={test.imageUrl} 
              alt={`${test.title} cover`} 
              className="w-full h-full object-cover" 
            />
          )}
          <div className="absolute bottom-0 right-0 bg-primary text-white px-3 py-1 text-sm">
            {test.duration} min
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{test.title}</h3>
          <p className="text-sm text-gray-600 mb-3">
            {test.numberOfQuestions} questions · {test.difficulty} difficulty
          </p>
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center">
              <Activity className="text-secondary h-4 w-4 mr-1" />
              <span className="text-xs text-gray-600">
                {test.attemptCount?.toLocaleString() || 0} attempts
              </span>
            </div>
            <Button onClick={handleStartTest} size="sm">
              Start Test
            </Button>
          </div>
        </div>
      </Card>
    );
  };

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
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push('/dashboard')}>
                  <BookOpen className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push('/courses')}>
                  <Library className="h-4 w-4" />
                  <span>Courses</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push('/tests')}>
                  <BookMarked className="h-4 w-4" />
                  <span>Tests</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push('/calendar')}>
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push('/performance')}>
                  <LineChart className="h-4 w-4" />
                  <span>Performance</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push('/pdf-courses')}>
                  <FileText className="h-4 w-4" />
                  <span>PDF Courses</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push('/current-affairs')}>
                  <Activity className="h-4 w-4" />
                  <span>Current Affairs</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push('/speed-drills')}>
                  <Zap className="h-4 w-4" />
                  <span>Speed Drills</span>
                </Button>
                
                <div className="py-4">
                  <p className="text-sm font-medium text-muted-foreground">ACCOUNT</p>
                </div>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push('/settings')}>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push('/help')}>
                  <Info className="h-4 w-4" />
                  <span>Help</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-red-500" 
                  onClick={handleLogout}
                >
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
                      <div className="h-48 w-full bg-gray-100 flex items-center justify-center rounded-md">
                        <p className="text-gray-500">Performance Chart Placeholder</p>
                      </div>
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
                      <Button variant="outline" className="w-full" onClick={() => router.push('/tests')}>
                        View All Tests
                      </Button>
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
                    <Button variant="link" size="sm" className="text-xs" onClick={() => router.push('/flashcards')}>
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