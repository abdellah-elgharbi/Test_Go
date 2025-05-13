
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Module {
  id?: string;
  name: string;
  description: string;
  
  semester: string;
}

interface ModuleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (module: Module) => void;
  initialData?: Module;
  isEditing: boolean;
}

const defaultModule: Module = {
  name: "",
  description: "",
 
  semester: "1",
};

const ModuleForm = ({ isOpen, onClose, onSave, initialData, isEditing }: ModuleFormProps) => {
  const [module, setModule] = useState<Module>(defaultModule);

  useEffect(() => {
    if (initialData) {
      setModule(initialData);
    } else {
      setModule(defaultModule);
    }
  }, [initialData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setModule((prev) => ({ ...prev, [name]: name === "credits" ? Number(value) : value }));
  };

  const handleSemesterChange = (value: string) => {
    setModule((prev) => ({ ...prev, semester: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(module);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier un module" : "Ajouter un nouveau module"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du module</Label>
            <Input
              id="name"
              name="name"
              value={module.name}
              onChange={handleChange}
              required
              placeholder="Nom du module"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={module.description}
              onChange={handleChange}
              placeholder="Description du module"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
        
            <div className="space-y-2">
              <Label htmlFor="semester">Semestre</Label>
              <Select
                value={module.semester}
                onValueChange={handleSemesterChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semestre" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semestre {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {isEditing ? "Mettre à jour" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleForm;
