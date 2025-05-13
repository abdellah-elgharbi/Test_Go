
import React from "react";
import { TrainingGroup } from "@/types/models";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface GroupCardProps {
  group: TrainingGroup;
  onClick?: (group: TrainingGroup) => void;
}

const GroupCard = ({ group, onClick }: GroupCardProps) => {
  // Generate a gradient background color based on the group ID
  const getGradientStyle = (id: string) => {
    const colorMap: Record<string, string> = {
      "1": "from-orange-400 to-red-500",
      "2": "from-pink-400 to-rose-500",
      "3": "from-teal-400 to-blue-500",
    };

    return colorMap[id] || "from-purple-400 to-indigo-500";
  };

  return (
    <Card 
      className="w-full cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick && onClick(group)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center mb-2">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getGradientStyle(group.id)} mr-4`}></div>
          <div>
            <h3 className="text-xl font-bold">{group.name}</h3>
            <p className="text-muted-foreground">{group.studentCount} étudiants</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {group.technology.name}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
