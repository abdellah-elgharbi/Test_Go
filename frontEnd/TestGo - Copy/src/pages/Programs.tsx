import React, { useState } from "react";
import ProgramCard from "@/components/programs/ProgramCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Program {
  id: string;
  name: string;
  description: string;
  moduleCount: number;
}

const Programs = () => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<Program[]>([
    {
      id: "1",
      name: "Informatique",
      description: "Formation en développement logiciel, réseaux et bases de données",
      moduleCount: 8,
    },
    {
      id: "2",
      name: "Génie Civil",
      description: "Formation en conception et construction d'infrastructures",
      moduleCount: 6,
    },
    {
      id: "3",
      name: "Commerce et Gestion",
      description: "Formation en management, finance et marketing",
      moduleCount: 5,
    },
    {
      id: "4",
      name: "Électronique",
      description: "Formation en systèmes électroniques et automation",
      moduleCount: 7,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProgram = () => {
    const program = {
      id: Date.now().toString(),
      name: newProgram.name,
      description: newProgram.description,
      moduleCount: 0,
    };
    
    setPrograms((prev) => [...prev, program]);
    setNewProgram({ name: "", description: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Filière ajoutée",
      description: `La filière ${program.name} a été ajoutée avec succès.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Filières</h1>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Ajouter une filière
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              id={program.id}
              name={program.name}
              description={program.description}
              moduleCount={program.moduleCount}
            />
          ))}
        </div>
      </div>

      {/* Add Program Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle filière</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de la filière</Label>
              <Input
                id="name"
                name="name"
                value={newProgram.name}
                onChange={handleInputChange}
                placeholder="Nom de la filière"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newProgram.description}
                onChange={handleInputChange}
                placeholder="Description de la filière"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddProgram} className="bg-purple-600 hover:bg-purple-700">
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Programs;
