import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import GroupList from "@/components/goup/GroupList";
import { TrainingGroup } from "@/types/models";
import { trainingGroups as initialGroups } from "@/data/mockData";
import { toast } from "sonner";
import { Search, PlusCircle, Filter, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import GroupDialog from "@/components/goup/GroupDialog";
import { v4 as uuidv4 } from 'uuid';
import { motion } from "framer-motion";

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

const Groups = () => {
  const [groups, setGroups] = useState<TrainingGroup[]>(initialGroups);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleUpdateGroup = (updatedGroup: Partial<TrainingGroup>) => {
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id
        ? { ...group, ...updatedGroup }
        : group
    );
    setGroups(updatedGroups);
    toast.success("Groupe mis à jour avec succès!", {
      className: "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700"
    });
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
    toast.success("Groupe supprimé avec succès!", {
      className: "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700"
    });
  };

  const handleAddGroup = (newGroup: Partial<TrainingGroup>) => {
    const groupWithId = {
      ...newGroup,
      id: uuidv4()
    } as TrainingGroup;
    
    setGroups([...groups, groupWithId]);
    toast.success("Groupe ajouté avec succès!", {
      className: "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700"
    });
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="container py-8 px-4 max-w-7xl mx-auto bg-gradient-to-br from-emerald-50 to-teal-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex justify-between items-center mb-8"
        variants={itemVariants}
      >
        <div className="flex items-center">
          <Leaf className="h-8 w-8 text-emerald-600 mr-3" />
          <h1 className="text-3xl font-bold text-emerald-800">
            Groupes de formation
          </h1>
        </div>
        <div className="hidden md:block h-2 w-32 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"></div>
      </motion.div>
      
      <motion.div 
        className="flex items-center mb-8 gap-4 flex-col md:flex-row"
        variants={itemVariants}
      >
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500" />
          <Input
            type="search"
            placeholder="Rechercher un groupe"
            className="pl-10 w-full border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-white/70 backdrop-blur-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full md:w-auto whitespace-nowrap bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-md transition-all duration-300"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un groupe
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg border border-emerald-200 p-6"
      >
        <GroupList
          groups={filteredGroups}
          onGroupUpdate={handleUpdateGroup}
          onGroupDelete={handleDeleteGroup}
        />
      </motion.div>

      <GroupDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddGroup}
        buttonColorClass="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
      />
    </motion.div>
  );
};

export default Groups;