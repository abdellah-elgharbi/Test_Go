
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { getStudentById, EyeDirection } from "@/data/mockData_";
import Header from "@/components/fraud detection/Header";
import FraudAttemptCard from "@/components/fraud detection/FraudAttemptCard";
import MonitoringExplanation from "@/components/fraud detection/MonitoringExplanation";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/LayoutTeacher";
const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const student = id ? getStudentById(id) : undefined;

  // Calculate eye direction counts
  const eyeDirectionCounts = useMemo(() => {
    if (!student) return { left: 0, right: 0, up: 0, down: 0, straight: 0 };
    
    return student.fraudAttempts.reduce((counts: Record<EyeDirection, number>, attempt) => {
      counts[attempt.eyeDirection] = (counts[attempt.eyeDirection] || 0) + 1;
      return counts;
    }, { left: 0, right: 0, up: 0, down: 0, straight: 0 });
  }, [student]);

  // If student not found, redirect to home page
  useEffect(() => {
    if (!student && id !== undefined) {
      navigate("/teacher/test_detaille");
    }
  }, [student, navigate, id]);

  // If still loading or student not defined, show loading state
  if (!student) {
    return (
     
      <div className="min-h-screen flex flex-col">
       
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
     <Layout>
    <div className="min-h-screen flex flex-col bg-background">
   
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="mb-6">
          <Link to="/teacher/test_detaille">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la liste
            </Button>
          </Link>
          
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                <img 
                  src={student.avatarUrl} 
                  alt={student.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{student.name}</h1>
                <p className="text-gray-600">
                  {student.testName} - {new Date(student.testDate).toLocaleDateString()}
                </p>
              </div>
              
              <div className="md:ml-auto">
                <div className={`rounded-lg px-4 py-2 ${student.fraudAttempts.length > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {student.fraudAttempts.length > 0 
                    ? `${student.fraudAttempts.length} tentative${student.fraudAttempts.length > 1 ? 's' : ''} de fraude détectée${student.fraudAttempts.length > 1 ? 's' : ''}`
                    : 'Aucune tentative de fraude détectée'}
                </div>
              </div>
            </div>
          </div>
          
          <MonitoringExplanation />

          {/* Eye direction counts section */}
          {student.fraudAttempts.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-semibold mb-4">Directions du regard</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                  <ArrowLeft className="h-8 w-8 mb-2 text-blue-500" />
                  <p className="font-medium">Gauche</p>
                  <p className="text-2xl font-bold">{eyeDirectionCounts.left}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                  <ArrowRight className="h-8 w-8 mb-2 text-blue-500" />
                  <p className="font-medium">Droite</p>
                  <p className="text-2xl font-bold">{eyeDirectionCounts.right}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                  <ArrowUp className="h-8 w-8 mb-2 text-blue-500" />
                  <p className="font-medium">Haut</p>
                  <p className="text-2xl font-bold">{eyeDirectionCounts.up}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                  <ArrowDown className="h-8 w-8 mb-2 text-blue-500" />
                  <p className="font-medium">Bas</p>
                  <p className="text-2xl font-bold">{eyeDirectionCounts.down}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                  <Eye className="h-8 w-8 mb-2 text-green-500" />
                  <p className="font-medium">Droit</p>
                  <p className="text-2xl font-bold">{eyeDirectionCounts.straight}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Tentatives de fraude</h2>
            
            {student.fraudAttempts.length > 0 ? (
              <div className="space-y-6">
                {student.fraudAttempts.map(attempt => (
                  <FraudAttemptCard key={attempt.id} attempt={attempt} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-green-50 rounded-lg">
                Aucune tentative de fraude n'a été détectée pour cet étudiant.
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-secondary p-4 text-center text-sm text-gray-600">
        Surveillance Examen &copy; {new Date().getFullYear()} - Tous droits réservés
      </footer>
    </div>
    </Layout>
  );
};

export default StudentDetails;
