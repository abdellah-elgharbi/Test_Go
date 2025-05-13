import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { TestStatistics } from "../../types/test";
import { motion } from "framer-motion";
import { TrendingUp, Users, CheckCircle, BookOpen } from "lucide-react";

interface StatisticsCardProps {
  statistics: TestStatistics;
  index?: number;
}

export const StatisticsCard = ({ statistics, index = 0 }: StatisticsCardProps) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(74, 88, 136, 0.1), 0 4px 6px -2px rgba(74, 88, 136, 0.05)",
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2 + index * 0.1
      }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, delay: 0.3 + index * 0.1 }
    }
  };

  // Déterminer la couleur de carte basée sur le taux de réussite
  const getCardColorClass = () => {
    const rate = statistics.tauxReussite;
    if (rate >= 80) return "border-l-8 border-l-[#4385E0]";
    if (rate >= 70) return "border-l-8 border-l-[#89C6F9]";
    return "border-l-8 border-l-[#4A5888]";
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`w-full ${getCardColorClass()}`}
    >
      <Card className="border-[#89C6F9]/30 shadow-sm h-full bg-white overflow-hidden">
        <CardHeader className="pb-2 bg-gradient-to-r from-[#FAFAFC] to-white">
          <CardTitle className="text-sm font-medium text-[#162766] flex items-center justify-between">
            <span>{statistics.filiere}</span>
            <motion.div
              variants={iconVariants}
              className="bg-[#4385E0]/10 p-2 rounded-full"
            >
              <BookOpen size={16} className="text-[#4385E0]" />
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-2">
              <motion.p 
                className="text-2xl font-bold text-[#162766]"
                variants={numberVariants}
              >
                {statistics.totalTests}
              </motion.p>
              <p className="text-xs text-[#4A5888] mb-1">Tests réalisés</p>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="bg-[#89C6F9]/20 p-2 rounded-full mb-2"
                >
                  <TrendingUp size={16} className="text-[#4385E0]" />
                </motion.div>
                <motion.p 
                  className="text-lg font-semibold text-[#162766]"
                  variants={numberVariants}
                >
                  {statistics.scoresMoyens.toFixed(1)}
                </motion.p>
                <p className="text-xs text-[#4A5888]">Score moyen</p>
              </div>
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="bg-[#89C6F9]/20 p-2 rounded-full mb-2"
                >
                  <CheckCircle size={16} className="text-[#4385E0]" />
                </motion.div>
                <motion.p 
                  className="text-lg font-semibold text-[#162766]"
                  variants={numberVariants}
                >
                  {statistics.tauxReussite.toFixed(1)}%
                </motion.p>
                <p className="text-xs text-[#4A5888]">Taux de réussite</p>
              </div>
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="bg-[#89C6F9]/20 p-2 rounded-full mb-2"
                >
                  <Users size={16} className="text-[#4385E0]" />
                </motion.div>
                <motion.p 
                  className="text-lg font-semibold text-[#162766]"
                  variants={numberVariants}
                >
                  {statistics.nombreEtudiants}
                </motion.p>
                <p className="text-xs text-[#4A5888]">Étudiants</p>
              </div>
            </div>
            
            {/* Barre de progression pour le taux de réussite */}
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-[#4A5888]">Progression</span>
                <span className="text-xs font-medium text-[#162766]">{statistics.tauxReussite.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[#89C6F9]/20 rounded-full h-2">
                <motion.div 
                  className="bg-[#4385E0] h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${statistics.tauxReussite}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};