import { UserTestResult } from "@shared/schema";
import { Card } from "@/components/ui/card";

interface PerformanceChartProps {
  results: UserTestResult[];
}

export default function PerformanceChart({ results }: PerformanceChartProps) {
  // Get last 6 results or fewer if not enough
  const recentResults = [...results]
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, 6)
    .reverse();
  
  // Calculate percentages
  const percentages = recentResults.map(result => 
    Math.round((result.score / result.totalQuestions) * 100)
  );
  
  // Maximum value for chart scaling
  const maxValue = Math.max(...percentages, 100);
  
  return (
    <div className="h-28 bg-gray-50 rounded-md relative overflow-hidden">
      {percentages.map((percentage, index) => {
        const normalizedHeight = (percentage / maxValue) * 100;
        const width = 100 / (Math.max(percentages.length, 1));
        
        return (
          <div
            key={index}
            className="absolute bottom-0 bg-primary"
            style={{
              left: `${index * width}%`,
              width: `${width}%`,
              height: `${normalizedHeight}%`,
              opacity: 0.7 + (index * 0.05), // Gradually increase opacity
            }}
          />
        );
      })}
    </div>
  );
}
