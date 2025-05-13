
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { TestStatistics } from "../../types/test";
import { Skeleton } from "../../components/ui/skeleton";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

interface NiveauxTableProps {
  statistics: TestStatistics[];
  isLoading: boolean;
}

export const NiveauxTable = ({ statistics, isLoading }: NiveauxTableProps) => {
  const [selectedFiliere, setSelectedFiliere] = useState<string | null>(null);
  
  const selectedData = selectedFiliere 
    ? statistics.find(stat => stat.filiere === selectedFiliere)
    : null;

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Sélectionnez une filière pour voir les détails par niveau
        </div>
        <div className="w-64">
          <Select
            value={selectedFiliere || ""}
            onValueChange={(value) => setSelectedFiliere(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir une filière" />
            </SelectTrigger>
            <SelectContent>
              {statistics.map((stat) => (
                <SelectItem key={stat.filiere} value={stat.filiere}>
                  {stat.filiere}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedData && selectedData.niveaux && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Niveau</TableHead>
                <TableHead className="text-right">Tests</TableHead>
                <TableHead className="text-right">Score moyen</TableHead>
                <TableHead className="text-right">Taux de réussite</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedData.niveaux.map((niveau) => (
                <TableRow key={niveau.niveau}>
                  <TableCell className="font-medium">{niveau.niveau}</TableCell>
                  <TableCell className="text-right">{niveau.totalTests}</TableCell>
                  <TableCell className="text-right">{niveau.scoresMoyens.toFixed(1)}</TableCell>
                  <TableCell className="text-right">{niveau.tauxReussite.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedFiliere && (!selectedData || !selectedData.niveaux || selectedData.niveaux.length === 0) && (
        <div className="text-center py-8 text-muted-foreground">
          Aucune donnée de niveau disponible pour cette filière
        </div>
      )}

      {!selectedFiliere && (
        <div className="text-center py-8 text-muted-foreground">
          Veuillez sélectionner une filière pour afficher les niveaux
        </div>
      )}
    </div>
  );
};
