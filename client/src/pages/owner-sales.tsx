import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect } from "wouter";
import OwnerSidebar from "@/components/owner/owner-sidebar";
import SalesPanel from "@/components/owner/sales-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OwnerSales() {
  const { user, isLoading } = useAuth();

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
          <h1 className="text-3xl font-bold">Sales Performance</h1>
          <p className="text-muted-foreground mt-1">
            Analysis of sales trends, conversion rates, and product performance.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription>
              Comprehensive breakdown of sales performance and product metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SalesPanel />
          </CardContent>
        </Card>
      </div>
    </OwnerSidebar>
  );
}