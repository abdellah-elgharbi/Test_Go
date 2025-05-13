
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Student } from "@/data/mockData_";
import { AlertTriangle } from "lucide-react";

interface StudentCardProps {
  student: Student;
}

const StudentCard = ({ student }: StudentCardProps) => {
  const fraudCount = student.fraudAttempts.length;
  const hasFraud = fraudCount > 0;
  
  // Determine severity class based on the number of fraud attempts
  const getSeverityClass = () => {
    if (fraudCount === 0) return "bg-green-100 text-green-800";
    if (fraudCount < 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Link to={`/student/${student.id}`}>
      <Card className="hover-scale p-4 h-full border transition-all hover:border-primary">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
            <img 
              src={student.avatarUrl} 
              alt={student.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">{student.name}</h3>
            <p className="text-sm text-gray-600">
              {student.testName} - {new Date(student.testDate).toLocaleDateString()}
            </p>
          </div>
          <div className={`rounded-full px-3 py-1 text-xs font-medium flex items-center ${getSeverityClass()}`}>
            {hasFraud ? (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" />
                {fraudCount} {fraudCount > 1 ? 'alertes' : 'alerte'}
              </>
            ) : (
              'Aucune alerte'
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default StudentCard;
