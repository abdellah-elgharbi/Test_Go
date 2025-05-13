
import { useState } from "react";
import { Button } from "../../components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { FilterOptions } from "../../types/test";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface FiltrePeriodeProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export const FiltrePeriode = ({ onFilterChange }: FiltrePeriodeProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filiere, setFiliere] = useState<string | null>(null);

  const handleApplyFilters = () => {
    onFilterChange({
      startDate,
      endDate,
      filiere,
    });
  };

  const handleResetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setFiliere(null);
    onFilterChange({
      startDate: null,
      endDate: null,
      filiere: null,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-1 flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Date de début</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP", { locale: fr }) : "Sélectionner..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Date de fin</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP", { locale: fr }) : "Sélectionner..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
             
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Filière</label>
          <Select 
            onValueChange={(value) => setFiliere(value)} 
            value={filiere || undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes les filières" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les filières</SelectItem>
              <SelectItem value="Informatique">Informatique</SelectItem>
              <SelectItem value="Électronique">Électronique</SelectItem>
              <SelectItem value="Mécanique">Mécanique</SelectItem>
              <SelectItem value="Génie Civil">Génie Civil</SelectItem>
              <SelectItem value="Chimie">Chimie</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex gap-2 self-end">
        <Button variant="outline" onClick={handleResetFilters}>
          Réinitialiser
        </Button>
        <Button onClick={handleApplyFilters}>
          Appliquer
        </Button>
      </div>
    </div>
  );
};
