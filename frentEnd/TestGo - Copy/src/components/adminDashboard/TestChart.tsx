import { useEffect, useState } from "react";
import { TestStatistics } from "../../types/test";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

interface TestChartProps {
  statistics: TestStatistics[];
}

// Couleurs pour les graphiques
const COLORS = ["#0ea5e9", "#10b981", "#8884d8", "#82ca9d", "#fbbf24", "#f87171", "#a78bfa"];

export const TestChart = ({ statistics }: TestChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartView, setChartView] = useState<string>("scores");
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Vérifier que les statistiques existent et ne sont pas vides
    if (!statistics || statistics.length === 0) {
      console.log("Aucune donnée de statistiques disponible");
      return;
    }

    // S'assurer que toutes les propriétés nécessaires sont présentes et converties en nombres
    const formattedData = statistics.map((stat) => {
      // Vérification des valeurs et conversion appropriée
      const scoresMoyens = typeof stat.scoresMoyens === 'number' 
        ? parseFloat(stat.scoresMoyens.toFixed(2)) 
        : parseFloat((parseFloat(stat.scoresMoyens as any) || 0).toFixed(2));
      
      const tauxReussite = typeof stat.tauxReussite === 'number' 
        ? parseFloat(stat.tauxReussite.toFixed(2)) 
        : parseFloat((parseFloat(stat.tauxReussite as any) || 0).toFixed(2));
      
      const nombreEtudiants = typeof stat.nombreEtudiants === 'number' 
        ? stat.nombreEtudiants 
        : parseInt(stat.nombreEtudiants as any) || 0;

      return {
        name: stat.filiere || "Non spécifié",
        scoresMoyens,
        tauxReussite,
        nombreEtudiants,
      };
    });
    
    console.log("Données formatées:", formattedData);
    setChartData(formattedData);
  }, [statistics]);

  // Fonction pour le rendu du secteur actif dans le PieChart
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
    
    return (
      <g>
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="#888">
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#333" fontSize="24px" fontWeight="bold">
          {chartView === "scores" ? `${value}` : chartView === "reussite" ? `${value}%` : value}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  // Gestionnaire pour la PieChart interactive
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  // Configuration des axes Y selon le type de données
  const getYAxisConfig = () => {
    if (chartView === "reussite") {
      return {
        domain: [0, 100] as [number, number],
        label: { value: "Pourcentage (%)", angle: -90, position: "insideLeft" },
        tickFormatter: (value: number) => `${value}%`
      };
    } else if (chartView === "scores") {
      return {
        label: { value: "Score", angle: -90, position: "insideLeft" }
      };
    } else {
      return {
        label: { value: "Nombre d'étudiants", angle: -90, position: "insideLeft" }
      };
    }
  };

  // Configuration du tooltip personnalisé
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-md rounded-md border border-gray-200">
          <p className="font-bold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${chartView === "reussite" ? `${entry.value}%` : entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Si aucune donnée n'est disponible, afficher un message
  if (chartData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 p-4 rounded-lg shadow">
        <p className="text-gray-500">Aucune donnée disponible pour afficher le graphique</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 p-4 rounded-lg shadow" style={{ minHeight: "400px" }}>
      <div className="flex justify-between items-center mb-6">
        <Tabs
          defaultValue="scores"
          className="mr-4"
          onValueChange={setChartView}
        >
          <TabsList>
            <TabsTrigger value="scores">Scores Moyens</TabsTrigger>
            <TabsTrigger value="reussite">Taux de Réussite</TabsTrigger>
            <TabsTrigger value="nombreEtudiants">Nombre d'Étudiants</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 rounded-md ${
              chartType === "bar" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Barres
          </button>
          <button
            onClick={() => setChartType("pie")}
            className={`px-3 py-1 rounded-md ${
              chartType === "pie" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Circulaire
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-white p-4 rounded-md shadow-sm" style={{ minHeight: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name"
                tick={{ fill: "#666" }}
                axisLine={{ stroke: "#ccc" }}
              />
              <YAxis
                {...getYAxisConfig()}
                tick={{ fill: "#666" }}
                axisLine={{ stroke: "#ccc" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              {chartView === "scores" && (
                <Bar
                  dataKey="scoresMoyens"
                  name="Score moyen"
                  fill="#0ea5e9"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              )}
              {chartView === "reussite" && (
                <Bar
                  dataKey="tauxReussite"
                  name="Taux de réussite"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              )}
              {chartView === "nombreEtudiants" && (
                <Bar
                  dataKey="nombreEtudiants"
                  name="Nombre d'étudiants"
                  fill="#82ca9d"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              )}
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                dataKey={
                  chartView === "scores"
                    ? "scoresMoyens"
                    : chartView === "reussite"
                    ? "tauxReussite"
                    : "nombreEtudiants"  
                }
                onMouseEnter={onPieEnter}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ paddingTop: "30px" }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};