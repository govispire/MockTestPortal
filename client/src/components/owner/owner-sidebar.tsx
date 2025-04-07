import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  BarChart3,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface OwnerSidebarProps {
  children: ReactNode;
}

export default function OwnerSidebar({ children }: OwnerSidebarProps) {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  const isActive = (path: string) => {
    return location === path;
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/owner",
      active: isActive("/owner"),
    },
    {
      icon: Users,
      label: "User Activity",
      path: "/owner/user-activity",
      active: isActive("/owner/user-activity"),
    },
    {
      icon: DollarSign,
      label: "Revenue",
      path: "/owner/revenue",
      active: isActive("/owner/revenue"),
    },
    {
      icon: BarChart3,
      label: "Sales",
      path: "/owner/sales",
      active: isActive("/owner/sales"),
    },
  ];

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-card border-r flex flex-col">
        <div className="p-4 flex items-center space-x-2">
          <div className="rounded-md bg-primary/10 p-1">
            <LayoutDashboard className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold">MockPrep</h1>
        </div>
        <Separator />
        <div className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <TooltipProvider key={item.path} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.path}>
                    <Button
                      variant={item.active ? "default" : "ghost"}
                      className={cn("w-full justify-start gap-2", {
                        "bg-primary text-primary-foreground": item.active,
                      })}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.active && <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="p-3 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}