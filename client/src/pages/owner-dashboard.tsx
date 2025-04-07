import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import OwnerSidebar from "@/components/owner/owner-sidebar";
import UserActivityPanel from "@/components/owner/user-activity-panel";
import RevenuePanel from "@/components/owner/revenue-panel";
import SalesPanel from "@/components/owner/sales-panel";

export default function OwnerDashboard() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role !== "owner") {
    return <Redirect to="/auth" />;
  }

  return (
    <OwnerSidebar>
      <div className="space-y-4 p-6 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user.name}. View and manage your platform's performance.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="user-activity">User Activity</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,568</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +18% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹28,54,280</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +18% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">9,845</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Subscriptions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4,118</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +7.8% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
              <Card className="col-span-5">
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>
                    Recent platform user activity overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <UserActivityPanel />
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Revenue & Sales</CardTitle>
                  <CardDescription>
                    Financial performance overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <RevenuePanel />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="user-activity">
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