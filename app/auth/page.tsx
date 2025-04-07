'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../../client/src/components/ui/card';
import { Button } from '../../client/src/components/ui/button';
import { Input } from '../../client/src/components/ui/input';
import { Label } from '../../client/src/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../client/src/components/ui/tabs';
import { useToast } from '../../client/src/hooks/use-toast';

// Login form schema
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Register form schema
const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  role: z.enum(["student", "educator", "owner"]).default("student"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      role: 'student',
    },
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          // If authenticated, redirect to dashboard
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error checking authentication status', error);
      }
    };
    
    checkAuth();
  }, [router]);

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'You have been logged in.',
        });
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        toast({
          title: 'Login failed',
          description: errorData.error || 'Invalid username or password',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Your account has been created.',
        });
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        toast({
          title: 'Registration failed',
          description: errorData.error || 'Could not create account',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Authentication form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            MockPrep
          </h1>
          <p className="text-muted-foreground mb-8 text-center">Your Mock Test Preparation Platform</p>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>
                    Login to access your mock tests and track your progress
                  </CardDescription>
                </CardHeader>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <div className="relative">
                        <Input
                          id="username"
                          type="text"
                          placeholder="Enter your username"
                          {...loginForm.register('username')}
                          className="pl-10"
                        />
                        <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      </div>
                      {loginForm.formState.errors.username && (
                        <p className="text-sm text-red-500">{loginForm.formState.errors.username.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          {...loginForm.register('password')}
                          className="pl-10 pr-10"
                        />
                        <Lock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            {/* Register Tab */}
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Sign up to start preparing for your exams
                  </CardDescription>
                </CardHeader>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <div className="relative">
                        <Input
                          id="register-username"
                          type="text"
                          placeholder="Choose a username"
                          {...registerForm.register('username')}
                          className="pl-10"
                        />
                        <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      </div>
                      {registerForm.formState.errors.username && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.username.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showRegisterPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          {...registerForm.register('password')}
                          className="pl-10 pr-10"
                        />
                        <Lock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        >
                          {showRegisterPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name (Optional)</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        {...registerForm.register('name')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Optional)</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          {...registerForm.register('email')}
                          className="pl-10"
                        />
                        <Mail className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      </div>
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Creating account...' : 'Create account'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Right side - Hero section */}
      <div className="flex-1 bg-gradient-to-br from-primary to-blue-700 p-8 flex flex-col justify-center items-center text-white order-first md:order-last">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prepare for Success</h2>
          <p className="mb-6">
            MockPrep helps you excel in your exams with our interactive mock tests, 
            performance tracking, and personalized study plans.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Practice Tests</h3>
              <p className="text-sm">
                Access hundreds of mock tests across various subjects and difficulty levels
              </p>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Performance Analytics</h3>
              <p className="text-sm">
                Track your progress with detailed insights and improvement suggestions
              </p>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Study Resources</h3>
              <p className="text-sm">
                Access PDF courses, flashcards, and other study materials
              </p>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Speed Drills</h3>
              <p className="text-sm">
                Improve your time management with targeted practice exercises
              </p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-4xl font-bold">10,000+</div>
              <div className="text-sm">Practice Questions</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold">500+</div>
              <div className="text-sm">Mock Tests</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold">50,000+</div>
              <div className="text-sm">Happy Students</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}