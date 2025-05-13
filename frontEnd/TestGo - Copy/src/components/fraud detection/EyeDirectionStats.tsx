
import { Card } from "@/components/ui/card";
import { FraudAttempt, EyeDirection } from "@/data/mockData_";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Eye } from "lucide-react";

interface EyeDirectionStatsProps {
  fraudAttempts: FraudAttempt[];
}

const EyeDirectionStats = ({ fraudAttempts }: EyeDirectionStatsProps) => {
  // Count occurrences of each direction
  const directionCounts: Record<EyeDirection, number> = {
    left: 0,
    right: 0,
    straight: 0,
    down: 0,
    up: 0
  };

  fraudAttempts.forEach(attempt => {
    directionCounts[attempt.eyeDirection]++;
  });

  // Format data for the chart
  const data = Object.entries(directionCounts)
    .map(([direction, count]) => ({ 
      direction, 
      count,
      // Translate direction to French
      label: direction === 'left' ? 'Gauche' : 
             direction === 'right' ? 'Droite' : 
             direction === 'straight' ? 'Devant' : 
             direction === 'up' ? 'Haut' : 
             'Bas'
    }))
    .filter(item => item.count > 0);

  // Define color mapping for each direction
  const directionColors: Record<string, string> = {
    left: '#FEC6A1',    // Orange tint
    right: '#FEC6A1',   // Orange tint
    up: '#E5DEFF',      // Purple tint
    down: '#D3E4FD',    // Blue tint
    straight: '#F2FCE2' // Green tint
  };

  // Get the appropriate icon for each direction
  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'left': return <ArrowLeft className="h-4 w-4" />;
      case 'right': return <ArrowRight className="h-4 w-4" />;
      case 'up': return <ArrowUp className="h-4 w-4" />;
      case 'down': return <ArrowDown className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  if (fraudAttempts.length === 0) {
    return (
      <Card className="p-6 bg-green-50 text-center text-gray-500">
        <p>Aucune donnée de direction de regard disponible</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Direction du regard - Nombre d'occurrences</h3>
      <div className="h-64">
        <ChartContainer
          config={{
            direction: {
              theme: {
                light: '#65a30d', // Green color for text
                dark: '#84cc16',
              },
            },
          }}
        >
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
            <XAxis 
              dataKey="label"
              tick={{ fill: '#65a30d' }}
              tickLine={{ stroke: '#65a30d' }}
            />
            <YAxis 
              tick={{ fill: '#65a30d' }}
              tickLine={{ stroke: '#65a30d' }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent />
              }
            />
            <Bar dataKey="count" name="Nombre de fois">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={directionColors[entry.direction] || '#8884d8'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.direction} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            {getDirectionIcon(item.direction)}
            <span className="font-medium">{item.label}:</span>
            <span>{item.count} fois</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EyeDirectionStats;
