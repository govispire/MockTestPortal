import { Switch, Route, Redirect } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import TestPage from "@/pages/test-page";
import ResultsPage from "@/pages/results-page";
import HomePage from "@/pages/home-page";
import OwnerDashboard from "@/pages/owner-dashboard";
import OwnerUserActivity from "@/pages/owner-user-activity";
import OwnerRevenue from "@/pages/owner-revenue";
import OwnerSales from "@/pages/owner-sales";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider, useAuth } from "@/hooks/use-auth";

function Router() {
  const { user } = useAuth();

  return (
    <Switch>
      <Route path="/">
        {() => {
          if (user) {
            if (user.role === "owner") {
              return <Redirect to="/owner" />;
            } else {
              return <Redirect to="/dashboard" />;
            }
          }
          return <HomePage />;
        }}
      </Route>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <ProtectedRoute path="/owner" component={OwnerDashboard} />
      <ProtectedRoute path="/owner/user-activity" component={OwnerUserActivity} />
      <ProtectedRoute path="/owner/revenue" component={OwnerRevenue} />
      <ProtectedRoute path="/owner/sales" component={OwnerSales} />
      <ProtectedRoute path="/test/:id" component={TestPage} />
      <ProtectedRoute path="/results/:id" component={ResultsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
