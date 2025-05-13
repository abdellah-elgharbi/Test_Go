
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProgramCardProps {
  id: string;
  name: string;
  description: string;
  moduleCount: number;
}

const ProgramCard = ({ id, name, description, moduleCount }: ProgramCardProps) => {
  const navigate = useNavigate();

  const handleManageClick = () => {
    navigate(`/programs/${id}`);
  };

  return (
    <Card className="overflow-hidden border border-gray-200 rounded-lg transition duration-300 hover:shadow-xl">
      <div className="p-6 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm bg-purple-100 text-purple-800 py-1 px-3 rounded-full">
            {moduleCount} modules
          </span>
          <Button 
            onClick={handleManageClick}
            variant="outline" 
            className="text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-600"
          >
            Gérer les modules
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProgramCard;
