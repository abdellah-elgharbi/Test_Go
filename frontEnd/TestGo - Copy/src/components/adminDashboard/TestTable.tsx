
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

interface TestTableProps {
  statistics: TestStatistics[];
  isLoading: boolean;
  showAdditionalData?: boolean;
}

export const TestTable = ({ statistics, isLoading, showAdditionalData = false }: TestTableProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Filière</TableHead>
            <TableHead className="text-right">Tests</TableHead>
            <TableHead className="text-right">Score moyen</TableHead>
            <TableHead className="text-right">Taux de réussite</TableHead>
            <TableHead className="text-right">Nombre d'étudiants</TableHead>
            {showAdditionalData && (
              <>
                <TableHead className="text-right">Durée moyenne (min)</TableHead>
                <TableHead className="text-right">Tentatives moyennes</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {statistics.map((stat) => (
            <TableRow key={stat.filiere}>
              <TableCell className="font-medium">{stat.filiere}</TableCell>
              <TableCell className="text-right">{stat.totalTests}</TableCell>
              <TableCell className="text-right">{stat.scoresMoyens.toFixed(1)}</TableCell>
              <TableCell className="text-right">{stat.tauxReussite.toFixed(1)}%</TableCell>
              <TableCell className="text-right">{stat.nombreEtudiants}</TableCell>
              {showAdditionalData && (
                <>
                  <TableCell className="text-right">{(Math.random() * 30 + 15).toFixed(1)}</TableCell>
                  <TableCell className="text-right">{(Math.random() * 2 + 1).toFixed(1)}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
