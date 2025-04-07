import { useState } from 'react';
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Activity, 
  TrendingUp, 
  BarChart2,
  Calendar,
  Clock,
  Eye,
  UserCheck,
  FileText,
  Smartphone,
  Monitor,
  Tablet,
  Zap,
  MapPin,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// Mock data for demonstration
const activeUsersData = [
  { date: 'Mon', users: 1423 },
  { date: 'Tue', users: 1548 },
  { date: 'Wed', users: 1623 },
  { date: 'Thu', users: 1798 },
  { date: 'Fri', users: 1845 },
  { date: 'Sat', users: 1212 },
  { date: 'Sun', users: 1003 }
];

const sessionDurationData = [
  { date: 'Mon', duration: 42 },
  { date: 'Tue', duration: 48 },
  { date: 'Wed', duration: 52 },
  { date: 'Thu', duration: 57 },
  { date: 'Fri', duration: 63 },
  { date: 'Sat', duration: 71 },
  { date: 'Sun', duration: 49 }
];

const userRetentionData = [
  { month: 'Jan', retention: 76 },
  { month: 'Feb', retention: 73 },
  { month: 'Mar', retention: 78 },
  { month: 'Apr', retention: 82 },
  { month: 'May', retention: 85 },
  { month: 'Jun', retention: 87 }
];

const deviceUsageData = [
  { name: 'Mobile', value: 68 },
  { name: 'Desktop', value: 26 },
  { name: 'Tablet', value: 6 }
];

const DEVICE_COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const recentActiveUsers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', lastActive: '2 mins ago', status: 'online', testsCompleted: 24 },
  { id: 2, name: 'Priya Patel', email: 'priya.p@example.com', lastActive: '17 mins ago', status: 'online', testsCompleted: 18 },
  { id: 3, name: 'Vijay Kumar', email: 'vijay.k@example.com', lastActive: '32 mins ago', status: 'online', testsCompleted: 15 },
  { id: 4, name: 'Anjali Singh', email: 'anjali.s@example.com', lastActive: '1 hour ago', status: 'offline', testsCompleted: 21 },
  { id: 5, name: 'Arun Gupta', email: 'arun.g@example.com', lastActive: '3 hours ago', status: 'offline', testsCompleted: 12 }
];

const geographicDistribution = [
  { state: 'Maharashtra', users: 842 },
  { state: 'Delhi NCR', users: 753 },
  { state: 'Karnataka', users: 567 },
  { state: 'Tamil Nadu', users: 482 },
  { state: 'Uttar Pradesh', users: 423 },
  { state: 'West Bengal', users: 387 },
  { state: 'Gujarat', users: 342 },
  { state: 'Telangana', users: 316 },
  { state: 'Kerala', users: 275 },
  { state: 'Other States', users: 1042 }
];

const userEngagementData = [
  { category: 'Test Attempts', value: 90 },
  { category: 'Content Views', value: 85 },
  { category: 'Forum Activity', value: 65 },
  { category: 'Question Submissions', value: 55 },
  { category: 'Feedback Provided', value: 70 },
  { category: 'Video Completion', value: 80 },
  { category: 'Document Downloads', value: 75 },
];

const timeSpentData = [
  { category: 'UPSC', hours: 3.2 },
  { category: 'Banking', hours: 2.7 },
  { category: 'SSC', hours: 2.4 },
  { category: 'Railways', hours: 1.8 },
  { category: 'Teaching', hours: 1.5 },
  { category: 'Others', hours: 0.8 }
];

const UserActivityPanel = () => {
  const [timeRange, setTimeRange] = useState('weekly');

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Daily Active Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,845</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+12.3% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        {/* Session Duration */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">63 mins</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+10.5% from last week</span>
            </div>
          </CardContent>
        </Card>

        {/* User Retention */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Retention</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+2.4% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Page Views */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,682</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+8.7% from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Range Selection */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">User Activity Analysis</h3>
        <div>
          <Select 
            defaultValue={timeRange} 
            onValueChange={(value) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Last 24 Hours</SelectItem>
              <SelectItem value="weekly">Last 7 Days</SelectItem>
              <SelectItem value="monthly">Last 30 Days</SelectItem>
              <SelectItem value="quarterly">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Active Users */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Active Users</CardTitle>
            <CardDescription>User activity over the past week</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activeUsersData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}`, 'Active Users']}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="Active Users"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Session Duration */}
        <Card>
          <CardHeader>
            <CardTitle>Session Duration</CardTitle>
            <CardDescription>Average time spent per session</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sessionDurationData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value} mins`, 'Duration']}
                />
                <Line
                  type="monotone"
                  dataKey="duration"
                  name="Avg. Duration"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Retention Rate */}
        <Card>
          <CardHeader>
            <CardTitle>User Retention Rate</CardTitle>
            <CardDescription>Monthly retention percentage</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userRetentionData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                barSize={40}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}%`, 'Retention Rate']}
                />
                <Bar 
                  dataKey="retention" 
                  name="Retention Rate" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
            <CardDescription>Distribution by device type</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex h-full items-center justify-center">
              <div className="w-full max-w-md h-full flex flex-col md:flex-row items-center justify-between">
                <div className="h-64 w-full max-w-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceUsageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                      >
                        {deviceUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        formatter={(value: number) => [`${value}%`, 'Percentage']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-6 mt-6 md:mt-0">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: DEVICE_COLORS[0] }}
                    ></div>
                    <div className="flex flex-col w-full min-w-[150px]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Mobile</span>
                        <span className="text-sm text-muted-foreground">68%</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Smartphone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Android (72%), iOS (28%)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: DEVICE_COLORS[1] }}
                    ></div>
                    <div className="flex flex-col w-full min-w-[150px]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Desktop</span>
                        <span className="text-sm text-muted-foreground">26%</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Monitor className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Windows (64%), Mac (32%), Linux (4%)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: DEVICE_COLORS[2] }}
                    ></div>
                    <div className="flex flex-col w-full min-w-[150px]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Tablet</span>
                        <span className="text-sm text-muted-foreground">6%</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Tablet className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">iPad (83%), Android (17%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Engagement Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Engagement Metrics</CardTitle>
          <CardDescription>Metrics across different engagement categories</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={userEngagementData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar
                name="Engagement Score"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip 
                contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}/100`, 'Score']}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Active Users */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Active Users</CardTitle>
          <CardDescription>Users with recent platform activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Tests Completed</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActiveUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>{user.testsCompleted}</TableCell>
                  <TableCell className="text-right">
                    {user.status === 'online' ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Online</Badge>
                    ) : (
                      <Badge variant="outline">Offline</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Two-column grid for Geographic and Time Spent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>User distribution across states</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geographicDistribution.slice(0, 5).map((state) => (
                <div key={state.state} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{state.state}</span>
                    </div>
                    <span className="text-sm font-medium">{state.users} users</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${(state.users / geographicDistribution[0].users) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View All States
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Spent by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Time Spent by Category</CardTitle>
            <CardDescription>Average daily study hours by exam category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeSpentData.map((category, index) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.category}</span>
                    <span className="text-sm font-medium">{category.hours} hrs/day</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${(category.hours / timeSpentData[0].hours) * 100}%`,
                        backgroundColor: index % 2 === 0 ? '#8884d8' : '#82ca9d'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserActivityPanel;