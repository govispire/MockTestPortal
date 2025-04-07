import { useState, useEffect, useCallback } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  initialSeconds: number;
  onExpire: () => void;
}

export default function Timer({ initialSeconds, onExpire }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  
  const formatTime = useCallback(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, [seconds]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(timer);
          onExpire();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onExpire]);
  
  // Determine color based on remaining time
  const isWarning = seconds <= 300; // Less than 5 minutes
  
  return (
    <div className="flex items-center">
      <Clock className={`h-4 w-4 mr-2 ${isWarning ? 'text-red-500' : 'text-primary'}`} />
      <span 
        className={`font-mono ${isWarning ? 'text-red-500 font-bold' : 'text-primary-700 font-medium'}`}
      >
        {formatTime()}
      </span>
    </div>
  );
}
