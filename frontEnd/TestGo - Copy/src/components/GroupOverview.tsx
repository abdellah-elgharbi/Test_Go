import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {  ArrowLeft, Users, Book, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';


interface Student {
    id: number;
    name: string;
    email: string;
    progress: number;
    }
    
    interface Test {
    id: number;
    name: string;
    date: string;
    status: string;
    }
    
    interface Group {
    id: number;
    name: string;
    studentCount: number;
    technologies: string[];
    gradientColors: string;
    enseignantResponsable: string;
    filiere: string;
    tests: Test[];
    students: Student[];
    } 
interface GroupOverviewProps {
group: Group;
onBack: () => void;
}
const GroupOverview: React.FC<GroupOverviewProps> = ({ group, onBack }) => {
    return (
        <div className="space-y-6">
        <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
            </Button>
            <h2 className="text-2xl font-bold">{group.name}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Filière</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{group.filiere}</p>
            </CardContent>
            </Card>
            
            <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Étudiants</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{group.studentCount}</p>
            </CardContent>
            </Card>
            
            <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Enseignant Responsable</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{group.enseignantResponsable}</p>
            </CardContent>
            </Card>
        </div>
        
        <Tabs defaultValue="students">
            <TabsList className="mb-4">
            <TabsTrigger value="students">
                <Users className="h-4 w-4 mr-2" />
                Étudiants
            </TabsTrigger>
            <TabsTrigger value="tests">
                <Book className="h-4 w-4 mr-2" />
                Tests planifiés
            </TabsTrigger>
            </TabsList>
            
            <TabsContent value="students" className="mt-0">
            <Card>
                <CardHeader>
                <CardTitle>Liste des étudiants</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="divide-y">
                    {group.students.map(student => (
                    <div key={student.id} className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                        <div className="bg-gray-100 rounded-full p-2 mr-3">
                            <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                        </div>
                        <div>
                        <span className="text-sm font-medium">
                            Progression: {student.progress}%
                        </span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                            <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${student.progress}%` }}
                            ></div>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>
            </TabsContent>
            
            <TabsContent value="tests" className="mt-0">
            <Card>
                <CardHeader>
                <CardTitle>Tests planifiés</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="divide-y">
                    {group.tests.map(test => (
                    <div key={test.id} className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                        <div className="bg-gray-100 rounded-full p-2 mr-3">
                            <Calendar className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                            <p className="font-medium">{test.name}</p>
                            <p className="text-sm text-gray-500">Date: {test.date}</p>
                        </div>
                        </div>
                        <Badge 
                        className={
                            test.status === 'Terminé' ? 'bg-green-100 text-green-800' :
                            test.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                        }
                        >
                        {test.status}
                        </Badge>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
        </div>
    );
    };
    export default GroupOverview;