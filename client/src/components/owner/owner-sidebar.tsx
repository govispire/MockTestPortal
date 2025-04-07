import { ReactNode, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  LayoutDashboard,
  Users,
  CircleDollarSign,
  ShoppingCart,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface OwnerSidebarProps {
  children: ReactNode;
}

export default function OwnerSidebar({ children }: OwnerSidebarProps) {
  const { logoutMutation } = useAuth();
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/owner-dashboard",
      active: location === "/owner-dashboard",
    },
    {
      label: "User Activity",
      icon: Users,
      href: "/owner-user-activity",
      active: location === "/owner-user-activity",
    },
    {
      label: "Revenue",
      icon: CircleDollarSign,
      href: "/owner-revenue",
      active: location === "/owner-revenue",
    },
    {
      label: "Sales",
      icon: ShoppingCart,
      href: "/owner-sales",
      active: location === "/owner-sales",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/owner-analytics",
      active: location === "/owner-analytics",
    }
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="h-full">
      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden block">
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="h-full flex flex-col border-r">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl">MockPrep</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Owner Dashboard</p>
            </div>
            <ScrollArea className="flex-1 overflow-auto">
              <div className="flex flex-col gap-1 p-2">
                {routes.map((route) => (
                  <Link 
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      variant={route.active ? "secondary" : "ghost"}
                      className={cn("w-full justify-start gap-2", 
                        route.active ? "bg-secondary" : ""
                      )}
                    >
                      <route.icon className="h-4 w-4" />
                      {route.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden md:flex h-full">
        <div className="w-64 flex-col h-full border-r hidden md:flex">
          <div className="p-6 border-b">
            <h2 className="font-bold text-xl">MockPrep</h2>
            <p className="text-sm text-muted-foreground">Owner Dashboard</p>
          </div>
          <ScrollArea className="flex-1 overflow-auto">
            <div className="flex flex-col gap-1 p-2">
              {routes.map((route) => (
                <Link key={route.href} href={route.href}>
                  <Button
                    variant={route.active ? "secondary" : "ghost"}
                    className={cn("w-full justify-start gap-2", 
                      route.active ? "bg-secondary" : ""
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </div>

      {/* Mobile Content */}
      <main className="md:hidden h-full pt-16 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}