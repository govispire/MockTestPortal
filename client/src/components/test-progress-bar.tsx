import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TestProgressBarProps {
  value: number;
  variant?: "primary" | "success" | "warning" | "error";
}

export default function TestProgressBar({ 
  value, 
  variant = "primary" 
}: TestProgressBarProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-amber-500";
      case "error":
        return "bg-red-500";
      case "primary":
      default:
        return "bg-primary";
    }
  };
  
  return (
    <Progress 
      value={value} 
      className={cn("h-2 bg-gray-200")}
      indicatorClassName={getVariantClass()}
    />
  );
}
