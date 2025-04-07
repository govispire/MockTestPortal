import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import OwnerSidebar from "@/components/owner/owner-sidebar";
import RevenuePanel from "@/components/owner/revenue-panel";

export default function OwnerRevenue() {
  const { user, isLoading } = useAuth();

  // Redirect if not an owner
  if (!isLoading && (!user || user.role !== "owner")) {
    return <Redirect to="/auth" />;
  }

  return (
    <OwnerSidebar>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revenue Analytics</h1>
          <p className="text-muted-foreground">
            Track and analyze financial performance and revenue streams.
          </p>
        </div>
        
        <RevenuePanel />
      </div>
    </OwnerSidebar>
  );
}