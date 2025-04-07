import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import { 
  Users,
  Activity,
  Timer,
  Check,
  ArrowUpRight,
  Smartphone,
  Laptop,
  Clock,
  BookOpen,
  Calendar,
  Target,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Temporary mock data
const ACTIVITY_OVERVIEW = [
  {
    name: "Active Users",
    value: 3250,
    icon: Users,
    change: 12.8,
    trend: "up",
    period: "month"
  },
  {
    name: "Average Session",
    value: "24:38",
    icon: Timer,
    change: 4.2,
    trend: "up",
    period: "month"
  },
  {
    name: "Completion Rate",
    value: 72.5,
    icon: Check,
    change: 8.3,
    trend: "up",
    period: "month"
  },
  {
    name: "Engagement",
    value: 85.4,
    icon: Activity,
    change: 5.7,
    trend: "up",
    period: "month"
  }
];

const DAILY_USERS = [
  { day: "Mon", users: 1850 },
  { day: "Tue", users: 2250 },
  { day: "Wed", users: 1950 },
  { day: "Thu", users: 1820 },
  { day: "Fri", users: 2100 },
  { day: "Sat", users: 3150 },
  { day: "Sun", users: 2850 }
];

const USER_DEVICES = [
  { name: "Mobile", value: 65, color: "#3498db" },
  { name: "Desktop", value: 28, color: "#2ecc71" },
  { name: "Tablet", value: 7, color: "#9b59b6" }
];

const USER_ACTIVITY_TIMES = [
  { hour: "00:00", users: 250 },
  { hour: "02:00", users: 120 },
  { hour: "04:00", users: 80 },
  { hour: "06:00", users: 180 },
  { hour: "08:00", users: 780 },
  { hour: "10:00", users: 1250 },
  { hour: "12:00", users: 1350 },
  { hour: "14:00", users: 1450 },
  { hour: "16:00", users: 1680 },
  { hour: "18:00", users: 2150 },
  { hour: "20:00", users: 1950 },
  { hour: "22:00", users: 850 }
];

const COURSE_POPULARITY = [
  {
    id: 1,
    name: "UPSC Complete Course",
    category: "UPSC",
    enrollments: 2450,
    activeUsers: 1840,
    completion: 72
  },
  {
    id: 2,
    name: "Banking Exams Bundle",
    category: "Banking",
    enrollments: 1850,
    activeUsers: 1260,
    completion: 68
  },
  {
    id: 3,
    name: "SSC Advanced",
    category: "SSC",
    enrollments: 1450,
    activeUsers: 980,
    completion: 75
  },
  {
    id: 4,
    name: "Railway Exam Prep",
    category: "Railway",
    enrollments: 1250,
    activeUsers: 840,
    completion: 64
  },
  {
    id: 5,
    name: "Current Affairs Monthly",
    category: "General",
    enrollments: 2850,
    activeUsers: 2450,
    completion: 88
  }
];

const USER_DEMOGRAPHICS = [
  {
    id: 1,
    gender: "Male",
    percentage: 58,
    count: 7280
  },
  {
    id: 2,
    gender: "Female",
    percentage: 41,
    count: 5150
  },
  {
    id: 3,
    gender: "Other",
    percentage: 1,
    count: 138
  }
];

const AGE_DISTRIBUTION = [
  { age: "18-24", users: 4850 },
  { age: "25-34", users: 5680 },
  { age: "35-44", users: 1450 },
  { age: "45-54", users: 420 },
  { age: "55+", users: 168 }
];

const TOP_EXAM_TARGETS = [
  {
    id: 1,
    name: "UPSC Civil Services",
    users: 3850,
    percentage: 30.6
  },
  {
    id: 2,
    name: "Bank PO/Clerk",
    users: 2950,
    percentage: 23.5
  },
  {
    id: 3,
    name: "SSC CGL",
    users: 1850,
    percentage: 14.7
  },
  {
    id: 4,
    name: "Railway NTPC",
    users: 1450,
    percentage: 11.5
  },
  {
    id: 5,
    name: "State PSC",
    users: 1250,
    percentage: 9.9
  },
  {
    id: 6,
    name: "Other Exams",
    users: 1218,
    percentage: 9.8
  }
];

const ACHIEVEMENT_MILESTONES = [
  {
    id: 1,
    name: "Tests Completed",
    value: 845250,
    icon: Check
  },
  {
    id: 2,
    name: "Study Hours",
    value: 7245680,
    icon: Clock
  },
  {
    id: 3,
    name: "Courses Completed",
    value: 152450,
    icon: BookOpen
  },
  {
    id: 4,
    name: "Mock Exams Taken",
    value: 354280,
    icon: Calendar
  },
  {
    id: 5,
    name: "Target Exams Achieved",
    value: 24580,
    icon: Target
  },
  {
    id: 6,
    name: "Top Ranks",
    value: 5450,
    icon: Award
  }
];

export default function UserActivityPanel() {
  const [timePeriod, setTimePeriod] = useState("week");
  const [currentTab, setCurrentTab] = useState("overview");
  
  const { data: activityData, isLoading } = useQuery({
    queryKey: ["/api/activity"],
    // Disabled until API is available
    enabled: false
  });

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">User Activity Metrics</h2>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ACTIVITY_OVERVIEW.map((item) => (
              <Card key={item.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.name}
                  </CardTitle>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {typeof item.value === "number" 
                      ? (item.name.includes("Rate") || item.name.includes("Engagement")
                          ? `${item.value}%`
                          : formatNumber(item.value))
                      : item.value}
                  </div>
                  <div className="flex items-center pt-1">
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                    <p className="text-xs text-green-500">
                      {item.change}% from previous {item.period}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Daily Active Users</CardTitle>
                <CardDescription>
                  User activity over the past week
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={DAILY_USERS}
                      margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} users`, ""]} />
                      <Bar 
                        dataKey="users" 
                        fill="#8884d8" 
                        radius={[4, 4, 0, 0]} 
                        name="Active Users"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>
                  Distribution of users by device type
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={USER_DEVICES}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {USER_DEVICES.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="space-x-4 border-t p-4">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <span className="text-sm">Mobile</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Laptop className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Desktop</span>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Peak Usage Hours</CardTitle>
                <CardDescription>
                  Number of active users throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={USER_ACTIVITY_TIMES}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} users`, ""]} />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#8884d8" 
                        fill="url(#colorUsers)" 
                        name="Active Users"
                      />
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="grid grid-cols-4 w-full gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Peak Hour</p>
                    <p className="text-lg font-medium">18:00</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Max Users</p>
                    <p className="text-lg font-medium">2,150</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Avg. Daily Users</p>
                    <p className="text-lg font-medium">1,250</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Active Time</p>
                    <p className="text-lg font-medium">24:38</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="courses" className="p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Popularity</CardTitle>
              <CardDescription>
                User engagement across different courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Enrollments</TableHead>
                    <TableHead>Active Users</TableHead>
                    <TableHead>Completion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {COURSE_POPULARITY.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          {course.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.enrollments.toLocaleString()}</TableCell>
                      <TableCell>{course.activeUsers.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-2">{course.completion}%</span>
                          <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${course.completion}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline" className="w-full">View All Courses</Button>
            </CardFooter>
          </Card>
          
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popular Exam Targets</CardTitle>
                <CardDescription>
                  Distribution of users by target examination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {TOP_EXAM_TARGETS.map((exam) => (
                    <div key={exam.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{exam.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {exam.users.toLocaleString()} users ({exam.percentage}%)
                        </span>
                      </div>
                      <Progress 
                        value={exam.percentage} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View Detailed Reports</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Achievement Milestones</CardTitle>
                <CardDescription>
                  Cumulative user achievements on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {ACHIEVEMENT_MILESTONES.map((milestone) => (
                    <div key={milestone.id} className="flex items-start space-x-3 p-3 border rounded-md">
                      <milestone.icon className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
                      <div>
                        <h4 className="text-sm font-medium">{milestone.name}</h4>
                        <p className="text-xl font-bold">
                          {milestone.value >= 1000000
                            ? `${(milestone.value / 1000000).toFixed(1)}M`
                            : milestone.value >= 1000
                            ? `${(milestone.value / 1000).toFixed(1)}K`
                            : milestone.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="demographics" className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>
                  User breakdown by gender
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {USER_DEMOGRAPHICS.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.gender}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.count.toLocaleString()} ({item.percentage}%)
                        </span>
                      </div>
                      <Progress 
                        value={item.percentage} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">Gender Analysis Report</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>
                  User breakdown by age group
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={AGE_DISTRIBUTION}
                      margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toLocaleString()} users`, ""]} />
                      <Bar 
                        dataKey="users" 
                        fill="#8884d8" 
                        radius={[4, 4, 0, 0]} 
                        name="Users"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">Age Demographics Report</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Geographical Distribution</CardTitle>
                <CardDescription>
                  Top regions by user count
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Delhi NCR</TableCell>
                      <TableCell>2,845</TableCell>
                      <TableCell>22.6%</TableCell>
                      <TableCell className="text-green-500">+15.4%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Maharashtra</TableCell>
                      <TableCell>1,985</TableCell>
                      <TableCell>15.8%</TableCell>
                      <TableCell className="text-green-500">+12.1%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Karnataka</TableCell>
                      <TableCell>1,550</TableCell>
                      <TableCell>12.3%</TableCell>
                      <TableCell className="text-green-500">+18.7%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Uttar Pradesh</TableCell>
                      <TableCell>1,420</TableCell>
                      <TableCell>11.3%</TableCell>
                      <TableCell className="text-green-500">+22.5%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tamil Nadu</TableCell>
                      <TableCell>1,280</TableCell>
                      <TableCell>10.2%</TableCell>
                      <TableCell className="text-green-500">+9.8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Others</TableCell>
                      <TableCell>3,488</TableCell>
                      <TableCell>27.8%</TableCell>
                      <TableCell className="text-green-500">+14.2%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-between">
                <Button variant="outline">View All Regions</Button>
                <Button variant="outline">Map View</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}