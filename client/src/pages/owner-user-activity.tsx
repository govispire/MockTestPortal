import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import OwnerSidebar from "@/components/owner/owner-sidebar";
import UserActivityPanel from "@/components/owner/user-activity-panel";

export default function OwnerUserActivity() {
  const { user, isLoading } = useAuth();

  // Redirect if not an owner
  if (!isLoading && (!user || user.role !== "owner")) {
    return <Redirect to="/auth" />;
  }

  return (
    <OwnerSidebar>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Activity</h1>
          <p className="text-muted-foreground">
            Analyze and monitor user engagement metrics across the platform.
          </p>
        </div>
        
        <UserActivityPanel />
      </div>
    </OwnerSidebar>
  );
}