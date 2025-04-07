import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { 
  DollarSign, 
  ArrowUpRight,
  CreditCard,
  Clock,
  Wallet,
  IndianRupee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Temporary mock data
const REVENUE_OVERVIEW = [
  {
    name: "Total Revenue",
    value: 2854280,
    icon: DollarSign,
    change: 18,
    trend: "up",
    period: "month"
  },
  {
    name: "Average Transaction",
    value: 7500,
    icon: CreditCard,
    change: 4.5,
    trend: "up",
    period: "month"
  },
  {
    name: "Processing Fee",
    value: 142714,
    icon: Clock,
    change: 18,
    trend: "up",
    period: "month"
  },
  {
    name: "Net Earnings",
    value: 2711566,
    icon: Wallet,
    change: 18,
    trend: "up",
    period: "month"
  }
];

const REVENUE_BY_PRODUCT = [
  { name: "UPSC Complete Package", value: 1425000, color: "#3498db" },
  { name: "Banking Exams Bundle", value: 845000, color: "#2ecc71" },
  { name: "SSC Advanced Course", value: 385000, color: "#9b59b6" },
  { name: "Railway Exam Prep", value: 125000, color: "#f39c12" },
  { name: "Other Courses", value: 74280, color: "#e74c3c" }
];

const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 1256000 },
  { month: "Feb", revenue: 1452000 },
  { month: "Mar", revenue: 1687000 },
  { month: "Apr", revenue: 1845000 },
  { month: "May", revenue: 2124000 },
  { month: "Jun", revenue: 2356000 },
  { month: "Jul", revenue: 2532000 },
  { month: "Aug", revenue: 2745000 },
  { month: "Sep", revenue: 2854280 }
];

const RECENT_TRANSACTIONS = [
  {
    id: "TRX-001",
    user: "Rahul Sharma",
    email: "rahul.s@example.com",
    product: "UPSC Complete Package",
    amount: 12500,
    date: "2023-09-30",
    status: "completed",
    paymentMethod: "Credit Card"
  },
  {
    id: "TRX-002",
    user: "Priya Patel",
    email: "priya.p@example.com",
    product: "Banking Exams Bundle",
    amount: 7500,
    date: "2023-09-29",
    status: "completed",
    paymentMethod: "UPI"
  },
  {
    id: "TRX-003",
    user: "Amit Singh",
    email: "amit.s@example.com",
    product: "SSC Advanced Course",
    amount: 5500,
    date: "2023-09-29",
    status: "completed",
    paymentMethod: "Net Banking"
  },
  {
    id: "TRX-004",
    user: "Neha Gupta",
    email: "neha.g@example.com",
    product: "Railway Exam Prep",
    amount: 4500,
    date: "2023-09-28",
    status: "completed",
    paymentMethod: "UPI"
  },
  {
    id: "TRX-005",
    user: "Vikram Malhotra",
    email: "vikram.m@example.com",
    product: "UPSC Complete Package",
    amount: 12500,
    date: "2023-09-28",
    status: "refunded",
    paymentMethod: "Credit Card"
  },
  {
    id: "TRX-006",
    user: "Aarti Reddy",
    email: "aarti.r@example.com",
    product: "Monthly Premium Plan",
    amount: 1200,
    date: "2023-09-27",
    status: "completed",
    paymentMethod: "UPI"
  },
  {
    id: "TRX-007",
    user: "Suresh Kumar",
    email: "suresh.k@example.com",
    product: "Banking Exams Bundle",
    amount: 7500,
    date: "2023-09-27",
    status: "pending",
    paymentMethod: "Net Banking"
  }
];

const SUBSCRIPTION_METRICS = [
  {
    name: "Monthly Basic",
    active: 1850,
    cancelled: 245,
    revenue: 925000,
    churnRate: 3.8
  },
  {
    name: "Monthly Premium",
    active: 1450,
    cancelled: 180,
    revenue: 1740000,
    churnRate: 4.2
  },
  {
    name: "Annual Basic",
    active: 450,
    cancelled: 35,
    revenue: 540000,
    churnRate: 1.6
  },
  {
    name: "Annual Premium",
    active: 368,
    cancelled: 22,
    revenue: 734000,
    churnRate: 1.2
  }
];

const PAYOUT_HISTORY = [
  {
    id: "PAY-001",
    date: "2023-09-15",
    amount: 1248500,
    status: "processed",
    bankAccount: "HDFC Bank - XXXX4582"
  },
  {
    id: "PAY-002",
    date: "2023-08-15",
    amount: 1185000,
    status: "processed",
    bankAccount: "HDFC Bank - XXXX4582"
  },
  {
    id: "PAY-003",
    date: "2023-07-15",
    amount: 1152000,
    status: "processed",
    bankAccount: "HDFC Bank - XXXX4582"
  },
  {
    id: "PAY-004",
    date: "2023-06-15",
    amount: 1086500,
    status: "processed",
    bankAccount: "HDFC Bank - XXXX4582"
  },
  {
    id: "PAY-005",
    date: "2023-05-15",
    amount: 974000,
    status: "processed",
    bankAccount: "HDFC Bank - XXXX4582"
  }
];

const PAYMENT_METHODS = [
  { name: "UPI", value: 45, color: "#9c88ff" },
  { name: "Credit Card", value: 30, color: "#4cd137" },
  { name: "Net Banking", value: 15, color: "#fbc531" },
  { name: "Debit Card", value: 10, color: "#00a8ff" }
];

export default function RevenuePanel() {
  const [timePeriod, setTimePeriod] = useState("month");
  const [currentTab, setCurrentTab] = useState("overview");
  
  const { data: revenueData, isLoading } = useQuery({
    queryKey: ["/api/revenue"],
    // Disabled until API is available
    enabled: false
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      case "processed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
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
                    {formatCurrency(item.value)}
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
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>
                  Breakdown by product category
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={REVENUE_BY_PRODUCT}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {REVENUE_BY_PRODUCT.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatCurrency(value as number), "Revenue"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View Product Analytics</Button>
              </CardFooter>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>
                  Monthly revenue for the current year
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={MONTHLY_REVENUE}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip formatter={(value) => [formatCurrency(value as number), "Revenue"]} />
                      <Bar 
                        dataKey="revenue" 
                        name="Revenue" 
                        fill="url(#colorGradient)" 
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3498db" stopOpacity={0.4}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View Financial Reports</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Distribution of revenue by payment method
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="grid md:grid-cols-4 gap-4">
                  {PAYMENT_METHODS.map((method) => (
                    <div key={method.name} className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{method.name}</span>
                        <span className="text-sm font-medium">{method.value}%</span>
                      </div>
                      <Progress 
                        value={method.value} 
                        className="h-2" 
                        style={{ backgroundColor: `${method.color}40` }}
                        indicatorClassName="h-full" 
                        style={{ backgroundColor: method.color }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Overview of recent payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
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
                      <TableCell>
                        <div>
                          <p className="font-medium">{transaction.user}</p>
                          <p className="text-sm text-muted-foreground">{transaction.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.product}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <IndianRupee className="h-4 w-4 mr-1 text-muted-foreground" />
                          {transaction.amount.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(transaction.status)}
                        >
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
              <Button variant="outline">Previous</Button>
              <div className="flex items-center gap-2">
                <Select defaultValue="10">
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Rows" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">Showing 1-7 of 125 transactions</span>
              </div>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscriptions" className="p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Metrics</CardTitle>
              <CardDescription>
                Active subscriptions, revenue, and churn rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Active Subscriptions</TableHead>
                    <TableHead>Cancelled</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Churn Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SUBSCRIPTION_METRICS.map((subscription) => (
                    <TableRow key={subscription.name}>
                      <TableCell className="font-medium">{subscription.name}</TableCell>
                      <TableCell>{subscription.active.toLocaleString()}</TableCell>
                      <TableCell>{subscription.cancelled.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <IndianRupee className="h-4 w-4 mr-1 text-muted-foreground" />
                          {subscription.revenue.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={`mr-2 ${subscription.churnRate > 3 ? 'text-red-500' : 'text-green-500'}`}>
                            {subscription.churnRate}%
                          </span>
                          <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${subscription.churnRate > 3 ? 'bg-red-500' : 'bg-green-500'}`}
                              style={{ width: `${subscription.churnRate * 10}%` }}
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
              <Button variant="outline" className="w-full">View Detailed Subscription Analytics</Button>
            </CardFooter>
          </Card>
          
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Growth</CardTitle>
                <CardDescription>
                  Monthly active subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", subscriptions: 2850 },
                        { month: "Feb", subscriptions: 3150 },
                        { month: "Mar", subscriptions: 3450 },
                        { month: "Apr", subscriptions: 3650 },
                        { month: "May", subscriptions: 3850 },
                        { month: "Jun", subscriptions: 3950 },
                        { month: "Jul", subscriptions: 4050 },
                        { month: "Aug", subscriptions: 4120 },
                        { month: "Sep", subscriptions: 4118 }
                      ]}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} subscriptions`, ""]} />
                      <Line
                        type="monotone"
                        dataKey="subscriptions"
                        stroke="#3498db"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription Churn</CardTitle>
                <CardDescription>
                  Monthly cancellation rates
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", churnRate: 4.2 },
                        { month: "Feb", churnRate: 4.0 },
                        { month: "Mar", churnRate: 3.8 },
                        { month: "Apr", churnRate: 3.5 },
                        { month: "May", churnRate: 3.2 },
                        { month: "Jun", churnRate: 3.0 },
                        { month: "Jul", churnRate: 2.9 },
                        { month: "Aug", churnRate: 2.8 },
                        { month: "Sep", churnRate: 2.7 }
                      ]}
                    >
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 5]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, "Churn Rate"]} />
                      <Line
                        type="monotone"
                        dataKey="churnRate"
                        stroke="#e74c3c"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="payouts" className="p-0 pt-4">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Balance</CardTitle>
                <CardDescription>
                  Revenue pending for next payout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4">
                  {formatCurrency(1462980)}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Next scheduled payout on <span className="font-medium">October 15, 2023</span></p>
                  <p className="mt-1">Total monthly revenue: {formatCurrency(2854280)}</p>
                  <p className="mt-1">Platform fee (5%): {formatCurrency(142714)}</p>
                </div>
                <div className="mt-4">
                  <p className="mb-2 text-sm text-muted-foreground">Payout progress</p>
                  <Progress value={51} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>51% complete</span>
                    <span>100%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">Request Early Payout</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payout Account</CardTitle>
                <CardDescription>
                  Bank account for receiving payouts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md border border-border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">HDFC Bank</h3>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Number</span>
                      <span className="font-medium">XXXX XXXX 4582</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Type</span>
                      <span className="font-medium">Current Account</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Holder</span>
                      <span className="font-medium">Mock Test Platform Pvt. Ltd.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IFSC Code</span>
                      <span className="font-medium">HDFC0001234</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">Update Bank Account</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>
                Record of past payouts to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payout ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bank Account</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PAYOUT_HISTORY.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell className="font-medium">{payout.id}</TableCell>
                      <TableCell>{formatDate(payout.date)}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <IndianRupee className="h-4 w-4 mr-1 text-muted-foreground" />
                          {payout.amount.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(payout.status)}
                        >
                          {payout.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{payout.bankAccount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline" className="w-full">Download Payout Reports</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}