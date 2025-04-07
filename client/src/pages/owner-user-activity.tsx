import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect } from "wouter";
import OwnerSidebar from "@/components/owner/owner-sidebar";
import UserActivityPanel from "@/components/owner/user-activity-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OwnerUserActivity() {
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
          <h1 className="text-3xl font-bold">User Activity & Purchases</h1>
          <p className="text-muted-foreground mt-1">
            Track user engagement, analyze purchase patterns, and monitor platform usage metrics.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>User Activity and Purchases Breakdown</CardTitle>
            <CardDescription>
              Detailed analysis of user behavior, engagement, and purchase patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserActivityPanel />
          </CardContent>
        </Card>
      </div>
    </OwnerSidebar>
  );
}