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
  Cell
} from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Activity, 
  TrendingUp, 
  BarChart as BarChartIcon,
  Timer,
  Star,
  CheckCircle,
  AlertCircle,
  Zap,
  BookOpen,
  FileText,
  HeartPulse,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// Mock data for demonstration
const studentGrowthData = [
  { month: 'Jan', students: 1845 },
  { month: 'Feb', students: 2104 },
  { month: 'Mar', students: 2486 },
  { month: 'Apr', students: 2943 },
  { month: 'May', students: 3521 },
  { month: 'Jun', students: 4217 }
];

const testCompletionRateData = [
  { month: 'Jan', rate: 68 },
  { month: 'Feb', rate: 71 },
  { month: 'Mar', rate: 75 },
  { month: 'Apr', rate: 79 },
  { month: 'May', rate: 82 },
  { month: 'Jun', rate: 84 }
];

const courseCompletionRateData = [
  { month: 'Jan', rate: 42 },
  { month: 'Feb', rate: 45 },
  { month: 'Mar', rate: 48 },
  { month: 'Apr', rate: 52 },
  { month: 'May', rate: 56 },
  { month: 'Jun', rate: 58 }
];

const mostPopularTests = [
  { id: 1, name: 'UPSC Prelims Mock Test 1', attempts: 1247, averageScore: 72 },
  { id: 2, name: 'Banking PO Test Series 3', attempts: 1043, averageScore: 68 },
  { id: 3, name: 'SSC CGL Tier 1 Mock Test 2', attempts: 986, averageScore: 65 },
  { id: 4, name: 'Railways RRB NTPC Mock Test', attempts: 924, averageScore: 70 },
  { id: 5, name: 'UPSC CSAT Mock Test', attempts: 876, averageScore: 62 }
];

const platformHealthData = [
  { name: 'Uptime', value: 99.97 },
  { name: 'Response Time', value: 183 },
  { name: 'Error Rate', value: 0.03 },
  { name: 'CPU Load', value: 42 },
  { name: 'Memory Usage', value: 68 }
];

const testCategoryDistribution = [
  { name: 'UPSC', value: 35 },
  { name: 'Banking', value: 25 },
  { name: 'SSC', value: 18 },
  { name: 'Railways', value: 12 },
  { name: 'Teaching', value: 10 }
];

const CATEGORY_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const studentActivityByHour = [
  { hour: '00:00', active: 245 },
  { hour: '03:00', active: 172 },
  { hour: '06:00', active: 386 },
  { hour: '09:00', active: 1254 },
  { hour: '12:00', active: 1846 },
  { hour: '15:00', active: 2153 },
  { hour: '18:00', active: 2748 },
  { hour: '21:00', active: 1847 }
];

const systemEvents = [
  { id: 1, type: 'info', message: 'Database backup completed successfully', time: '2 hours ago' },
  { id: 2, type: 'warning', message: 'High CPU usage detected (78%)', time: '4 hours ago' },
  { id: 3, type: 'error', message: 'Payment gateway timeout occurred', time: '1 day ago' },
  { id: 4, type: 'info', message: 'New content deployment successful', time: '2 days ago' },
  { id: 5, type: 'info', message: 'System maintenance completed', time: '3 days ago' }
];

const testPerformanceByCategory = [
  { category: 'UPSC', averageScore: 64, passingRate: 62, timeSpent: 84 },
  { category: 'Banking', averageScore: 72, passingRate: 76, timeSpent: 68 },
  { category: 'SSC', averageScore: 68, passingRate: 70, timeSpent: 56 },
  { category: 'Railways', averageScore: 74, passingRate: 78, timeSpent: 42 },
  { category: 'Teaching', averageScore: 76, passingRate: 82, timeSpent: 38 }
];

const MetricsPanel = () => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,217</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+19.8% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Test Completion Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Test Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+2.4% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Average Study Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Study Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8 hrs/day</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+0.3 hrs from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Platform Health */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.97%</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+0.02% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Student Growth</CardTitle>
            <CardDescription>Monthly registered users</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={studentGrowthData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}`, 'Students']}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  name="Students"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Completion Rates */}
        <Card>
          <CardHeader>
            <CardTitle>Completion Rates</CardTitle>
            <CardDescription>Test and course completion trends</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={testCompletionRateData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis domain={[30, 90]} />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Legend />
                <Line
                  data={testCompletionRateData}
                  type="monotone"
                  dataKey="rate"
                  name="Test Completion"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  data={courseCompletionRateData}
                  type="monotone"
                  dataKey="rate"
                  name="Course Completion"
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
        {/* Test Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Test Category Distribution</CardTitle>
            <CardDescription>Percentage by exam category</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex h-full items-center justify-center">
              <div className="w-full max-w-md h-full flex flex-col md:flex-row items-center justify-between">
                <div className="h-64 w-full max-w-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={testCategoryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                      >
                        {testCategoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        formatter={(value: number) => [`${value}%`, 'Percentage']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4 mt-6 md:mt-0">
                  {testCategoryDistribution.map((entry, index) => (
                    <div key={entry.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
                      ></div>
                      <div className="flex items-center justify-between w-full min-w-[150px]">
                        <span className="text-sm font-medium">{entry.name}</span>
                        <span className="text-sm text-gray-500">{entry.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Student Activity</CardTitle>
            <CardDescription>Activity distribution by hour</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={studentActivityByHour}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                barSize={30}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}`, 'Active Users']}
                />
                <Bar 
                  dataKey="active" 
                  name="Active Users" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Popular Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Most Popular Tests</CardTitle>
          <CardDescription>Tests with the highest number of attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {mostPopularTests.map((test) => (
              <div key={test.id} className="flex items-center">
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none">{test.name}</p>
                  <div className="flex items-center pt-2">
                    <BookOpen className="mr-1 h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{test.attempts} attempts</p>
                    <Star className="ml-3 mr-1 h-3 w-3 text-amber-500" />
                    <p className="text-xs text-muted-foreground">Avg. score: {test.averageScore}%</p>
                  </div>
                </div>
                <div className="ml-auto font-medium">
                  {test.id === 1 ? (
                    <Badge className="bg-amber-500 hover:bg-amber-600">Top Rated</Badge>
                  ) : test.id === 2 ? (
                    <Badge className="bg-slate-500 hover:bg-slate-600">Popular</Badge>
                  ) : (
                    <Badge variant="outline">Active</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Two-column grid for Performance and Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Performance by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Test Performance by Category</CardTitle>
            <CardDescription>Analysis of test performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testPerformanceByCategory.map((category) => (
                <div key={category.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{category.category}</span>
                    <span className="text-sm text-muted-foreground">
                      Avg. Score: {category.averageScore}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="min-w-[100px]">Passing Rate:</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${category.passingRate}%` }}
                        ></div>
                      </div>
                      <span>{category.passingRate}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="min-w-[100px]">Time Spent:</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${(category.timeSpent / 90) * 100}%` }}
                        ></div>
                      </div>
                      <span>{category.timeSpent} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformHealthData.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {metric.name === 'Uptime' ? (
                        <Zap className="mr-2 h-4 w-4 text-green-500" />
                      ) : metric.name === 'Response Time' ? (
                        <Timer className="mr-2 h-4 w-4 text-blue-500" />
                      ) : metric.name === 'Error Rate' ? (
                        <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                      ) : metric.name === 'CPU Load' ? (
                        <Activity className="mr-2 h-4 w-4 text-amber-500" />
                      ) : (
                        <BarChartIcon className="mr-2 h-4 w-4 text-purple-500" />
                      )}
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {metric.name === 'Uptime'
                        ? `${metric.value}%`
                        : metric.name === 'Response Time'
                        ? `${metric.value}ms`
                        : metric.name === 'Error Rate'
                        ? `${metric.value}%`
                        : `${metric.value}%`}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        metric.name === 'Uptime'
                          ? 'bg-green-500'
                          : metric.name === 'Response Time'
                          ? 'bg-blue-500'
                          : metric.name === 'Error Rate'
                          ? 'bg-red-500'
                          : metric.name === 'CPU Load'
                          ? 'bg-amber-500'
                          : 'bg-purple-500'
                      }`}
                      style={{
                        width: metric.name === 'Response Time'
                          ? `${100 - (metric.value / 300) * 100}%`
                          : `${metric.value}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Events */}
      <Card>
        <CardHeader>
          <CardTitle>System Events</CardTitle>
          <CardDescription>Recent platform events and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {systemEvents.map((event) => (
              <div key={event.id} className="flex">
                <div className="mr-4 mt-0.5">
                  {event.type === 'info' ? (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                  ) : event.type === 'warning' ? (
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <HeartPulse className="h-4 w-4 text-red-600" />
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {event.message}
                  </p>
                  <div className="flex items-center pt-2">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
                <div className="ml-auto">
                  {event.type === 'info' ? (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                      Info
                    </Badge>
                  ) : event.type === 'warning' ? (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200">
                      Warning
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200">
                      Error
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsPanel;