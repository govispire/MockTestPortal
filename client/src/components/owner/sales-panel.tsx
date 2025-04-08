import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { 
  TrendingUp,
  ArrowUpRight,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Star,
  CreditCard,
  CircleDollarSign,
  IndianRupee,
  PieChart as PieChartIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Temporary mock data
const SALES_OVERVIEW = [
  {
    name: "Total Sales",
    value: 9845,
    icon: ShoppingCart,
    change: 12,
    trend: "up",
    period: "month"
  },
  {
    name: "New Customers",
    value: 2150,
    icon: Users,
    change: 8.5,
    trend: "up",
    period: "month"
  },
  {
    name: "Products Sold",
    value: 12580,
    icon: Package,
    change: 15.2,
    trend: "up",
    period: "month"
  },
  {
    name: "Conversion Rate",
    value: 8.7,
    icon: TrendingUp,
    change: 2.1,
    trend: "up",
    period: "month"
  }
];

const MONTHLY_SALES = [
  { month: "Jan", sales: 5620 },
  { month: "Feb", sales: 6250 },
  { month: "Mar", sales: 7150 },
  { month: "Apr", sales: 7820 },
  { month: "May", sales: 8350 },
  { month: "Jun", sales: 8950 },
  { month: "Jul", sales: 9250 },
  { month: "Aug", sales: 9650 },
  { month: "Sep", sales: 9845 }
];

const CATEGORY_SALES = [
  { name: "UPSC", value: 4250, color: "#3498db" },
  { name: "Banking", value: 3150, color: "#2ecc71" },
  { name: "SSC", value: 1850, color: "#9b59b6" },
  { name: "Railway", value: 845, color: "#f39c12" },
  { name: "Others", value: 750, color: "#e74c3c" }
];

const TOP_SELLING_PRODUCTS = [
  {
    id: 1,
    name: "UPSC Complete Package",
    category: "UPSC",
    price: 12500,
    sales: 114,
    revenue: 1425000,
    rating: 4.8
  },
  {
    id: 2,
    name: "Banking Exams Bundle",
    category: "Banking",
    price: 7500,
    sales: 112,
    revenue: 840000,
    rating: 4.7
  },
  {
    id: 3,
    name: "SSC Advanced Course",
    category: "SSC",
    price: 5500,
    sales: 70,
    revenue: 385000,
    rating: 4.6
  },
  {
    id: 4,
    name: "Railway Exam Prep",
    category: "Railway",
    price: 4500,
    sales: 28,
    revenue: 126000,
    rating: 4.5
  },
  {
    id: 5,
    name: "Current Affairs Yearly",
    category: "General",
    price: 1200,
    sales: 48,
    revenue: 57600,
    rating: 4.4
  }
];

const CUSTOMER_ACQUISITION = [
  { month: "Jan", organic: 650, paid: 450, referral: 120 },
  { month: "Feb", organic: 720, paid: 480, referral: 150 },
  { month: "Mar", organic: 780, paid: 520, referral: 180 },
  { month: "Apr", organic: 840, paid: 550, referral: 210 },
  { month: "May", organic: 920, paid: 580, referral: 240 },
  { month: "Jun", organic: 980, paid: 620, referral: 280 },
  { month: "Jul", organic: 1050, paid: 650, referral: 320 },
  { month: "Aug", organic: 1120, paid: 680, referral: 350 },
  { month: "Sep", organic: 1180, paid: 710, referral: 390 }
];

const SALES_BY_PRICE_RANGE = [
  { name: "₹0-₹2,000", value: 2150, color: "#3498db" },
  { name: "₹2,001-₹5,000", value: 3250, color: "#2ecc71" },
  { name: "₹5,001-₹10,000", value: 2850, color: "#9b59b6" },
  { name: "₹10,001+", value: 1595, color: "#e74c3c" }
];

const CUSTOMER_DEMOGRAPHICS = [
  {
    id: 1,
    ageGroup: "18-24",
    percentage: 35,
    count: 3450,
    avgPurchase: 4500
  },
  {
    id: 2,
    ageGroup: "25-34",
    percentage: 45,
    count: 4425,
    avgPurchase: 7500
  },
  {
    id: 3,
    ageGroup: "35-44",
    percentage: 15,
    count: 1475,
    avgPurchase: 6800
  },
  {
    id: 4,
    ageGroup: "45-54",
    percentage: 4,
    count: 390,
    avgPurchase: 5200
  },
  {
    id: 5,
    ageGroup: "55+",
    percentage: 1,
    count: 105,
    avgPurchase: 3500
  }
];

const SALES_FORECASTS = [
  { month: "Oct", forecasted: 10200, lower: 9800, upper: 10600 },
  { month: "Nov", forecasted: 10800, lower: 10300, upper: 11300 },
  { month: "Dec", forecasted: 11500, lower: 10900, upper: 12100 },
  { month: "Jan", forecasted: 10500, lower: 9900, upper: 11100 },
  { month: "Feb", forecasted: 11000, lower: 10400, upper: 11600 },
  { month: "Mar", forecasted: 12500, lower: 11700, upper: 13300 }
];

export default function SalesPanel() {
  const [timePeriod, setTimePeriod] = useState("month");
  const [currentTab, setCurrentTab] = useState("overview");
  
  const { data: salesData, isLoading } = useQuery({
    queryKey: ["/api/sales"],
    // Disabled until API is available
    enabled: false
  });

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Sales Performance</h2>
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
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {SALES_OVERVIEW.map((item) => (
              <Card key={item.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.name}
                  </CardTitle>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {item.name === "Conversion Rate" 
                      ? `${item.value}%`
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
                <CardTitle>Monthly Sales Trend</CardTitle>
                <CardDescription>
                  Number of sales for the current year
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={MONTHLY_SALES}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} sales`, ""]} />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#8884d8" 
                        fill="url(#colorSales)" 
                        name="Sales"
                      />
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>
                  Distribution of sales by product category
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={CATEGORY_SALES}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {CATEGORY_SALES.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} sales`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>
                  New customers by acquisition channel
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={CUSTOMER_ACQUISITION}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="organic" name="Organic" stackId="a" fill="#3498db" />
                      <Bar dataKey="paid" name="Paid" stackId="a" fill="#2ecc71" />
                      <Bar dataKey="referral" name="Referral" stackId="a" fill="#9b59b6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>
                  Best performing products by sales volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TOP_SELLING_PRODUCTS.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <IndianRupee className="h-3 w-3 mr-1 text-muted-foreground" />
                            {product.price.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <IndianRupee className="h-3 w-3 mr-1 text-muted-foreground" />
                            {product.revenue.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {product.rating}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View All Products</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales by Price Range</CardTitle>
                <CardDescription>
                  Distribution of sales by product price range
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={SALES_BY_PRICE_RANGE}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {SALES_BY_PRICE_RANGE.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} sales`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">Price Analysis Report</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>
                  Performance metrics by product category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {CATEGORY_SALES.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm">{category.value} sales</span>
                          <span className="text-sm text-muted-foreground">
                            {(category.value / SALES_OVERVIEW[0].value * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={(category.value / SALES_OVERVIEW[0].value * 100)} 
                        className="h-2"
                        style={{ 
                          "--bg-color": `${category.color}20`,
                          "--fg-color": category.color
                        } as React.CSSProperties}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">Create New Category</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="customers" className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>
                  Customer breakdown by age group
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Age Group</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Avg. Purchase</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {CUSTOMER_DEMOGRAPHICS.map((group) => (
                      <TableRow key={group.id}>
                        <TableCell className="font-medium">{group.ageGroup}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">{group.percentage}%</span>
                            <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${group.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{group.count.toLocaleString()}</TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <IndianRupee className="h-3 w-3 mr-1 text-muted-foreground" />
                            {group.avgPurchase.toLocaleString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">Customer Insights Report</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>New vs Returning Customers</CardTitle>
                <CardDescription>
                  Monthly breakdown of customer types
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { month: "Jan", new: 650, returning: 420 },
                        { month: "Feb", new: 720, returning: 480 },
                        { month: "Mar", new: 780, returning: 520 },
                        { month: "Apr", new: 840, returning: 580 },
                        { month: "May", new: 920, returning: 650 },
                        { month: "Jun", new: 980, returning: 720 },
                        { month: "Jul", new: 1050, returning: 790 },
                        { month: "Aug", new: 1120, returning: 840 },
                        { month: "Sep", new: 1180, returning: 890 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="new" name="New Customers" fill="#3498db" />
                      <Bar dataKey="returning" name="Returning Customers" fill="#2ecc71" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View Customer Retention Report</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value</CardTitle>
                <CardDescription>
                  Average revenue per customer over their lifetime
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 1, value: 4500 },
                        { month: 3, value: 9800 },
                        { month: 6, value: 14500 },
                        { month: 12, value: 22800 },
                        { month: 18, value: 28500 },
                        { month: 24, value: 34200 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        label={{ value: 'Months', position: 'insideBottomRight', offset: -10 }} 
                      />
                      <YAxis 
                        label={{ value: 'LTV (₹)', angle: -90, position: 'insideLeft' }}
                        tickFormatter={(value) => `₹${value}`}
                      />
                      <Tooltip formatter={(value) => [formatCurrency(value as number), "Lifetime Value"]} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="LTV"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average LTV</p>
                  <p className="text-xl font-bold">₹34,200</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Acquisition Cost</p>
                  <p className="text-xl font-bold">₹2,800</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LTV:CAC Ratio</p>
                  <p className="text-xl font-bold">12.2:1</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="forecasts" className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Sales Forecast (Next 6 Months)</CardTitle>
                <CardDescription>
                  Projected sales with confidence intervals
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={SALES_FORECASTS}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="forecasted"
                        name="Forecasted Sales"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="upper"
                        name="Upper Bound"
                        stroke="#82ca9d"
                        strokeDasharray="5 5"
                      />
                      <Line
                        type="monotone"
                        dataKey="lower"
                        name="Lower Bound"
                        stroke="#ff7300"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="grid grid-cols-3 w-full gap-4">
                  <div className="border rounded-md p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Forecasted Sales</p>
                    <p className="text-2xl font-bold">66,500</p>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Projected Revenue</p>
                    <p className="text-2xl font-bold">₹4.8 Cr</p>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Growth Rate</p>
                    <p className="text-2xl font-bold">18.2%</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Trends</CardTitle>
                <CardDescription>
                  Analysis of seasonal patterns in sales data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Q1 (Jan-Mar)</span>
                      <span>19,020 sales</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-sm text-muted-foreground">High season for banking and SSC exams</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Q2 (Apr-Jun)</span>
                      <span>25,120 sales</span>
                    </div>
                    <Progress value={90} className="h-2" />
                    <p className="text-sm text-muted-foreground">Peak season for UPSC preliminary exams</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Q3 (Jul-Sep)</span>
                      <span>28,745 sales</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="text-sm text-muted-foreground">Highest sales, multiple exam seasons</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Q4 (Oct-Dec)</span>
                      <span>21,450 sales</span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <p className="text-sm text-muted-foreground">Strong for railway exams and year-end offers</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">View Seasonal Analysis Report</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Growth Opportunities</CardTitle>
                <CardDescription>
                  Potential areas for sales growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 border rounded-md">
                    <PieChartIcon className="h-10 w-10 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">State PSC Exam Category</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Market analysis shows high demand for state-level public service commission exams with minimal competition.
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm font-medium">Potential Revenue: </span>
                        <span className="text-sm ml-2">₹1.2 Cr/year</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 border rounded-md">
                    <Package className="h-10 w-10 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Test Series Bundles</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Creating subject-focused test series bundles can boost average order value and provide more targeted study materials.
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm font-medium">AOV Increase: </span>
                        <span className="text-sm ml-2">35%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 border rounded-md">
                    <Users className="h-10 w-10 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Group Subscriptions</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Offering discounted group subscriptions for coaching institutes and study groups can open B2B sales channels.
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm font-medium">Revenue Impact: </span>
                        <span className="text-sm ml-2">+22%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">Explore Growth Opportunities</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}