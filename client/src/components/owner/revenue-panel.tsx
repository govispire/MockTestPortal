import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from "recharts";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  CreditCard, 
  User,
  Clock,
  Download,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Temporary mock data
const REVENUE_OVERVIEW = [
  {
    name: "Total Revenue",
    value: 2854280,
    icon: DollarSign,
    change: 18.2,
    trend: "up",
    period: "month",
    formattedValue: "₹28,54,280"
  },
  {
    name: "Average Order",
    value: 2450,
    icon: CreditCard,
    change: 5.8,
    trend: "up",
    period: "month",
    formattedValue: "₹2,450"
  },
  {
    name: "Conversion Rate",
    value: 4.2,
    icon: TrendingUp,
    change: 1.5,
    trend: "up",
    period: "month",
    formattedValue: "4.2%"
  },
  {
    name: "Active Subscriptions",
    value: 4118,
    icon: User,
    change: 7.8,
    trend: "up",
    period: "month",
    formattedValue: "4,118"
  }
];

const REVENUE_BY_CATEGORY = [
  { name: "UPSC Courses", value: 38, color: "#8884d8" },
  { name: "Banking Exams", value: 25, color: "#82ca9d" },
  { name: "SSC Courses", value: 15, color: "#ffc658" },
  { name: "GATE Courses", value: 12, color: "#ff8042" },
  { name: "State PCS", value: 10, color: "#0088fe" }
];

const MONTHLY_REVENUE = [
  { name: "Jan", value: 120000 },
  { name: "Feb", value: 140000 },
  { name: "Mar", value: 160000 },
  { name: "Apr", value: 180000 },
  { name: "May", value: 220000 },
  { name: "Jun", value: 250000 },
  { name: "Jul", value: 280000 },
  { name: "Aug", value: 240000 },
  { name: "Sep", value: 320000 },
  { name: "Oct", value: 360000 },
  { name: "Nov", value: 420000 },
  { name: "Dec", value: 480000 }
];

const REVENUE_BY_PRODUCT = [
  {
    id: 1,
    name: "UPSC Complete Bundle",
    category: "UPSC",
    price: 15000,
    sales: 450,
    revenue: 6750000,
    growth: 24
  },
  {
    id: 2,
    name: "Banking Premium",
    category: "Banking",
    price: 8500,
    sales: 580,
    revenue: 4930000,
    growth: 18
  },
  {
    id: 3,
    name: "SSC CGL Bundle",
    category: "SSC",
    price: 6000,
    sales: 620,
    revenue: 3720000,
    growth: 15
  },
  {
    id: 4,
    name: "GATE Engineering Pack",
    category: "GATE",
    price: 9500,
    sales: 320,
    revenue: 3040000,
    growth: 10
  },
  {
    id: 5,
    name: "Current Affairs Yearly",
    category: "General",
    price: 2500,
    sales: 950,
    revenue: 2375000,
    growth: 32
  }
];

const PAYMENT_METHODS = [
  { name: "Credit/Debit Card", value: 45, color: "#0088FE" },
  { name: "UPI", value: 35, color: "#00C49F" },
  { name: "Net Banking", value: 15, color: "#FFBB28" },
  { name: "Wallet", value: 5, color: "#FF8042" }
];

const RECENT_TRANSACTIONS = [
  {
    id: "#TXN-45623",
    user: "Rahul Sharma",
    course: "UPSC Complete Bundle",
    amount: "₹15,000",
    date: "15 Apr 2023",
    status: "Completed",
    paymentMethod: "Credit Card"
  },
  {
    id: "#TXN-45622",
    user: "Priya Patel",
    course: "Banking Premium",
    amount: "₹8,500",
    date: "15 Apr 2023",
    status: "Completed",
    paymentMethod: "UPI"
  },
  {
    id: "#TXN-45621",
    user: "Amit Kumar",
    course: "SSC CGL Bundle",
    amount: "₹6,000",
    date: "14 Apr 2023",
    status: "Completed",
    paymentMethod: "Net Banking"
  },
  {
    id: "#TXN-45620",
    user: "Ravi Verma",
    course: "Current Affairs Yearly",
    amount: "₹2,500",
    date: "14 Apr 2023",
    status: "Completed",
    paymentMethod: "UPI"
  },
  {
    id: "#TXN-45619",
    user: "Neha Singh",
    course: "GATE Engineering Pack",
    amount: "₹9,500",
    date: "13 Apr 2023",
    status: "Completed",
    paymentMethod: "Credit Card"
  }
];

const SUBSCRIPTION_PLANS = [
  {
    id: 1,
    name: "Monthly",
    active: 1850,
    revenue: 5550000,
    percentage: 45
  },
  {
    id: 2,
    name: "Quarterly",
    active: 1250,
    revenue: 6250000,
    percentage: 30
  },
  {
    id: 3,
    name: "Half-yearly",
    active: 620,
    revenue: 4650000,
    percentage: 15
  },
  {
    id: 4,
    name: "Yearly",
    active: 420,
    revenue: 4830000,
    percentage: 10
  }
];

const REFUND_REQUESTS = [
  {
    id: "#REF-1234",
    user: "Vikram Mehta",
    course: "Banking Premium",
    amount: "₹8,500",
    requestDate: "13 Apr 2023",
    status: "Pending",
    reason: "Content not as expected"
  },
  {
    id: "#REF-1233",
    user: "Sunita Rao",
    course: "UPSC Complete Bundle",
    amount: "₹15,000",
    requestDate: "12 Apr 2023",
    status: "Approved",
    reason: "Technical issues"
  },
  {
    id: "#REF-1232",
    user: "Karan Sharma",
    course: "SSC CGL Bundle",
    amount: "₹6,000",
    requestDate: "10 Apr 2023",
    status: "Rejected",
    reason: "Refund period expired"
  }
];

export default function RevenuePanel() {
  const [timePeriod, setTimePeriod] = useState("month");
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: revenueData, isLoading } = useQuery({
    queryKey: ["/api/revenue"],
    // Disabled until API is available
    enabled: false
  });

  // Helper to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Revenue & Payments</h2>
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Revenue</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {REVENUE_OVERVIEW.map((item) => (
              <Card key={item.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.name}
                  </CardTitle>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {item.formattedValue}
                  </div>
                  <div className="flex items-center pt-1">
                    {item.trend === "up" ? (
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                    )}
                    <p className={`text-xs ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}>
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
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>
                  Distribution of revenue across course categories
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={REVENUE_BY_CATEGORY}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {REVENUE_BY_CATEGORY.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Revenue Share"]} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {REVENUE_BY_CATEGORY.map((category) => (
                    <div key={category.name} className="flex items-center space-x-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm">{category.name}</span>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>
                  Revenue trends over the past year
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={MONTHLY_REVENUE}
                      margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [formatCurrency(value as number), "Revenue"]} />
                      <Bar 
                        dataKey="value" 
                        fill="#8884d8" 
                        radius={[4, 4, 0, 0]} 
                        name="Revenue"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Annual</p>
                    <p className="text-lg font-medium">₹2.77 Cr</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Monthly Avg</p>
                    <p className="text-lg font-medium">₹23.08 L</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Revenue by Product</CardTitle>
                  <CardDescription>
                    Top performing courses by revenue
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {REVENUE_BY_PRODUCT.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{product.price.toLocaleString()}</TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>₹{(product.revenue / 100000).toFixed(2)} L</TableCell>
                        <TableCell className="text-green-500">+{product.growth}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing top 5 products by revenue
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Analysis of revenue by payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={PAYMENT_METHODS}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {PAYMENT_METHODS.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    {PAYMENT_METHODS.map((method) => (
                      <div key={method.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{method.name}</span>
                          <span>{method.value}%</span>
                        </div>
                        <Progress 
                          value={method.value} 
                          className="h-2"
                          style={{ 
                            "--bg-color": `${method.color}20`,
                            "--fg-color": method.color
                          } as React.CSSProperties}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="subscriptions" className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,140</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +7.8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Recurring Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹23.5 L</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +9.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Subscription Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹5,680</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +1.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Churn Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.4%</div>
                <p className="text-xs text-green-500 mt-1">
                  -0.8% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
                <CardDescription>
                  Active subscriptions by plan type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <div key={plan.id} className="space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{plan.name} Plan</h4>
                          <p className="text-sm text-muted-foreground">
                            {plan.active.toLocaleString()} active users
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(plan.revenue)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {plan.percentage}% of total
                          </p>
                        </div>
                      </div>
                      <Progress value={plan.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View Detailed Report</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Growth</CardTitle>
                <CardDescription>
                  New subscriptions over the past 12 months
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={MONTHLY_REVENUE.map((item, idx) => ({
                        name: item.name,
                        value: Math.floor(item.value / 3500)
                      }))}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} new subscriptions`, ""]} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Renewal Rate</CardTitle>
                <CardDescription>
                  Subscription renewals by plan
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Monthly", rate: 68 },
                        { name: "Quarterly", rate: 82 },
                        { name: "Half-yearly", rate: 88 },
                        { name: "Yearly", rate: 94 }
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, "Renewal Rate"]} />
                      <Bar 
                        dataKey="rate" 
                        fill="#82ca9d" 
                        radius={[4, 4, 0, 0]} 
                        name="Renewal Rate"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Transactions
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹1,24,500</div>
                <div className="flex items-center pt-1">
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  <p className="text-xs text-green-500">
                    +5.2% from yesterday
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Transactions Count
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <div className="flex items-center pt-1">
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  <p className="text-xs text-green-500">
                    +8.4% from yesterday
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Processing Time
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.8s</div>
                <div className="flex items-center pt-1">
                  <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
                  <p className="text-xs text-green-500">
                    -0.3s from last week
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Refund Requests
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <div className="flex items-center pt-1">
                  <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
                  <p className="text-xs text-green-500">
                    -2 from last week
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Latest payment transactions on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {RECENT_TRANSACTIONS.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.user}</TableCell>
                        <TableCell>{transaction.course}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 250 transactions
                </div>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Refund Requests</CardTitle>
                <CardDescription>
                  Recent refund requests and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Refund ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {REFUND_REQUESTS.map((refund) => (
                      <TableRow key={refund.id}>
                        <TableCell className="font-medium">{refund.id}</TableCell>
                        <TableCell>{refund.user}</TableCell>
                        <TableCell>{refund.course}</TableCell>
                        <TableCell>{refund.amount}</TableCell>
                        <TableCell>{refund.requestDate}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              refund.status === "Pending" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : refund.status === "Approved" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {refund.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{refund.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View All Refund Requests</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}