import React, { useState } from "react";
import { TrainingGroup, Student, Technology } from "@/types/models";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { students as allStudents, technologies as allTechnologies, programs } from "@/data/mockData";
import { X, Search, Users, Code, Loader2 } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import StudentFilter from "./StudentFilter";

interface GroupDialogProps {
  group?: TrainingGroup;
  open: boolean;
  onClose: () => void;
  onSave: (group: Partial<TrainingGroup>) => void;
  isLoading?: boolean;
}

const GroupDialog = ({ group, open, onClose, onSave, isLoading = false }: GroupDialogProps) => {
  const [name, setName] = useState(group?.name || "");
  const [selectedStudents, setSelectedStudents] = useState<Student[]>(group?.students || []);
  const [selectedTechnology, setSelectedTechnology] = useState<Technology | null>(group?.technology || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");

  const handleSave = () => {
    if (!selectedTechnology) return;
    
    onSave({
      id: group?.id,
      name,
      studentCount: selectedStudents.length,
      students: selectedStudents,
      technology: selectedTechnology,
      teacher: group?.teacher || "Prof. Current",
    });
    onClose();
  };

  const handleStudentSelect = (student: Student) => {
    if (!selectedStudents.some(s => s.id === student.id)) {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const handleStudentRemove = (studentId: string) => {
    setSelectedStudents(selectedStudents.filter(s => s.id !== studentId));
  };

  const handleTechSelect = (techName: string) => {
    const tech = allTechnologies.find(t => t.name === techName);
    if (tech) {
      setSelectedTechnology(tech);
    }
  };

  const handleProgramChange = (program: string) => {
    setSelectedProgram(program);
  };

  const clearAllStudents = () => {
    setSelectedStudents([]);
  };

  const filteredStudents = allStudents.filter(
    student => 
      !selectedStudents.some(s => s.id === student.id) && 
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       student.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedProgram === "all" || student.program === selectedProgram)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] p-6">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {group ? "Modifier le groupe" : "Ajouter un nouveau groupe"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-5">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right font-medium text-sm">
              Nom du groupe:
            </label>
            <Input
              id="name"
              className="col-span-3 shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez le nom du groupe"
            />
          </div>

          <Tabs defaultValue="students" className="mt-2">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="students" className="flex items-center gap-2">
                <Users size={16} />
                <span>Étudiants</span>
                <Badge variant="secondary" className="ml-1 bg-primary/10">
                  {selectedStudents.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="tech" className="flex items-center gap-2">
                <Code size={16} />
                <span>Technologie</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="students" className="space-y-4 pt-4">
              {selectedStudents.length > 0 && (
                <div className="bg-secondary/30 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-medium text-muted-foreground">Étudiants sélectionnés</h4>
                    {selectedStudents.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearAllStudents}
                        className="h-7 text-xs"
                      >
                        Tout effacer
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudents.map(student => (
                      <Badge 
                        key={student.id} 
                        className="flex items-center gap-1 py-1 pl-2 pr-1 bg-primary text-primary-foreground"
                      >
                        {student.name}
                        <button 
                          onClick={() => handleStudentRemove(student.id)}
                          className="ml-1 rounded-full hover:bg-primary-foreground/20 p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher des étudiants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="md:w-1/3">
                  <StudentFilter 
                    selectedProgram={selectedProgram}
                    onProgramChange={handleProgramChange}
                  />
                </div>
              </div>

              <ScrollArea className="h-[240px] border rounded-md overflow-hidden">
                {filteredStudents.length > 0 ? (
                  <ul className="divide-y">
                    {filteredStudents.map(student => (
                      <li 
                        key={student.id} 
                        className="p-3 hover:bg-secondary/50 cursor-pointer transition-colors"
                        onClick={() => handleStudentSelect(student)}
                      >
                        <div className="font-medium">{student.name}</div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-muted-foreground">{student.email}</span>
                          {student.program && (
                            <Badge variant="outline" className="text-xs font-normal bg-blue-50 text-blue-700 border-blue-200">
                              {student.program}
                            </Badge>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
                    <Users className="h-12 w-12 mb-2 opacity-20" />
                    <p className="font-medium">Aucun étudiant trouvé</p>
                    <p className="text-sm">Essayez de modifier vos critères de recherche</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="tech" className="space-y-5 pt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Sélectionner une technologie:
                </label>
                <Select 
                  value={selectedTechnology?.name} 
                  onValueChange={handleTechSelect}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner une technologie" />
                  </SelectTrigger>
                  <SelectContent>
                    {allTechnologies.map((tech) => (
                      <SelectItem key={tech.name} value={tech.name} className="cursor-pointer">
                        {tech.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedTechnology && (
                <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Technologie sélectionnée:</h4>
                  <div className="flex items-center gap-3">
                    <Badge className="px-3 py-1 bg-primary text-primary-foreground">
                      {selectedTechnology.name}
                    </Badge>
                    {selectedTechnology.description && (
                      <p className="text-sm text-muted-foreground">{selectedTechnology.description}</p>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex justify-end gap-3 pt-2 border-t mt-2">
          <Button variant="outline" onClick={onClose} className="font-medium">
            Annuler
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!name || selectedStudents.length === 0 || !selectedTechnology || isLoading}
            className="font-medium min-w-24"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Traitement...
              </>
            ) : group ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupDialog;