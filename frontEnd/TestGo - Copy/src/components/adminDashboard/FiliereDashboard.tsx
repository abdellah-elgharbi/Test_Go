import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Download, BarChart3, PieChart, Table, Filter } from "lucide-react";
import { TestStatistics, FilterOptions } from "../../types/test";
import { TestTable } from "./TestTable";
import { NiveauxTable } from "./NiveauxTable";
import { FiltrePeriode } from "./FiltrePeriode";
import { TestChart } from "./TestChart";
import { exportToCSV } from "../../utils/csvExport";
import { motion } from "framer-motion";
import Layout from "../layout/LayoutTeacher";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  }
};

export const FiliereDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("statistiques");
  const [statistics, setStatistics] = useState<TestStatistics[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    startDate: null,
    endDate: null,
    filiere: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Données factices pour la démo
  useEffect(() => {
    setIsLoading(true);
    // Simuler un chargement des données
    setTimeout(() => {
      const mockStatistics: TestStatistics[] = [
        {
          filiere: "Informatique",
          totalTests: 145,
          scoresMoyens: 76.5,
          tauxReussite: 82.3,
          nombreEtudiants: 230,
          niveaux: [
            { niveau: " 1 annee", totalTests: 45, scoresMoyens: 72.3, tauxReussite: 78.5 },
            { niveau: " 2 annee", totalTests: 52, scoresMoyens: 78.1, tauxReussite: 84.2 },
            { niveau: " 3 annee", totalTests: 48, scoresMoyens: 79.2, tauxReussite: 85.7 }
          ]
        },
        {
          filiere: "Électronique",
          totalTests: 98,
          scoresMoyens: 71.2,
          tauxReussite: 75.8,
          nombreEtudiants: 182,
          niveaux: [
            { niveau: "1 anee ", totalTests: 32, scoresMoyens: 68.5, tauxReussite: 72.1 },
            { niveau: " 2 annee", totalTests: 35, scoresMoyens: 72.4, tauxReussite: 76.8 },
            { niveau: "3 annee", totalTests: 31, scoresMoyens: 73.1, tauxReussite: 79.2 }
          ]
        },
        {
          filiere: "Mécanique",
          totalTests: 112,
          scoresMoyens: 68.7,
          tauxReussite: 70.1,
          nombreEtudiants: 195,
          niveaux: [
            { niveau: "anee 1", totalTests: 38, scoresMoyens: 65.2, tauxReussite: 67.3 },
            { niveau: "anee 2", totalTests: 40, scoresMoyens: 69.8, tauxReussite: 71.5 },
            { niveau: "anee 3", totalTests: 34, scoresMoyens: 71.4, tauxReussite: 72.0 }
          ]
        },
        {
          filiere: "Génie Civil",
          totalTests: 87,
          scoresMoyens: 73.4,
          tauxReussite: 78.6,
          nombreEtudiants: 162,
          niveaux: [
            { niveau: "anee 1", totalTests: 28, scoresMoyens: 70.1, tauxReussite: 74.2 },
            { niveau: "anee 2", totalTests: 31, scoresMoyens: 74.5, tauxReussite: 79.8 },
            { niveau: "anee 3", totalTests: 28, scoresMoyens: 75.9, tauxReussite: 82.1 }
          ]
        },
        {
          filiere: "Chimie",
          totalTests: 76,
          scoresMoyens: 75.1,
          tauxReussite: 80.2,
          nombreEtudiants: 148,
          niveaux: [
            { niveau: "anee 1", totalTests: 24, scoresMoyens: 72.8, tauxReussite: 77.5 },
            { niveau: "anee 2", totalTests: 28, scoresMoyens: 75.2, tauxReussite: 81.3 },
            { niveau: "anee 3", totalTests: 24, scoresMoyens: 77.6, tauxReussite: 82.4 }
          ]
        },
      ];
      setStatistics(mockStatistics);
      setIsLoading(false);
    }, 1000);
  }, [filterOptions]);

  const handleExportCSV = () => {
    exportToCSV(statistics, "statistiques_filieres");
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const getTabIcon = (tabName: string) => {
    switch (tabName) {
      case "statistiques":
        return <Table size={18} />;
      case "graphiques":
        return <BarChart3 size={18} />;
      case "donnees":
        return <PieChart size={18} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
    <motion.div 
      className="container mx-auto px-4 py-8 bg-gradient-to-br from-emerald-50 to-teal-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex items-center justify-between mb-8"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold text-emerald-800 relative">
            Statistiques par Filière
          </h1>
          <p className="text-emerald-600 mt-2">
            Visualisez et analysez les résultats des tests par filière d'études
          </p>
        </div>
        <div className="flex gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-700 text-white transition-colors duration-300"
              onClick={handleExportCSV}
            >
              <Download size={16} />
              Exporter CSV
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      {showFilters && (
        <motion.div 
          className="mb-6"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Tabs
          defaultValue="statistiques"
          className="mt-8"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-emerald-100/40 backdrop-blur-sm p-1 rounded-xl border border-emerald-200/50">
            {["statistiques", "graphiques", "donnees"].map((tab) => (
              <motion.div
                key={tab}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TabsTrigger 
                  value={tab}
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white hover:text-emerald-800 transition-all duration-300 flex items-center gap-2 capitalize"
                >
                  {getTabIcon(tab)}
                  {tab}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>

          <TabsContent value="statistiques" className="space-y-6">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="border border-emerald-200/50 shadow-lg backdrop-blur-sm bg-white/60 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white rounded-t-lg">
                  <CardTitle>Comparaison des filières</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {isLoading ? (
                    <motion.div 
                      className="w-full h-32 flex justify-center items-center"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    <TestTable statistics={statistics} isLoading={isLoading} />
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Card className="border border-emerald-200/50 shadow-lg backdrop-blur-sm bg-white/60 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white rounded-t-lg">
                  <CardTitle>Statistiques par niveau</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {isLoading ? (
                    <motion.div 
                      className="w-full h-32 flex justify-center items-center"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    <NiveauxTable statistics={statistics} isLoading={isLoading} />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="graphiques">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="border border-emerald-200/50 shadow-lg backdrop-blur-sm bg-white/60 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white rounded-t-lg">
                  <CardTitle>Visualisation des performances</CardTitle>
                </CardHeader>
                <CardContent className="h-96 p-6">
                  {isLoading ? (
                    <motion.div 
                      className="w-full h-full flex justify-center items-center"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="w-full h-full"
                    >
                      <TestChart statistics={statistics} />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="donnees">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="border border-emerald-200/50 shadow-lg backdrop-blur-sm bg-white/60 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white rounded-t-lg">
                  <CardTitle>Données brutes par filière</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {isLoading ? (
                    <motion.div 
                      className="w-full h-32 flex justify-center items-center"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    <TestTable statistics={statistics} isLoading={isLoading} showAdditionalData />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
    </Layout>
  );
};