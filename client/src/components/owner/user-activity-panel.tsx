import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Activity, Users, BookOpen, Clock } from "lucide-react";

export default function UserActivityPanel() {
  const [timeRange, setTimeRange] = useState("weekly");

  // Mock data for demonstration
  const activeUserData = {
    daily: 78,
    weekly: 549,
    monthly: 2345,
    yearly: 28500
  };

  const loggedInUserData = {
    daily: 128,
    weekly: 892,
    monthly: 3780,
    yearly: 45600
  };

  const purchasesData = [
    { name: "Purchased", value: 63, color: "#4ade80" },
    { name: "Free Only", value: 37, color: "#f97316" }
  ];

  const engagementData = [
    { name: "Tests", value: 45, color: "#0ea5e9" },
    { name: "PDF Courses", value: 25, color: "#8b5cf6" },
    { name: "Flashcards", value: 20, color: "#ec4899" },
    { name: "Current Affairs", value: 10, color: "#f97316" }
  ];

  const timeSeriesData = [
    { name: "Jan", users: 4000, active: 2400 },
    { name: "Feb", users: 3000, active: 1398 },
    { name: "Mar", users: 2000, active: 9800 },
    { name: "Apr", users: 2780, active: 3908 },
    { name: "May", users: 1890, active: 4800 },
    { name: "Jun", users: 2390, active: 3800 },
    { name: "Jul", users: 3490, active: 4300 }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUserData[timeRange]}</div>
            <p className="text-xs text-muted-foreground">
              Users who have been active in the last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Logged-in Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loggedInUserData[timeRange]}</div>
            <p className="text-xs text-muted-foreground">
              Users who have logged in at least once
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tests Attempted</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeRange === "daily" && "124"}
              {timeRange === "weekly" && "876"}
              {timeRange === "monthly" && "3,542"}
              {timeRange === "yearly" && "42,360"}
            </div>
            <p className="text-xs text-muted-foreground">
              Total tests attempted by users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Avg. Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeRange === "daily" && "42m"}
              {timeRange === "weekly" && "38m"}
              {timeRange === "monthly" && "45m"}
              {timeRange === "yearly" && "40m"}
            </div>
            <p className="text-xs text-muted-foreground">
              Average time spent per session
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={timeSeriesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#8884d8" name="Total Users" />
                    <Bar dataKey="active" fill="#82ca9d" name="Active Users" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Time Range</CardTitle>
                <CardDescription>
                  Select a time range to view metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTimeRange("daily")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      timeRange === "daily"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    Daily
                  </button>
                  <button
                    onClick={() => setTimeRange("weekly")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      timeRange === "weekly"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setTimeRange("monthly")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      timeRange === "monthly"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setTimeRange("yearly")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      timeRange === "yearly"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    Yearly
                  </button>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium">Summary</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Total Users:</span>
                      <span className="font-medium">
                        {timeRange === "daily" && "150"}
                        {timeRange === "weekly" && "1,250"}
                        {timeRange === "monthly" && "5,200"}
                        {timeRange === "yearly" && "62,400"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">New Registrations:</span>
                      <span className="font-medium">
                        {timeRange === "daily" && "12"}
                        {timeRange === "weekly" && "87"}
                        {timeRange === "monthly" && "342"}
                        {timeRange === "yearly" && "4,104"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Return Rate:</span>
                      <span className="font-medium">
                        {timeRange === "daily" && "52%"}
                        {timeRange === "weekly" && "68%"}
                        {timeRange === "monthly" && "73%"}
                        {timeRange === "yearly" && "76%"}
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Most Active Times</CardTitle>
                <CardDescription>When users are most active</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground text-sm text-center">
                    Peak activity observed between 6PM - 10PM <br />
                    Weekends show 40% higher engagement
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
                <CardDescription>How many users come back</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold">72%</div>
                  <p className="text-muted-foreground text-sm text-center mt-2">
                    30-day retention rate <br />
                    11% improvement over last quarter
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="purchases" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Purchases Breakdown</CardTitle>
                <CardDescription>Paid vs Free users</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[300px] w-full max-w-md">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={purchasesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {purchasesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Most Popular Purchases</CardTitle>
                <CardDescription>Top selling offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Mock Test Bundle</span>
                    <span className="text-sm text-muted-foreground">42%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Complete Course</span>
                    <span className="text-sm text-muted-foreground">28%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Topic-wise Tests</span>
                    <span className="text-sm text-muted-foreground">18%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Mentor Sessions</span>
                    <span className="text-sm text-muted-foreground">12%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Engagement</CardTitle>
                <CardDescription>What users are engaging with</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[300px] w-full max-w-md">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={engagementData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {engagementData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Engagement Stats</CardTitle>
                <CardDescription>Key engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-2xl font-bold">4.2</div>
                      <div className="text-xs text-muted-foreground">Average sessions per week</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-2xl font-bold">18.5</div>
                      <div className="text-xs text-muted-foreground">Average tests per month</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-2xl font-bold">72%</div>
                      <div className="text-xs text-muted-foreground">Completion rate</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-2xl font-bold">3.8</div>
                      <div className="text-xs text-muted-foreground">App rating (out of 5)</div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-2">Engagement Trend</h3>
                    <div className="text-xs text-muted-foreground">
                      <p className="mb-1">↑ 12% increase in daily active users</p>
                      <p className="mb-1">↑ 8% increase in test completion rate</p>
                      <p>↓ 3% decrease in session abandonment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}