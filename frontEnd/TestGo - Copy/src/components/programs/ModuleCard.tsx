
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ModuleCardProps {
  id: string;
  name: string;
  description: string;
  credits: number;
  semester: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ModuleCard = ({ id, name, description, credits, semester, onEdit, onDelete }: ModuleCardProps) => {
  return (
    <Card className="overflow-hidden border border-gray-200 rounded-lg transition duration-300 hover:shadow-lg">
      <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-400 text-white">
        <h3 className="text-lg font-bold">{name}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-purple-100 text-purple-800 py-1 px-2 rounded-full">
            {credits} crédits
          </span>
          <span className="text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded-full">
            Semestre {semester}
          </span>
        </div>
        <div className="flex justify-end space-x-2">
          <Button 
            onClick={() => onEdit(id)}
            variant="outline" 
            size="sm"
            className="text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-600"
          >
            Modifier
          </Button>
          <Button 
            onClick={() => onDelete(id)}
            variant="outline" 
            size="sm"
            className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600"
          >
            Supprimer
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ModuleCard;
