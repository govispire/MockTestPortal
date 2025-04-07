import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import OwnerSidebar from "@/components/owner/owner-sidebar";
import SalesPanel from "@/components/owner/sales-panel";

export default function OwnerSales() {
  const { user, isLoading } = useAuth();

  // Redirect if not an owner
  if (!isLoading && (!user || user.role !== "owner")) {
    return <Redirect to="/auth" />;
  }

  return (
    <OwnerSidebar>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor course purchases, track product performance, and analyze sales data.
          </p>
        </div>
        
        <SalesPanel />
      </div>
    </OwnerSidebar>
  );
}