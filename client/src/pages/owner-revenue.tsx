import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect } from "wouter";
import OwnerSidebar from "@/components/owner/owner-sidebar";
import RevenuePanel from "@/components/owner/revenue-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OwnerRevenue() {
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
          <h1 className="text-3xl font-bold">Revenue & Payment Management</h1>
          <p className="text-muted-foreground mt-1">
            Financial overview, payment processing, and revenue analytics for the platform.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Revenue & Payment Management</CardTitle>
            <CardDescription>
              Total earnings breakdown, transaction history, subscription plan management, and payouts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RevenuePanel />
          </CardContent>
        </Card>
      </div>
    </OwnerSidebar>
  );
}