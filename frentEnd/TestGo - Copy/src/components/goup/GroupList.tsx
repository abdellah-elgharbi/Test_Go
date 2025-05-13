
import React, { useState } from "react";
import { TrainingGroup } from "@/types/models";
import GroupCard from "./GroupCard";
import GroupDialog from "./GroupDialog";
import { Button } from "@/components/ui/button";
import { Trash2 as TrashIcon } from "lucide-react";
import { toast } from "sonner";

interface GroupListProps {
  groups: TrainingGroup[];
  onGroupUpdate: (group: Partial<TrainingGroup>) => void;
  onGroupDelete?: (groupId: string) => void;
}

const GroupList = ({ groups, onGroupUpdate, onGroupDelete }: GroupListProps) => {
  const [selectedGroup, setSelectedGroup] = useState<TrainingGroup | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGroupClick = (group: TrainingGroup) => {
    setSelectedGroup(group);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedGroup(undefined);
  };

  const handleSave = (group: Partial<TrainingGroup>) => {
    onGroupUpdate(group);
  };

  const handleDelete = (groupId: string) => {
    if (onGroupDelete) {
      onGroupDelete(groupId);
      toast.success("Groupe supprimé avec succès!");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div key={group.id} className="relative">
            <GroupCard group={group} onClick={handleGroupClick} />
            {onGroupDelete && (
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(group.id);
                }}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <GroupDialog
        group={selectedGroup}
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={handleSave}
      />
    </>
  );
};

export default GroupList;
