
import { useState, useMemo } from "react";
import { students } from "@/data/mockData_";

import SearchBar from "@/components/fraud detection/SearchBar";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import MonitoringExplanation from "@/components/fraud detection/MonitoringExplanation";
import Layout from "@/components/layout/LayoutTeacher";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TestDetaille = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredStudents = useMemo(() => {
    return students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.testName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Helper function to get severity class for the status badge
  const getSeverityClass = (fraudCount: number) => {
    if (fraudCount === 0) return "bg-green-100 text-green-800";
    if (fraudCount < 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Layout>
    <div className="min-h-screen flex flex-col bg-background">
 
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Surveillance des Examens</h1>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onSearch={setSearchTerm} />
          </div>
          <MonitoringExplanation />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Étudiants 
            <span className="text-gray-500 ml-2">({filteredStudents.length})</span>
          </h2>
          
          {filteredStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Étudiant</TableHead>
                    <TableHead>Nom de l'Examen</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map(student => {
                    const fraudCount = student.fraudAttempts.length;
                    
                    return (
                      <TableRow 
                        key={student.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <TableCell>
                          <Link to={`/teacher/test_detaille/student_fraud/${student.id}`} className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                              <img 
                                src={student.avatarUrl} 
                                alt={student.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{student.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell>{student.testName}</TableCell>
                        <TableCell>{new Date(student.testDate).toLocaleDateString()}</TableCell>
                        <TableCell>45 min</TableCell>
                        <TableCell>78/100</TableCell>
                        <TableCell>
                          <div className={`rounded-full px-3 py-1 text-xs font-medium inline-flex items-center ${getSeverityClass(fraudCount)}`}>
                            {fraudCount > 0 ? (
                              <>
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                {fraudCount} {fraudCount > 1 ? 'alertes' : 'alerte'}
                              </>
                            ) : (
                              'Aucune alerte'
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Aucun étudiant trouvé pour cette recherche.
            </div>
          )}
        </div>
      </main>
      <footer className="bg-secondary p-4 text-center text-sm text-gray-600">
        Surveillance Examen &copy; {new Date().getFullYear()} - Tous droits réservés
      </footer>
    </div>
    </Layout>
  );
};

export default TestDetaille;
