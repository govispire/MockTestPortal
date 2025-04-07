import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  DollarSign,
  ShoppingCart,
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

interface OwnerSidebarProps {
  children: ReactNode;
}

export default function OwnerSidebar({ children }: OwnerSidebarProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "Logout Successful",
          description: "You have been logged out successfully."
        });
      },
      onError: (error) => {
        toast({
          title: "Logout Failed",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };
  
  const navigation = [
    {
      name: "Dashboard",
      href: "/owner-dashboard",
      icon: LayoutDashboard,
      current: location === "/owner-dashboard"
    },
    {
      name: "User Activity",
      href: "/owner-user-activity",
      icon: Users,
      current: location === "/owner-user-activity"
    },
    {
      name: "Revenue",
      href: "/owner-revenue",
      icon: DollarSign,
      current: location === "/owner-revenue"
    },
    {
      name: "Sales",
      href: "/owner-sales",
      icon: ShoppingCart,
      current: location === "/owner-sales"
    },
    {
      name: "Analytics",
      href: "/owner-analytics",
      icon: BarChart3,
      current: location === "/owner-analytics"
    },
    {
      name: "Content Management",
      href: "/owner-content",
      icon: BookOpen,
      current: location === "/owner-content"
    },
    {
      name: "Settings",
      href: "/owner-settings",
      icon: Settings,
      current: location === "/owner-settings"
    }
  ];
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r border-border bg-card">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <h1 className="text-xl font-bold">MockPrep</h1>
            <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">Owner</span>
          </div>
          
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={cn(
                      "group flex items-center px-3 py-2 rounded-md text-sm font-medium",
                      item.current
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted/50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5",
                        item.current ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    {item.name}
                    {item.current && (
                      <ChevronRight className="ml-auto h-4 w-4 text-primary" />
                    )}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 mt-auto">
            <Separator className="mb-4" />
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt={user?.name || ""} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.role}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <div className="md:hidden fixed w-full z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <h1 className="text-xl font-bold">MockPrep</h1>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <a
                          className={cn(
                            "group flex items-center px-3 py-2 rounded-md text-sm font-medium",
                            item.current
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted/50"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "mr-3 h-5 w-5",
                              item.current ? "text-primary" : "text-muted-foreground"
                            )}
                          />
                          {item.name}
                          {item.current && (
                            <ChevronRight className="ml-auto h-4 w-4 text-primary" />
                          )}
                        </a>
                      </Link>
                    ))}
                  </nav>
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt={user?.name || ""} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.role}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold ml-3">MockPrep</h1>
          </div>
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt={user?.name || ""} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="relative flex-1 overflow-y-auto focus:outline-none pt-0 md:pt-0">
          <div className="md:pt-0 pt-14">{children}</div>
        </main>
      </div>
    </div>
  );
}