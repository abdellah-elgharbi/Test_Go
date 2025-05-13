
import { Card } from "@/components/ui/card";
import { FraudAttempt } from "@/data/mockData_";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";

interface FraudAttemptCardProps {
  attempt: FraudAttempt;
}

const FraudAttemptCard = ({ attempt }: FraudAttemptCardProps) => {
  // Format the timestamp to be more readable
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  // Get the appropriate icon based on eye direction
  const getEyeDirectionIcon = () => {
    switch (attempt.eyeDirection) {
      case 'left':
        return <ArrowLeft className="h-5 w-5" />;
      case 'right':
        return <ArrowRight className="h-5 w-5" />;
      case 'up':
        return <ArrowUp className="h-5 w-5" />;
      case 'down':
        return <ArrowDown className="h-5 w-5" />;
      case 'straight':
      default:
        return null;
    }
  };

  // Get severity badge color
  const getSeverityClass = () => {
    switch (attempt.severity) {
      case 'low':
        return "bg-yellow-100 text-yellow-800";
      case 'medium':
        return "bg-orange-100 text-orange-800";
      case 'high':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get severity text in French
  const getSeverityText = () => {
    switch (attempt.severity) {
      case 'low':
        return "Faible";
      case 'medium':
        return "Moyen";
      case 'high':
        return "Élevé";
      default:
        return "";
    }
  };

  return (
    <Card className="overflow-hidden fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {formatTimestamp(attempt.timestamp)}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getSeverityClass()}`}>
              Risque {getSeverityText()}
            </span>
          </div>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            {getEyeDirectionIcon()}
            Direction: {attempt.eyeDirection.charAt(0).toUpperCase() + attempt.eyeDirection.slice(1)}
          </h3>
          <p className="text-gray-700">{attempt.description}</p>
        </div>
        <div className="bg-gray-100 flex items-center justify-center">
          <img 
            src={attempt.imageUrl} 
            alt="Capture de la tentative" 
            className="object-cover w-full h-full max-h-48"
          />
        </div>
      </div>
    </Card>
  );
};

export default FraudAttemptCard;
