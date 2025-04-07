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
  Cell
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Calendar,
  LineChart as LineChartIcon,
  BarChart2,
  PieChart as PieChartIcon,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  Percent,
  Clock
} from "lucide-react";

// Format currency for Indian Rupees
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Mock data for demonstration
const monthlyRevenue = [
  { month: 'Jan', revenue: 1246800 },
  { month: 'Feb', revenue: 1358400 },
  { month: 'Mar', revenue: 1542200 },
  { month: 'Apr', revenue: 1683600 },
  { month: 'May', revenue: 1872400 },
  { month: 'Jun', revenue: 2134800 }
];

const revenueByProduct = [
  { name: 'Mock Tests', value: 48 },
  { name: 'Courses', value: 32 },
  { name: 'Study Materials', value: 12 },
  { name: 'Mentorship', value: 8 }
];

const PRODUCT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const revenueBreakdown = [
  { 
    title: 'UPSC Comprehensive Bundle', 
    price: 12500,
    sales: 48,
    revenue: 600000,
    growth: '+18%'
  },
  { 
    title: 'Banking Exam Series', 
    price: 6800,
    sales: 92,
    revenue: 625600,
    growth: '+15%'
  },
  { 
    title: 'SSC Complete Package', 
    price: 4500,
    sales: 104,
    revenue: 468000,
    growth: '+12%'
  },
  { 
    title: 'Railways Preparation Kit', 
    price: 3800,
    sales: 72,
    revenue: 273600,
    growth: '+8%'
  },
  { 
    title: 'One-on-One Mentorship', 
    price: 15000,
    sales: 11,
    revenue: 165000,
    growth: '+21%'
  }
];

const subscriptionData = [
  { month: 'Jan', monthly: 82, quarterly: 38, annual: 24 },
  { month: 'Feb', monthly: 86, quarterly: 42, annual: 28 },
  { month: 'Mar', monthly: 92, quarterly: 48, annual: 32 },
  { month: 'Apr', monthly: 98, quarterly: 52, annual: 36 },
  { month: 'May', monthly: 108, quarterly: 58, annual: 42 },
  { month: 'Jun', monthly: 124, quarterly: 64, annual: 48 }
];

const paymentMethodsData = [
  { method: 'Credit Card', percentage: 46 },
  { method: 'UPI', percentage: 32 },
  { method: 'Debit Card', percentage: 14 },
  { method: 'Net Banking', percentage: 6 },
  { method: 'Wallet', percentage: 2 }
];

const transactionHistory = [
  { id: 'TXN-001234', user: 'Rohit Sharma', amount: 12500, date: '2023-06-12', status: 'completed', product: 'UPSC Comprehensive Bundle' },
  { id: 'TXN-001235', user: 'Ananya Patel', amount: 6800, date: '2023-06-12', status: 'completed', product: 'Banking Exam Series' },
  { id: 'TXN-001236', user: 'Vikram Singh', amount: 15000, date: '2023-06-11', status: 'completed', product: 'One-on-One Mentorship' },
  { id: 'TXN-001237', user: 'Neha Gupta', amount: 4500, date: '2023-06-11', status: 'completed', product: 'SSC Complete Package' },
  { id: 'TXN-001238', user: 'Karthik R', amount: 3800, date: '2023-06-10', status: 'completed', product: 'Railways Preparation Kit' },
  { id: 'TXN-001239', user: 'Priya Verma', amount: 12500, status: 'pending', date: '2023-06-10', product: 'UPSC Comprehensive Bundle' },
  { id: 'TXN-001240', user: 'Akash Jain', amount: 4500, status: 'failed', date: '2023-06-09', product: 'SSC Complete Package' }
];

const projectionData = [
  { month: 'Jul', projected: 2320000, actual: 0 },
  { month: 'Aug', projected: 2480000, actual: 0 },
  { month: 'Sep', projected: 2650000, actual: 0 },
  { month: 'Oct', projected: 2820000, actual: 0 },
  { month: 'Nov', projected: 3100000, actual: 0 },
  { month: 'Dec', projected: 3400000, actual: 0 }
];

const averageRevenuePerUser = [
  { month: 'Jan', value: 3420 },
  { month: 'Feb', value: 3650 },
  { month: 'Mar', value: 3880 },
  { month: 'Apr', value: 4120 },
  { month: 'May', value: 4350 },
  { month: 'Jun', value: 4680 }
];

const RevenuePanel = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [currentTab, setCurrentTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(2134800)}</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+14.0% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* MRR */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(1428000)}</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Average Order Value */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(4680)}</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+7.6% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Subscriptions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">236</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+12.4% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Range Selection */}
      <div className="flex justify-between items-center">
        <Tabs defaultValue={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-auto">
          <Select 
            defaultValue={timeRange} 
            onValueChange={(value) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Last 7 Days</SelectItem>
              <SelectItem value="monthly">Last 30 Days</SelectItem>
              <SelectItem value="quarterly">Last 90 Days</SelectItem>
              <SelectItem value="yearly">Year to Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TabsContent value="overview" className="space-y-6">
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Total revenue by month</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyRevenue}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
                  <Tooltip 
                    contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue by Product */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Product</CardTitle>
              <CardDescription>Distribution across product categories</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex h-full items-center justify-center">
                <div className="w-full max-w-md h-full flex flex-col md:flex-row items-center justify-between">
                  <div className="h-64 w-full max-w-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueByProduct}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          nameKey="name"
                        >
                          {revenueByProduct.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PRODUCT_COLORS[index % PRODUCT_COLORS.length]} />
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
                    {revenueByProduct.map((entry, index) => (
                      <div key={entry.name} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: PRODUCT_COLORS[index % PRODUCT_COLORS.length] }}
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
        </div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscription Types */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Growth</CardTitle>
              <CardDescription>Growth by subscription type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subscriptionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="monthly" 
                    name="Monthly" 
                    stackId="a"
                    fill="#8884d8" 
                  />
                  <Bar 
                    dataKey="quarterly" 
                    name="Quarterly" 
                    stackId="a"
                    fill="#82ca9d" 
                  />
                  <Bar 
                    dataKey="annual" 
                    name="Annual" 
                    stackId="a"
                    fill="#ffc658" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Average Revenue Per User */}
          <Card>
            <CardHeader>
              <CardTitle>Average Revenue Per User</CardTitle>
              <CardDescription>Monthly ARPU trend</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={averageRevenuePerUser}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${value}`} />
                  <Tooltip 
                    contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    formatter={(value: number) => [formatCurrency(value), 'ARPU']}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="ARPU"
                    stroke="#ff7300"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Products Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Top Revenue Generators</CardTitle>
            <CardDescription>Products with highest revenue contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueBreakdown.map((product) => (
                  <TableRow key={product.title}>
                    <TableCell className="font-medium">{product.title}</TableCell>
                    <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                    <TableCell className="text-right">{product.sales}</TableCell>
                    <TableCell className="text-right">{formatCurrency(product.revenue)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <span className="text-green-500">{product.growth}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Revenue distribution by payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethodsData.map((method) => (
                <div key={method.method} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{method.method}</span>
                    <span className="text-sm font-medium">{method.percentage}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div
                      className="h-2 bg-primary rounded-full"
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="transactions" className="space-y-6">
        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionHistory.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>{transaction.product}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-center">
              <Button variant="outline">View All Transactions</Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Transaction Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.8%</div>
              <div className="flex items-center text-xs text-green-500 font-medium mt-1">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+1.2% from last month</span>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                428 successful out of 451 total transactions
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Average Processing Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4s</div>
              <div className="flex items-center text-xs text-green-500 font-medium mt-1">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                <span>-0.3s from last month</span>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Fastest: 1.2s | Slowest: 5.8s
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Failed Transaction Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.1%</div>
              <div className="flex items-center text-xs text-green-500 font-medium mt-1">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                <span>-0.8% from last month</span>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Main reason: Payment gateway timeout (68%)
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="projections" className="space-y-6">
        {/* Revenue Projections */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Projections</CardTitle>
            <CardDescription>Projected vs actual revenue for next 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={30}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number) => [formatCurrency(value), '']}
                />
                <Legend />
                <Bar 
                  dataKey="projected" 
                  name="Projected Revenue" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="actual" 
                  name="Actual Revenue" 
                  fill="#82ca9d" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Growth Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Expected Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+18.4%</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>Year-over-year</span>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Q3 2023</span>
                    <span className="text-xs font-medium">+15.8%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full">
                    <div
                      className="h-1.5 bg-blue-500 rounded-full"
                      style={{ width: '78%' }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Q4 2023</span>
                    <span className="text-xs font-medium">+21.2%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full">
                    <div
                      className="h-1.5 bg-blue-500 rounded-full"
                      style={{ width: '92%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Projected ARR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(18624000)}</div>
              <div className="flex items-center text-xs text-green-500 font-medium mt-1">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+22.6% from current</span>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <div className="flex-1 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Key growth factors:</span> Course bundle sales, corporate partnerships
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <div className="flex-1 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Projection confidence:</span> High (83%)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Key Growth Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Plus className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Enterprise Partnerships</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Potential +₹42L additional revenue in Q4
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Plus className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">New Exam Categories</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Projected +₹28L revenue in first year
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Minus className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Risk: Increased Competition</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Potential -12% growth impact if not addressed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </div>
  );
};

export default RevenuePanel;