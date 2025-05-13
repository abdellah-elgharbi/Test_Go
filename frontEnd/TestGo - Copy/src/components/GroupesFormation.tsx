import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft, Users, Book, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import GroupOverview from '@/components/GroupOverview';

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

const groupsData: Group[] = [
{
    id: 1,
    name: '2ITE-1',
    studentCount: 30,
    technologies: ['Java', 'SQL', 'Python', 'XML'],
    gradientColors: 'from-red-500 to-yellow-500',
    enseignantResponsable: 'Dr. Martin Dupont',
    filiere: 'Informatique et Télécommunications',
    tests: [
    { id: 1, name: 'Examen Java', date: '15/04/2025', status: 'À venir' },
    { id: 2, name: 'TP SQL', date: '22/03/2025', status: 'Terminé' },
    ],
    students: [
    { id: 1, name: 'Emma Laurent', email: 'emma.l@edu.fr', progress: 85 },
    { id: 2, name: 'Thomas Bernard', email: 'thomas.b@edu.fr', progress: 72 },
    { id: 3, name: 'Sophie Martin', email: 'sophie.m@edu.fr', progress: 91 },
    ]
},
{
    id: 2,
    name: '2ITE-2',
    studentCount: 25,
    technologies: ['Spring', 'C#'],
    gradientColors: 'from-orange-400 to-pink-500',
    enseignantResponsable: 'Prof. Claire Moreau',
    filiere: 'Informatique et Télécommunications',
    tests: [
    { id: 1, name: 'Projet Spring', date: '10/04/2025', status: 'À venir' },
    { id: 2, name: 'Contrôle C#', date: '05/03/2025', status: 'Terminé' },
    ],
    students: [
    { id: 1, name: 'Lucas Petit', email: 'lucas.p@edu.fr', progress: 78 },
    { id: 2, name: 'Julie Dubois', email: 'julie.d@edu.fr', progress: 88 },
    ]
},
{
    id: 3,
    name: 'ISIC-2',
    studentCount: 40,
    technologies: ['JS', 'JAVA', 'C', 'Python', 'SQL'],
    gradientColors: 'from-green-400 to-blue-500',
    enseignantResponsable: 'Dr. Philippe Rousseau',
    filiere: 'Ingénierie des Systèmes d\'Information et de Communication',
    tests: [
    { id: 1, name: 'Évaluation JavaScript', date: '20/04/2025', status: 'À venir' },
    { id: 2, name: 'Projet Java', date: '12/03/2025', status: 'En cours' },
    { id: 3, name: 'QCM SQL', date: '01/03/2025', status: 'Terminé' },
    ],
    students: [
    { id: 1, name: 'Antoine Leroy', email: 'antoine.l@edu.fr', progress: 82 },
    { id: 2, name: 'Marie Girard', email: 'marie.g@edu.fr', progress: 75 },
    { id: 3, name: 'Nicolas Fournier', email: 'nicolas.f@edu.fr', progress: 90 },
    ]
},
];

interface GroupOverviewProps {
group: Group;
onBack: () => void;
}

const GroupesFormation: React.FC = () => {
const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

// Function to handle group selection
const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
};

// Function to go back to the groups list
const handleBackToList = () => {
    setSelectedGroup(null);
};

return (
    <div className="container mx-auto p-6 max-w-4xl">
    {!selectedGroup ? (
        // Groups list view
        <>
        <h1 className="text-2xl font-bold mb-6">Groupes de formation</h1>
        
        {/* Search and actions bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-auto flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
                type="text" 
                placeholder="Search" 
                className="pl-10 w-full"
            />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm">action1</Button>
            <Button variant="outline" size="sm">action2</Button>
            <Button variant="outline" size="sm">action3</Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Ajouter un groupe
            </Button>
            </div>
        </div>
        
        {/* Groups display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groupsData.map((group) => (
            <div 
                key={group.id} 
                className="relative bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleGroupClick(group)}
            >
                {/* Group icon with gradient */}
                <div className={`absolute top-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br ${group.gradientColors}`}></div>
                
                {/* Group content with left margin to accommodate the icon */}
                <div className="ml-16">
                <h3 className="font-bold text-lg">{group.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{group.studentCount} étudiants</p>
                
                {/* Technology badges */}
                <div className="flex flex-wrap gap-1.5">
                    {group.technologies.map((tech, index) => (
                    <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-white text-xs py-0.5"
                    >
                        {tech}
                    </Badge>
                    ))}
                </div>
                </div>
            </div>
            ))}
        </div>
        </>
    ) : (
        // Group overview
        <GroupOverview group={selectedGroup} onBack={handleBackToList} />
    )}
    </div>
);
};

export default GroupesFormation;