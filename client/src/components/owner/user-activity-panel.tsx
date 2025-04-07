import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { 
  Users, 
  Clock, 
  CalendarDays, 
  BookOpen,
  ArrowUpRight,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Temporary mock data
const USER_ACTIVITY_OVERVIEW = [
  {
    name: "Active Users",
    value: 4523,
    icon: Users,
    change: 12.5,
    trend: "up",
    period: "month"
  },
  {
    name: "Average Session Time",
    value: 45.8,
    icon: Clock,
    change: 5.2,
    trend: "up",
    period: "month"
  },
  {
    name: "Total Study Hours",
    value: 128450,
    icon: BookOpen,
    change: 18.4,
    trend: "up",
    period: "month"
  },
  {
    name: "Active Subscriptions",
    value: 2150,
    icon: CalendarDays,
    change: 7.8,
    trend: "up",
    period: "month"
  }
];

const USER_ACTIVITY_TREND = [
  { date: "2023-09-01", activeUsers: 3850, studyHours: 97500 },
  { date: "2023-09-05", activeUsers: 3950, studyHours: 102000 },
  { date: "2023-09-10", activeUsers: 4050, studyHours: 108500 },
  { date: "2023-09-15", activeUsers: 4210, studyHours: 114000 },
  { date: "2023-09-20", activeUsers: 4380, studyHours: 120500 },
  { date: "2023-09-25", activeUsers: 4450, studyHours: 124800 },
  { date: "2023-09-30", activeUsers: 4523, studyHours: 128450 }
];

const USER_BY_ROLE = [
  { name: "Student", value: 11850, color: "#3498db" },
  { name: "Educator", value: 650, color: "#2ecc71" },
  { name: "Owner", value: 68, color: "#9b59b6" }
];

const USER_BY_SUBSCRIPTION = [
  { name: "Free", value: 8450, color: "#e74c3c" },
  { name: "Monthly Basic", value: 1850, color: "#f39c12" },
  { name: "Monthly Premium", value: 1450, color: "#3498db" },
  { name: "Annual Basic", value: 450, color: "#2ecc71" },
  { name: "Annual Premium", value: 368, color: "#9b59b6" }
];

const RECENT_ACTIVITIES = [
  {
    id: 1,
    user: {
      name: "Rahul Sharma",
      email: "rahul.s@example.com",
      avatarUrl: ""
    },
    activity: "Completed Test",
    details: "UPSC Prelims Mock Test 5",
    time: "10 minutes ago",
    score: "78%"
  },
  {
    id: 2,
    user: {
      name: "Priya Patel",
      email: "priya.p@example.com",
      avatarUrl: ""
    },
    activity: "Purchased Course",
    details: "Banking Exams Bundle",
    time: "25 minutes ago",
    amount: "₹7,500"
  },
  {
    id: 3,
    user: {
      name: "Amit Singh",
      email: "amit.s@example.com",
      avatarUrl: ""
    },
    activity: "Started Course",
    details: "SSC Advanced Course",
    time: "45 minutes ago"
  },
  {
    id: 4,
    user: {
      name: "Neha Gupta",
      email: "neha.g@example.com",
      avatarUrl: ""
    },
    activity: "Added Flashcards",
    details: "Created 25 flashcards for Economics",
    time: "1 hour ago"
  },
  {
    id: 5,
    user: {
      name: "Vikram Malhotra",
      email: "vikram.m@example.com",
      avatarUrl: ""
    },
    activity: "Completed Mock Interview",
    details: "Banking Interview Preparation",
    time: "2 hours ago",
    score: "85%"
  },
  {
    id: 6,
    user: {
      name: "Aarti Reddy",
      email: "aarti.r@example.com",
      avatarUrl: ""
    },
    activity: "Renewed Subscription",
    details: "Monthly Premium Plan",
    time: "3 hours ago",
    amount: "₹1,200"
  },
  {
    id: 7,
    user: {
      name: "Suresh Kumar",
      email: "suresh.k@example.com",
      avatarUrl: ""
    },
    activity: "Joined Study Group",
    details: "UPSC Daily Discussion Group",
    time: "5 hours ago"
  }
];

const TOP_PERFORMING_USERS = [
  {
    id: 1,
    user: {
      name: "Rahul Sharma",
      email: "rahul.s@example.com",
      avatarUrl: ""
    },
    testsCompleted: 28,
    avgScore: 92,
    studyHours: 145,
    subscription: "Annual Premium"
  },
  {
    id: 2,
    user: {
      name: "Priya Patel",
      email: "priya.p@example.com",
      avatarUrl: ""
    },
    testsCompleted: 25,
    avgScore: 89,
    studyHours: 132,
    subscription: "Annual Premium"
  },
  {
    id: 3,
    user: {
      name: "Amit Singh",
      email: "amit.s@example.com",
      avatarUrl: ""
    },
    testsCompleted: 22,
    avgScore: 86,
    studyHours: 128,
    subscription: "Monthly Premium"
  },
  {
    id: 4,
    user: {
      name: "Neha Gupta",
      email: "neha.g@example.com",
      avatarUrl: ""
    },
    testsCompleted: 20,
    avgScore: 85,
    studyHours: 120,
    subscription: "Annual Basic"
  },
  {
    id: 5,
    user: {
      name: "Vikram Malhotra",
      email: "vikram.m@example.com",
      avatarUrl: ""
    },
    testsCompleted: 18,
    avgScore: 84,
    studyHours: 115,
    subscription: "Monthly Premium"
  }
];

export default function UserActivityPanel() {
  const [timePeriod, setTimePeriod] = useState("month");
  const [currentTab, setCurrentTab] = useState("overview");
  
  const { data: userActivityData, isLoading } = useQuery({
    queryKey: ["/api/user-activity"],
    // Disabled until API is available
    enabled: false
  });

  const getActivityBadgeColor = (activity: string) => {
    switch (activity) {
      case "Completed Test":
        return "bg-green-100 text-green-800";
      case "Purchased Course":
      case "Renewed Subscription":
        return "bg-blue-100 text-blue-800";
      case "Started Course":
        return "bg-purple-100 text-purple-800";
      case "Added Flashcards":
        return "bg-yellow-100 text-yellow-800";
      case "Completed Mock Interview":
        return "bg-indigo-100 text-indigo-800";
      case "Joined Study Group":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">User Activity & Engagement</h2>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">User Activities</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="performance">Top Performers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {USER_ACTIVITY_OVERVIEW.map((item) => (
              <Card key={item.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.name}
                  </CardTitle>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {item.name === "Average Session Time" 
                      ? `${item.value} min`
                      : item.value.toLocaleString()}
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
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>
                  Breakdown by user role
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={USER_BY_ROLE}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {USER_BY_ROLE.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value.toLocaleString(), "Users"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View User Management</Button>
              </CardFooter>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Activity Trend</CardTitle>
                <CardDescription>
                  User activity for the current month
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={USER_ACTIVITY_TREND}>
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={formatDate}
                      />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        formatter={(value) => [value.toLocaleString(), ""]}
                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="activeUsers"
                        stroke="#3498db"
                        name="Active Users"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="studyHours"
                        stroke="#2ecc71"
                        name="Study Hours"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View Detailed Analytics</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activities" className="p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Activities</CardTitle>
              <CardDescription>
                Track the latest actions taken by users on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Additional Info</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RECENT_ACTIVITIES.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={activity.user.avatarUrl} />
                            <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{activity.user.name}</p>
                            <p className="text-sm text-muted-foreground">{activity.user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={getActivityBadgeColor(activity.activity)}
                        >
                          {activity.activity}
                        </Badge>
                      </TableCell>
                      <TableCell>{activity.details}</TableCell>
                      <TableCell>{activity.time}</TableCell>
                      <TableCell>
                        {activity.score && <span className="font-medium">Score: {activity.score}</span>}
                        {activity.amount && <span className="font-medium">Amount: {activity.amount}</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics" className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Distribution</CardTitle>
                <CardDescription>
                  Breakdown by subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={USER_BY_SUBSCRIPTION}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="value"
                        label={({name, value, percent}) => 
                          `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                        }
                      >
                        {USER_BY_SUBSCRIPTION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value.toLocaleString(), "Users"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View Subscription Analytics</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>
                  Users by age group
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { age: "18-24", count: 3200 },
                        { age: "25-34", count: 4800 },
                        { age: "35-44", count: 2900 },
                        { age: "45-54", count: 1500 },
                        { age: "55+", count: 440 }
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    >
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toLocaleString()} users`, "Count"]} />
                      <Bar dataKey="count" name="Users" fill="#3498db" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View Demographic Details</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Users</CardTitle>
              <CardDescription>
                Users with the highest test scores and activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Tests Completed</TableHead>
                    <TableHead>Avg. Score</TableHead>
                    <TableHead>Study Hours</TableHead>
                    <TableHead>Subscription</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TOP_PERFORMING_USERS.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.user.avatarUrl} />
                            <AvatarFallback>{user.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.testsCompleted}</TableCell>
                      <TableCell>{user.avgScore}%</TableCell>
                      <TableCell>{user.studyHours}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          {user.subscription}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline" className="w-full">View All Performance Data</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}