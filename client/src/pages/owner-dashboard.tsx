import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import OwnerSidebar from "@/components/owner/owner-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, ArrowUpRight, TrendingUp, DollarSign } from "lucide-react";
import UserActivityPanel from "@/components/owner/user-activity-panel";
import RevenuePanel from "@/components/owner/revenue-panel";
import SalesPanel from "@/components/owner/sales-panel";

export default function OwnerDashboard() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  if (user.role !== "owner") {
    return <Redirect to="/" />;
  }

  const platformStats = [
    {
      name: "Total Users",
      value: "12,568",
      change: "+15%",
      icon: Users,
    },
    {
      name: "Active Users",
      value: "4,523",
      change: "+12%",
      icon: Activity,
    },
    {
      name: "Revenue",
      value: "₹285,428",
      change: "+18%",
      icon: DollarSign,
    },
    {
      name: "Conversion Rate",
      value: "8.7%",
      change: "+2.1%",
      icon: TrendingUp,
    },
  ];

  return (
    <OwnerSidebar>
      <div className="flex h-full flex-col space-y-6 p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Owner Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name || user.username}! Here's what's happening with your platform today.
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full lg:w-1/2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Activity</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {platformStats.map((stat) => (
                <Card key={stat.name}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.name}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center pt-1">
                      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                      <p className="text-xs text-green-500">
                        {stat.change} from previous month
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Platform Overview</CardTitle>
                  <CardDescription>
                    Your platform performance and user activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[360px] flex flex-col justify-center items-center border-2 border-dashed rounded-md border-border">
                    <p className="text-muted-foreground">Select a specific tab for detailed analytics</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Statistics</CardTitle>
                    <CardDescription>
                      Key metrics summary
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tests Taken</span>
                        <span className="font-medium">24,892</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Course Completions</span>
                        <span className="font-medium">3,568</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Study Hours</span>
                        <span className="font-medium">128,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Session Time</span>
                        <span className="font-medium">45 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Educators</span>
                        <span className="font-medium">67</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Test Pass Rate</span>
                        <span className="font-medium">72%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Status</CardTitle>
                    <CardDescription>
                      Platform health metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">System Status</span>
                        <span className="text-green-500 font-medium">Operational</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Response Time</span>
                        <span className="font-medium">245ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uptime</span>
                        <span className="font-medium">99.9%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <UserActivityPanel />
          </TabsContent>

          <TabsContent value="revenue">
            <RevenuePanel />
          </TabsContent>

          <TabsContent value="sales">
            <SalesPanel />
          </TabsContent>
        </Tabs>
      </div>
    </OwnerSidebar>
  );
}