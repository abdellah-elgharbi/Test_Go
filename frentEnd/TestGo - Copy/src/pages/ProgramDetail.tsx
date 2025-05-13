import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ModuleCard from "@/components/programs/ModuleCard";
import ModuleForm from "@/components/programs/ModuleForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/LayoutAdmin";
interface Module {
  id: string;
  name: string;
  description: string;
  credits: number;
  semester: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  modules: Module[];
}

const mockPrograms: Record<string, Program> = {
  "1": {
    id: "1",
    name: "Informatique",
    description: "Formation en développement logiciel, réseaux et bases de données",
    modules: [
      {
        id: "1-1",
        name: "Programmation Web",
        description: "Introduction au HTML, CSS et JavaScript",
        credits: 4,
        semester: "1"
      },
      {
        id: "1-2",
        name: "Bases de données",
        description: "Conception et gestion de bases de données relationnelles",
        credits: 3,
        semester: "2"
      },
      {
        id: "1-3",
        name: "Algorithmes et structures de données",
        description: "Analyse et conception d'algorithmes efficaces",
        credits: 5,
        semester: "1"
      },
      {
        id: "1-4",
        name: "Réseaux",
        description: "Fondamentaux des réseaux informatiques",
        credits: 3,
        semester: "3"
      }
    ]
  },
  "2": {
    id: "2",
    name: "Génie Civil",
    description: "Formation en conception et construction d'infrastructures",
    modules: [
      {
        id: "2-1",
        name: "Résistance des matériaux",
        description: "Étude des propriétés mécaniques des matériaux",
        credits: 4,
        semester: "2"
      },
      {
        id: "2-2",
        name: "Mécanique des sols",
        description: "Comportement des sols sous contraintes",
        credits: 3,
        semester: "3"
      }
    ]
  },
  "3": {
    id: "3",
    name: "Commerce et Gestion",
    description: "Formation en management, finance et marketing",
    modules: [
      {
        id: "3-1",
        name: "Marketing fondamental",
        description: "Principes et stratégies de marketing",
        credits: 3,
        semester: "1"
      },
      {
        id: "3-2",
        name: "Comptabilité générale",
        description: "Principes comptables et états financiers",
        credits: 4,
        semester: "2"
      }
    ]
  },
  "4": {
    id: "4",
    name: "Électronique",
    description: "Formation en systèmes électroniques et automation",
    modules: [
      {
        id: "4-1",
        name: "Circuits électriques",
        description: "Analyse et conception de circuits",
        credits: 4,
        semester: "1"
      },
      {
        id: "4-2",
        name: "Électronique numérique",
        description: "Systèmes numériques et logique combinatoire",
        credits: 3,
        semester: "2"
      }
    ]
  }
};

const ProgramDetail = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [program, setProgram] = useState<Program | null>(null);
  const [isModuleFormOpen, setIsModuleFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentModule, setCurrentModule] = useState<Module | undefined>(undefined);
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null);
  
  useEffect(() => {
    if (programId && mockPrograms[programId]) {
      setProgram(mockPrograms[programId]);
    } else {
      navigate("/programs");
    }
  }, [programId, navigate]);

  const handleAddModuleClick = () => {
    setIsEditing(false);
    setCurrentModule(undefined);
    setIsModuleFormOpen(true);
  };

  const handleEditModule = (moduleId: string) => {
    const module = program?.modules.find(m => m.id === moduleId);
    if (module) {
      setCurrentModule(module);
      setIsEditing(true);
      setIsModuleFormOpen(true);
    }
  };

  const handleDeleteModule = (moduleId: string) => {
    setModuleToDelete(moduleId);
  };

  const confirmDeleteModule = () => {
    if (moduleToDelete && program) {
      const updatedModules = program.modules.filter(m => m.id !== moduleToDelete);
      setProgram({ ...program, modules: updatedModules });
      toast({
        title: "Module supprimé",
        description: "Le module a été supprimé avec succès",
      });
      setModuleToDelete(null);
    }
  };

  const handleSaveModule = (moduleData: Module) => {
    if (!program) return;
    
    if (isEditing && currentModule) {
      // Update existing module
      const updatedModules = program.modules.map(m => 
        m.id === currentModule.id ? { ...moduleData, id: currentModule.id } : m
      );
      setProgram({ ...program, modules: updatedModules });
      toast({
        title: "Module mis à jour",
        description: `Le module ${moduleData.name} a été mis à jour avec succès.`,
      });
    } else {
      // Add new module
      const newModule = {
        ...moduleData,
        id: `${program.id}-${Date.now()}`,
      };
      setProgram({ ...program, modules: [...program.modules, newModule] });
      toast({
        title: "Module ajouté",
        description: `Le module ${newModule.name} a été ajouté avec succès.`,
      });
    }
    
    setIsModuleFormOpen(false);
  };

  if (!program) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  const groupedModules = program.modules.reduce((acc, module) => {
    const semester = module.semester;
    if (!acc[semester]) {
      acc[semester] = [];
    }
    acc[semester].push(module);
    return acc;
  }, {} as Record<string, Module[]>);

  const semesters = Object.keys(groupedModules).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <button 
              onClick={() => navigate("/admin/modules")}
              className="text-purple-600 hover:text-purple-800 mb-2 flex items-center"
            >
              &larr; Retour aux filières
            </button>
            <h1 className="text-3xl font-bold text-gray-900">{program.name}</h1>
            <p className="text-gray-600 mt-1">{program.description}</p>
          </div>
          <Button 
            onClick={handleAddModuleClick}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Ajouter un module
          </Button>
        </div>

        {/* Module listing by semester */}
        {semesters.length > 0 ? (
          semesters.map((semester) => (
            <div key={semester} className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Semestre {semester}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedModules[semester].map((module) => (
                  <ModuleCard
                    key={module.id}
                    id={module.id}
                    name={module.name}
                    description={module.description}
                    credits={module.credits}
                    semester={module.semester}
                    onEdit={handleEditModule}
                    onDelete={handleDeleteModule}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun module trouvé pour cette filière. Ajoutez votre premier module.</p>
          </div>
        )}
      </div>

      {/* Module Form Dialog */}
      <ModuleForm
        isOpen={isModuleFormOpen}
        onClose={() => setIsModuleFormOpen(false)}
        onSave={handleSaveModule}
        initialData={currentModule}
        isEditing={isEditing}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={moduleToDelete !== null} onOpenChange={() => setModuleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Le module sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteModule}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </Layout>
  );
};

export default ProgramDetail;
