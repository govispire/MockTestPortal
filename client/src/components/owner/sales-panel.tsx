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
  ComposedChart,
  Cell,
  Pie,
  PieChart
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Tag,
  ShoppingCart,
  MapPin,
  Users,
  Clock,
  BarChart as BarChartIcon
} from "lucide-react";

// Mock data for demonstration
const salesTrend = [
  { month: 'Jan', sales: 267, target: 250 },
  { month: 'Feb', sales: 294, target: 300 },
  { month: 'Mar', sales: 316, target: 350 },
  { month: 'Apr', sales: 378, target: 400 },
  { month: 'May', sales: 412, target: 450 },
  { month: 'Jun', sales: 458, target: 500 }
];

const salesByState = [
  { state: 'Delhi', sales: 124 },
  { state: 'Maharashtra', sales: 108 },
  { state: 'Karnataka', sales: 96 },
  { state: 'Tamil Nadu', sales: 82 },
  { state: 'Uttar Pradesh', sales: 76 },
  { state: 'West Bengal', sales: 68 },
  { state: 'Others', sales: 186 }
];

const salesByAge = [
  { age: '18-24', value: 18 },
  { age: '25-34', value: 42 },
  { age: '35-44', value: 28 },
  { age: '45-54', value: 9 },
  { age: '55+', value: 3 }
];

const AGE_COLORS = ['#8884d8', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const conversionData = [
  { stage: 'Visits', users: 24862 },
  { stage: 'Sign-ups', users: 8943 },
  { stage: 'Product Views', users: 6724 },
  { stage: 'Cart Additions', users: 2453 },
  { stage: 'Purchases', users: 678 }
];

const topProducts = [
  { id: 1, product: 'UPSC Complete Study Material', sales: 128, revenue: 1024000, growth: '+18%' },
  { id: 2, product: 'Banking Exam Preparation Kit', sales: 96, revenue: 672000, growth: '+12%' },
  { id: 3, product: 'SSC Mock Test Series', sales: 82, revenue: 328000, growth: '+15%' },
  { id: 4, product: 'Railway Exam Preparation Guide', sales: 76, revenue: 304000, growth: '+9%' },
  { id: 5, product: 'Current Affairs - Yearly Subscription', sales: 68, revenue: 272000, growth: '+11%' }
];

const salesBySource = [
  { month: 'Jan', Direct: 124, Organic: 85, Referral: 34, Social: 24 },
  { month: 'Feb', Direct: 138, Organic: 94, Referral: 38, Social: 24 },
  { month: 'Mar', Direct: 146, Organic: 105, Referral: 41, Social: 24 },
  { month: 'Apr', Direct: 172, Organic: 123, Referral: 52, Social: 31 },
  { month: 'May', Direct: 186, Organic: 134, Referral: 58, Social: 34 },
  { month: 'Jun', Direct: 204, Organic: 152, Referral: 64, Social: 38 }
];

// Format currency for Indian Rupees
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const calculateConversionRate = (startIndex: number, endIndex: number) => {
  if (endIndex >= conversionData.length || startIndex < 0) {
    return 0;
  }
  
  const startValue = conversionData[startIndex].users;
  const endValue = conversionData[endIndex].users;
  
  return ((endValue / startValue) * 100).toFixed(1);
};

const SalesPanel = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Sales */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">458</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+11.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Average Order */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(8400)}</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+4.3% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.6%</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+0.8% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* New Customers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">286</div>
            <div className="flex items-center text-xs text-green-500 font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+18.2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Range Selection */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Sales Performance</h3>
        <div>
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
              <SelectItem value="yearly">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Actual vs Target comparison</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={salesTrend}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Bar 
                  dataKey="sales" 
                  name="Actual Sales" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Geographic Region */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>Distribution across states</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesByState}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                barSize={30}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="state" width={100} />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value} sales`, 'Count']}
                />
                <Bar 
                  dataKey="sales" 
                  name="Sales" 
                  fill="#10b981" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Age Demographics</CardTitle>
            <CardDescription>Sales distribution by age group</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex h-full items-center justify-center">
              <div className="w-full max-w-md h-full flex flex-col md:flex-row items-center justify-between">
                <div className="h-64 w-full max-w-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByAge}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="age"
                      >
                        {salesByAge.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
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
                  {salesByAge.map((entry, index) => (
                    <div key={entry.age} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: AGE_COLORS[index % AGE_COLORS.length] }}
                      ></div>
                      <div className="flex items-center justify-between w-full min-w-[150px]">
                        <span className="text-sm font-medium">{entry.age}</span>
                        <span className="text-sm text-gray-500">{entry.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales by Source */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Source</CardTitle>
            <CardDescription>Distribution by acquisition channel</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesBySource}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                stackOffset="expand"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number, name: string, props: any) => {
                    // Calculate percentage
                    const sum = Object.keys(props.payload)
                      .filter(key => ['Direct', 'Organic', 'Referral', 'Social'].includes(key))
                      .reduce((sum, key) => sum + props.payload[key], 0);
                    
                    const percent = ((value / sum) * 100).toFixed(1);
                    return [`${value} (${percent}%)`, name];
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="Direct" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                />
                <Area 
                  type="monotone" 
                  dataKey="Organic" 
                  stackId="1" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                />
                <Area 
                  type="monotone" 
                  dataKey="Referral" 
                  stackId="1" 
                  stroke="#ffc658" 
                  fill="#ffc658" 
                />
                <Area 
                  type="monotone" 
                  dataKey="Social" 
                  stackId="1" 
                  stroke="#ff8042" 
                  fill="#ff8042" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>User flow from visits to purchases</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-full">
            {conversionData.map((stage, index) => (
              <div key={stage.stage} className="flex flex-col">
                <div className="flex-grow flex items-end">
                  <div className="w-full">
                    <div className="relative pb-4">
                      <div 
                        className="absolute inset-0 flex items-center justify-center z-10 text-lg font-bold text-white"
                        style={{ 
                          top: '50%', 
                          transform: 'translateY(-35%)'
                        }}
                      >
                        {((stage.users / conversionData[0].users) * 100).toFixed(1)}%
                      </div>
                      <div 
                        className="bg-blue-500 w-full rounded-t-md transition-all duration-500"
                        style={{ 
                          height: `${(stage.users / conversionData[0].users) * 100}%`,
                          minHeight: '40px' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-medium">{stage.stage}</h3>
                  <p className="text-sm text-muted-foreground">{stage.users.toLocaleString()}</p>
                  {index > 0 && (
                    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-slate-100">
                      {calculateConversionRate(index-1, index)}% from prev
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling items</CardDescription>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>Last 30 days</span>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Sales</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.product}</TableCell>
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

      {/* Regional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top States */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Performing States</CardTitle>
            <CardDescription>States with highest sales conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Delhi</span>
                  <span className="text-sm">9.4% conversion</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Maharashtra</span>
                  <span className="text-sm">8.9% conversion</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Karnataka</span>
                  <span className="text-sm">8.6% conversion</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tamil Nadu</span>
                  <span className="text-sm">8.3% conversion</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Gujarat</span>
                  <span className="text-sm">7.8% conversion</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Regional Performance</CardTitle>
            <CardDescription>Comparison across regions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-none shadow-none bg-slate-50">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                  <div className="mb-4 text-center">
                    <h3 className="text-base font-medium">North India</h3>
                    <div className="mt-2 text-2xl font-bold">187</div>
                    <span className="text-xs text-muted-foreground">Total sales</span>
                    <div className="flex items-center justify-center text-xs text-green-500 font-medium mt-2">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+14.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-none bg-slate-50">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                  <div className="mb-4 text-center">
                    <h3 className="text-base font-medium">South India</h3>
                    <div className="mt-2 text-2xl font-bold">156</div>
                    <span className="text-xs text-muted-foreground">Total sales</span>
                    <div className="flex items-center justify-center text-xs text-green-500 font-medium mt-2">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+16.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-none bg-slate-50">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                  <div className="mb-4 text-center">
                    <h3 className="text-base font-medium">East India</h3>
                    <div className="mt-2 text-2xl font-bold">92</div>
                    <span className="text-xs text-muted-foreground">Total sales</span>
                    <div className="flex items-center justify-center text-xs text-green-500 font-medium mt-2">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+8.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-none bg-slate-50">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                  <div className="mb-4 text-center">
                    <h3 className="text-base font-medium">West India</h3>
                    <div className="mt-2 text-2xl font-bold">123</div>
                    <span className="text-xs text-muted-foreground">Total sales</span>
                    <div className="flex items-center justify-center text-xs text-green-500 font-medium mt-2">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+12.6%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesPanel;