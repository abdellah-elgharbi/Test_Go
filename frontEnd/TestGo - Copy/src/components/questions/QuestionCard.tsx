import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Question } from "../../types/question";
import { Button } from "../../components/ui/button";
import { FileText, BookOpen, Edit, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";

interface QuestionCardProps {
  question: Question;
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
}

export function QuestionCard({ question, onEdit, onDelete }: QuestionCardProps) {
  const isTheoretical = question.type === 'theorique';
  
  // Définition des couleurs - modifié vers le vert
  const mainColor = "#166626"; // Vert foncé au lieu de bleu foncé
  const secondaryColor = "#4c9962"; // Vert plus clair pour le type pratique
  
  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in border-l-4 group relative overflow-hidden"
          style={{ borderLeftColor: isTheoretical ? mainColor : secondaryColor }}>
      {/* Animation d'arrière-plan au survol */}
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-500"
           style={{ 
             background: `linear-gradient(135deg, ${isTheoretical ? mainColor : secondaryColor}22 0%, transparent 70%)` 
           }}></div>
           
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg text-foreground/90 line-clamp-2 group-hover:text-foreground transition-colors duration-200">
            {question.enonce}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  className="whitespace-nowrap transition-all duration-300 transform group-hover:scale-105" 
                  style={{ 
                    backgroundColor: isTheoretical ? mainColor : secondaryColor,
                    color: 'white'
                  }}
                >
                  {isTheoretical ? (
                    <BookOpen className="h-3 w-3 mr-1 animate-pulse" />
                  ) : (
                    <FileText className="h-3 w-3 mr-1 animate-pulse" />
                  )}
                  {isTheoretical ? 'Théorique' : 'Pratique'}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isTheoretical ? 'Question théorique' : 'Exercice pratique'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="flex flex-wrap gap-2 mt-1">
          <span className="font-medium">{question.module}</span>
          <span className="text-muted-foreground">•</span>
          <span>Niveau: {question.niveau}</span>
          <span className="text-muted-foreground">•</span>
          <span className="font-medium">{question.pointsMax} pts</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="text-sm text-muted-foreground mb-3 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
          {question.explications}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-background/50 transition-all duration-300 hover:border-opacity-100"
                 style={{ borderColor: `${mainColor}44` }}>
            {question.dureeReponse} min
          </Badge>
          <Badge variant="outline" className="bg-background/50 transition-all duration-300 hover:border-opacity-100"
                 style={{ borderColor: `${mainColor}44` }}>
            {question.nbEssaisMax} essai{question.nbEssaisMax > 1 ? 's' : ''}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-2 pt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 text-muted-foreground hover:text-foreground relative overflow-hidden transition-all duration-300"
          onClick={() => onEdit(question)}>
          {/* Animation de survol */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r opacity-0 hover:opacity-10 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${mainColor}33, transparent)` }}></span>
          <Edit className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:rotate-12" />
          Modifier
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive relative overflow-hidden transition-all duration-300"
          onClick={() => onDelete(question.id)}>
          {/* Animation de survol */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r opacity-0 hover:opacity-10 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, #ff000033, transparent)` }}></span>
          <Trash2 className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:scale-110" />
          Supprimer
        </Button>
      </CardFooter>
      
      {/* Animation subtile d'accent en bas de la carte */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-700 ease-out"
           style={{ backgroundColor: isTheoretical ? mainColor : secondaryColor }}></div>
    </Card>
  );
}