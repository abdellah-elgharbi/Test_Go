import React, { useState } from "react";
import { QuestionsList } from "./QuestionsList";
import { QuestionForm } from "./QuestionForm";
import { Question } from "../../types/question";
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent } from "../ui/dialog";

interface QuestionsProps {
  questions: Question[];
  onAddQuestion: (question: Question) => void;
  onUpdateQuestion: (question: Question) => void;
  onDeleteQuestion: (id: string) => void;
}

export default function Questions({ questions, onAddQuestion, onUpdateQuestion, onDeleteQuestion }: QuestionsProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>(undefined);
  const { toast } = useToast();

  const handleAddClick = () => {
    setEditingQuestion(undefined);
    setFormOpen(true);
  };

  const handleEditClick = (question: Question) => {
    setEditingQuestion(question);
    setFormOpen(true);
  };

  const handleSave = (question: Question) => {
    if (editingQuestion) {
      onUpdateQuestion(question);
      toast({
        title: "Question mise à jour",
        description: "La question a été mise à jour avec succès",
      });
    } else {
      onAddQuestion(question);
      toast({
        title: "Question ajoutée",
        description: "La question a été ajoutée avec succès",
      });
    }
    setFormOpen(false);
  };

  return (
    <>
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
      
      <QuestionsList
        questions={questions}
        onAddQuestion={handleAddClick}
        onEditQuestion={handleEditClick}
        onDeleteQuestion={onDeleteQuestion}
      />
      
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent 
          className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto scrollbar-style"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#22c55e #e5e7eb'
          }}
        >
          <QuestionForm
            question={editingQuestion}
            onSave={handleSave}
            onCancel={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}