import { QuestionWithParsedOptions, UserAnswer } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

interface QuestionNavigationProps {
  questions: QuestionWithParsedOptions[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  onQuestionClick: (index: number) => void;
}

export default function QuestionNavigation({
  questions,
  currentQuestionIndex,
  userAnswers,
  onQuestionClick,
}: QuestionNavigationProps) {
  return (
    <Card className="sticky top-6">
      <CardContent className="p-4">
        <h2 className="text-sm font-medium text-gray-700 mb-3">Question Navigation</h2>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((question, index) => {
            const isAnswered = userAnswers.some(a => a.questionId === question.id);
            const isCurrent = index === currentQuestionIndex;
            
            let buttonClasses = "h-8 w-8 flex items-center justify-center rounded-md text-sm ";
            
            if (isCurrent) {
              buttonClasses += "bg-primary text-white";
            } else if (isAnswered) {
              buttonClasses += "bg-secondary text-white";
            } else {
              buttonClasses += "bg-gray-200 text-gray-700 hover:bg-gray-300";
            }
            
            return (
              <button
                key={question.id}
                className={buttonClasses}
                onClick={() => onQuestionClick(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        
        <div className="mt-6 space-y-2">
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-primary"></div>
            <span className="text-xs text-gray-600 ml-2">Current question</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-secondary"></div>
            <span className="text-xs text-gray-600 ml-2">Answered</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-gray-200"></div>
            <span className="text-xs text-gray-600 ml-2">Unanswered</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
