import React from "react";
import { programs } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface StudentFilterProps {
  selectedProgram: string;
  onProgramChange: (program: string) => void;
}

const StudentFilter = ({ selectedProgram, onProgramChange }: StudentFilterProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="program-filter">Filtrer par filière</Label>
      <Select value={selectedProgram} onValueChange={onProgramChange}>
        <SelectTrigger id="program-filter" className="w-full">
          <SelectValue placeholder="Toutes les filières" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les filières</SelectItem>
          {programs.map((program) => (
            <SelectItem key={program} value={program}>{program}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StudentFilter;
