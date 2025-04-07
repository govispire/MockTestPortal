import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Test } from "@shared/schema";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import NavigationLayout from "@/components/navigation-layout";
import TestCard from "@/components/test-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PerformanceChart from "@/components/performance-chart";

export default function DashboardPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Tests");

  // Fetch tests
  const { data: tests, isLoading: isLoadingTests } = useQuery<Test[]>({
    queryKey: ["/api/tests"],
  });

  // Fetch categories
  const { data: categories, isLoading: isLoadingCategories } = useQuery<string[]>({
    queryKey: ["/api/categories"],
  });

  // Fetch user test results
  const { data: results, isLoading: isLoadingResults } = useQuery({
    queryKey: ["/api/user/results"],
    enabled: !!user,
  });

  const filteredTests = tests?.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          test.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Tests" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoadingTests || isLoadingCategories || isLoadingResults) {
    return (
      <NavigationLayout>
        <div className="flex items-center justify-center min-h-[500px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </NavigationLayout>
    );
  }

  return (
    <NavigationLayout>
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Main Content */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Available Tests</h2>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search tests..."
                className="pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Test Categories */}
          <div className="flex space-x-2 mb-6 overflow-x-auto py-2">
            <Button
              variant={selectedCategory === "All Tests" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedCategory("All Tests")}
            >
              All Tests
            </Button>
            {categories?.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="rounded-full whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Test Cards */}
          {filteredTests && filteredTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No tests found matching your criteria.</p>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="md:w-1/4 mt-8 md:mt-0">
          {/* User Progress */}
          <Card className="p-4 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Progress</h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Tests Taken</span>
                <span className="text-sm font-medium">{results?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Average Score</span>
                <span className="text-sm font-medium">
                  {results?.length 
                    ? `${Math.round(results.reduce((acc, r) => acc + (r.score / r.totalQuestions) * 100, 0) / results.length)}%` 
                    : "0%"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Time Spent</span>
                <span className="text-sm font-medium">
                  {results?.length 
                    ? `${Math.round(results.reduce((acc, r) => acc + r.timeTaken / 3600, 0))} hrs` 
                    : "0 hrs"}
                </span>
              </div>
            </div>
            {results?.length ? (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Performance</h4>
                <PerformanceChart results={results} />
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">No test attempts yet</p>
                <p className="text-xs text-gray-400 mt-1">Performance data will appear here after taking tests</p>
              </div>
            )}
          </Card>
          
          {/* Recommended Tests */}
          <Card className="p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recommended Tests</h3>
            <ul className="space-y-3">
              {tests?.slice(0, 3).map(test => (
                <li key={test.id} className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">{test.title}</p>
                    <p className="text-xs text-gray-500">{test.duration} min · {test.difficulty}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </NavigationLayout>
  );
}
