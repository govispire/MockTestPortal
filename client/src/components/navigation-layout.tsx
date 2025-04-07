import { ReactNode, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, ChevronDown, 
  BookOpen, Library, BookMarked, 
  Calendar, LineChart, FileText, 
  Activity, Settings, LogOut, Zap, Info 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationLayoutProps {
  children: ReactNode;
}

export default function NavigationLayout({ children }: NavigationLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const getInitials = () => {
    if (!user) return "";
    if (user.name) {
      return user.name.split(" ")
        .map(name => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user.username.slice(0, 2).toUpperCase();
  };
  
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Courses", path: "/courses", icon: <Library className="h-4 w-4" /> },
    { name: "Tests", path: "/tests", icon: <BookMarked className="h-4 w-4" /> },
    { name: "Calendar", path: "/calendar", icon: <Calendar className="h-4 w-4" /> },
    { name: "Performance", path: "/performance", icon: <LineChart className="h-4 w-4" /> },
    { name: "PDF Courses", path: "/pdf-courses", icon: <FileText className="h-4 w-4" /> },
    { name: "Current Affairs", path: "/current-affairs", icon: <Activity className="h-4 w-4" /> },
    { name: "Speed Drills", path: "/speed-drills", icon: <Zap className="h-4 w-4" /> },
  ];
  
  const accountItems = [
    { name: "Settings", path: "/settings", icon: <Settings className="h-4 w-4" /> },
    { name: "Help", path: "/help", icon: <Info className="h-4 w-4" /> },
  ];
  
  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 
                  className="text-2xl font-bold text-primary cursor-pointer" 
                  onClick={() => navigate("/")}
                >
                  MockPrep
                </h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.slice(0, 3).map(item => (
                <Button 
                  key={item.path}
                  variant={location === item.path ? "default" : "ghost"} 
                  onClick={() => navigate(item.path)}
                  className="gap-2"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Button>
              ))}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-3 flex items-center gap-1">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white">
                      {getInitials()}
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name || user?.username}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  {accountItems.map(item => (
                    <DropdownMenuItem key={item.path} onClick={() => navigate(item.path)}>
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <div className="flex items-center gap-2 text-red-500">
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1 px-2">
              {menuItems.map(item => (
                <Button 
                  key={item.path}
                  variant={location === item.path ? "default" : "ghost"}
                  className="w-full justify-start gap-2" 
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                    {getInitials()}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name || user?.username}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                >
                  <Settings className="h-4 w-4" />
                  <span>Your Profile</span>
                </Button>
                {accountItems.map(item => (
                  <Button 
                    key={item.path}
                    variant="ghost" 
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Button>
                ))}
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-red-500"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
