import { QuestionWithParsedOptions } from "@shared/schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuestionDisplayProps {
  question: QuestionWithParsedOptions;
  questionNumber: number;
  selectedAnswerId?: string;
  onAnswerSelect: (answerId: string) => void;
  showMobileNav?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function QuestionDisplay({
  question,
  questionNumber,
  selectedAnswerId,
  onAnswerSelect,
  showMobileNav = false,
  onPrevious,
  onNext,
}: QuestionDisplayProps) {
  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-medium text-gray-900">Question {questionNumber}</h2>
        {showMobileNav && (
          <div className="lg:hidden flex space-x-2">
            {onPrevious && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center" 
                onClick={onPrevious}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </Button>
            )}
            {onNext && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center" 
                onClick={onNext}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        )}
      </div>
      
      <div className="prose max-w-none mb-6">
        <p className="text-gray-800">{question.text}</p>
      </div>
      
      <RadioGroup 
        value={selectedAnswerId} 
        onValueChange={onAnswerSelect}
        className="space-y-3"
      >
        {question.options.map((option) => (
          <div 
            key={option.id} 
            className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50"
          >
            <RadioGroupItem id={`option-${option.id}`} value={option.id} />
            <Label 
              htmlFor={`option-${option.id}`} 
              className="flex-1 cursor-pointer text-gray-800"
            >
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
