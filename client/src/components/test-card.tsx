import { Test } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Users } from "lucide-react";

interface TestCardProps {
  test: Test;
}

export default function TestCard({ test }: TestCardProps) {
  const [, navigate] = useLocation();

  const handleStartTest = () => {
    navigate(`/test/${test.id}`);
  };

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative h-36 bg-primary-100">
        {test.imageUrl && (
          <img 
            src={test.imageUrl} 
            alt={`${test.title} cover`} 
            className="w-full h-full object-cover" 
          />
        )}
        <div className="absolute bottom-0 right-0 bg-primary text-white px-3 py-1 text-sm">
          {test.duration} min
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{test.title}</h3>
        <p className="text-sm text-gray-600 mb-3">
          {test.numberOfQuestions} questions · {test.difficulty} difficulty
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <Users className="text-secondary h-4 w-4 mr-1" />
            <span className="text-xs text-gray-600">
              {test.attemptCount?.toLocaleString() || 0} attempts
            </span>
          </div>
          <Button onClick={handleStartTest} size="sm">
            Start Test
          </Button>
        </div>
      </div>
    </Card>
  );
}
