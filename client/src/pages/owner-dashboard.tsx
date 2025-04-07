import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, LayoutDashboard, LineChart, Users, ShoppingCart } from "lucide-react";
import { Redirect, useLocation } from "wouter";

import OwnerSidebar from "@/components/owner/owner-sidebar";
import MetricsPanel from "@/components/owner/metrics-panel";
import UserActivityPanel from "@/components/owner/user-activity-panel";
import RevenuePanel from "@/components/owner/revenue-panel";
import SalesPanel from "@/components/owner/sales-panel";

export default function OwnerDashboard() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("metrics");
  const [location] = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  if (user.role !== "owner") {
    return <Redirect to="/dashboard" />;
  }

  return (
    <OwnerSidebar>
      <div className="container py-8 px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive overview of platform metrics, user activity, revenue, and sales performance.
          </p>
        </div>

        <Tabs defaultValue="metrics" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid sm:grid-cols-4 grid-cols-2 w-full max-w-md gap-2">
              <TabsTrigger value="metrics" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Metrics</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="revenue" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span className="hidden sm:inline">Revenue</span>
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Sales</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </div>
          </div>

          <TabsContent value="metrics" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Platform Metrics</CardTitle>
                <CardDescription>
                  Key performance indicators and platform analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricsPanel />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>User Activity and Purchases</CardTitle>
                <CardDescription>
                  Detailed analysis of user behavior, engagement, and purchase patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserActivityPanel />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Revenue & Payment Management</CardTitle>
                <CardDescription>
                  Financial performance, earnings breakdown, and transaction history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RevenuePanel />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>
                  Detailed analysis of sales trends and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SalesPanel />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OwnerSidebar>
  );
}