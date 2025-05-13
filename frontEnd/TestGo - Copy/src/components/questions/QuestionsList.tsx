import React, { useState } from "react";
import { Question } from "../../types/question";
import { QuestionCard } from "./QuestionCard";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";
import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface QuestionsListProps {
  questions: Question[];
  onAddQuestion: () => void;
  onEditQuestion: (question: Question) => void;
  onDeleteQuestion: (id: string) => void;
}

export function QuestionsList({ questions, onAddQuestion, onEditQuestion, onDeleteQuestion }: QuestionsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterModule, setFilterModule] = useState<string>("all");
  const { toast } = useToast();

  // Get unique modules for filter dropdown
  const modules = Array.from(new Set(questions.map(q => q.module)));

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = 
      question.enonce.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.explications.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || question.type === filterType;
    const matchesModule = filterModule === "all" || question.module === filterModule;
    
    return matchesSearch && matchesType && matchesModule;
  });

  const handleDelete = (id: string) => {
    onDeleteQuestion(id);
    toast({
      title: "Question supprimée",
      description: "La question a été supprimée avec succès",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h2 
          className="text-3xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Questions
        </motion.h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
         <Button 
      onClick={onAddQuestion} 
      className="bg-green-600 hover:bg-green-700 transition-colors duration-300"
    >
      <Plus className="h-4 w-4 mr-2" />
      Ajouter une question
    </Button>
        </motion.div>
      </div>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 transition-all duration-300 focus:ring-2 focus:ring-blue-300"
          />
        </div>
        
        <Select
          value={filterType}
          onValueChange={setFilterType}
        >
          <SelectTrigger className="w-[180px] transition-all duration-300 hover:border-blue-400">
            <SelectValue placeholder="Type de question" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="theorique">Théorique</SelectItem>
            <SelectItem value="pratique">Pratique</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={filterModule}
          onValueChange={setFilterModule}
        >
          <SelectTrigger className="w-[180px] transition-all duration-300 hover:border-blue-400">
            <SelectValue placeholder="Module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les modules</SelectItem>
            {modules.map(module => (
              <SelectItem key={module} value={module}>
                {module}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
      
      {filteredQuestions.length === 0 ? (
        <motion.div 
          className="text-center py-12 border rounded-lg bg-secondary/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground">Aucune question trouvée.</p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-auto scrollbar-style"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#22c55e #e5e7eb'
          }}
        >
          <style jsx global>{`
            /* Styles pour le scrollbar vert */
            .scrollbar-style::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            .scrollbar-style::-webkit-scrollbar-track {
              background: #e5e7eb;
              border-radius: 10px;
            }
            .scrollbar-style::-webkit-scrollbar-thumb {
              background: #22c55e;
              border-radius: 10px;
            }
            .scrollbar-style::-webkit-scrollbar-thumb:hover {
              background: #16a34a;
            }
          `}</style>
          {filteredQuestions.map(question => (
            <motion.div key={question.id} variants={itemVariants}>
              <QuestionCard
                question={question}
                onEdit={onEditQuestion}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}