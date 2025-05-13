import Questions from "../components/questions/Questions"
import { Question, QuestionTheorique, QuestionPratique, TestUnitaire } from "../types/question";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import Layout from "@/components/layout/LayoutTeacher";

const initialQuestions: Question[] = [
    {
      id: "1",
      enonce: "Quelle est la différence entre let et var en JavaScript?",
      module: "JavaScript Fondamentaux",
      dureeReponse: 5,
      niveau: 2,
      type: "theorique",
      explications: "let a une portée de bloc, tandis que var a une portée de fonction.",
      pointsMax: 2,
      nbEssaisMax: 1,
      options: ["let est block-scoped, var est function-scoped", "let ne peut pas être redéclaré, var peut l'être", "let a été introduit avec ES6, var existe depuis plus longtemps", "Toutes les réponses sont correctes"],
      dateDebut: new Date().toISOString(),
      CorrectOption: 3, // Index de la réponse correcte (la dernière option)
      verifierReponseQCM: (reponses: string[]) => {
        // Vérifie si la réponse sélectionnée est "Toutes les réponses sont correctes"
        return reponses.includes("Toutes les réponses sont correctes");
      },
    } as QuestionTheorique,
    {
      id: "2",
      enonce: "Qu'est-ce que le DOM en développement web?",
      module: "HTML & DOM",
      dureeReponse: 3,
      niveau: 1,
      type: "theorique",
      explications: "Le DOM (Document Object Model) est une interface de programmation pour les documents HTML et XML.",
      pointsMax: 1,
      nbEssaisMax: 1,
      options: ["Document Object Model", "Data Object Management", "Document Oriented Model", "Data Oriented Markup"],
      dateDebut: new Date().toISOString(),
      CorrectOption: 0, // Index de la réponse correcte (la première option)
      verifierReponseQCM: (reponses: string[]) => {
        return reponses.includes("Document Object Model");
      },
    } as QuestionTheorique,
    {
      id: "3",
      enonce: "Écrivez une fonction qui inverse une chaîne de caractères",
      module: "Algorithmes",
      dureeReponse: 10,
      niveau: 2,
      type: "pratique",
      explications: "On peut inverser une chaîne en utilisant split, reverse et join.",
      pointsMax: 3,
      nbEssaisMax: 2,
      codeInitial: "function reverseString(str) {\n  // Écrivez votre code ici\n}",
      testsUnitaires: [
        {
          id: "test1",
          description: "Inverser une chaîne non vide",
          input: "hello",
          expectedOutput: "olleh",
          isHidden: false
        },
        {
          id: "test2",
          description: "Inverser une chaîne vide",
          input: "",
          expectedOutput: "",
          isHidden: false
        }
      ],
      consigne: "Écrivez une fonction qui prend une chaîne en entrée et retourne cette chaîne inversée.",
      evaluerCode: (codeReponse: string) => {
        try {
          // Simple validation - vérifie que le code contient certains patterns
          return codeReponse.includes("reverse") || 
                 (codeReponse.includes("for") && codeReponse.includes("return"));
        } catch (e) {
          return false;
        }
      },
      executerTestsUnitaires: (codeReponse: string) => {
        try {
          // Simulation d'exécution des tests
          return [
            { 
              testId: "test1", 
              passed: true, 
              input: "hello", 
              expectedOutput: "olleh",
              actualOutput: "olleh"
            },
            { 
              testId: "test2", 
              passed: true, 
              input: "", 
              expectedOutput: "",
              actualOutput: ""
            }
          ];
        } catch (e) {
          return [
            { 
              testId: "test1", 
              passed: false, 
              input: "hello", 
              expectedOutput: "olleh",
              error: e instanceof Error ? e.message : "Erreur inconnue"
            },
            { 
              testId: "test2", 
              passed: false, 
              input: "", 
              expectedOutput: "",
              error: e instanceof Error ? e.message : "Erreur inconnue"
            }
          ];
        }
      },
    } as QuestionPratique,
    {
      id: "4",
      enonce: "Quelle est la complexité temporelle de l'algorithme de tri rapide (QuickSort) dans le cas moyen?",
      module: "Algorithmes",
      dureeReponse: 3,
      niveau: 3,
      type: "theorique",
      explications: "La complexité temporelle moyenne de QuickSort est O(n log n).",
      pointsMax: 2,
      nbEssaisMax: 1,
      options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
      dateDebut: new Date().toISOString(),
      CorrectOption: 0, // Index de la réponse correcte (la première option)
      verifierReponseQCM: (reponses: string[]) => {
        return reponses.includes("O(n log n)");
      },
    } as QuestionTheorique,
    {
      id: "5",
      enonce: "Implémentez une fonction pour calculer la factorielle d'un nombre",
      module: "Programmation",
      dureeReponse: 8,
      niveau: 2,
      type: "pratique",
      explications: "La factorielle peut être calculée de manière récursive ou itérative.",
      pointsMax: 3,
      nbEssaisMax: 3,
      codeInitial: "function factorial(n) {\n  // Écrivez votre code ici\n}",
      testsUnitaires: [
        {
          id: "test1",
          description: "Factorielle de 5",
          input: 5,
          expectedOutput: 120,
          isHidden: false
        },
        {
          id: "test2",
          description: "Factorielle de 0",
          input: 0,
          expectedOutput: 1,
          isHidden: false
        }
      ],
      consigne: "Écrivez une fonction qui calcule la factorielle d'un nombre entier positif.",
      evaluerCode: (codeReponse: string) => {
        try {
          // Simple validation
          return codeReponse.includes("factorial") && 
                (codeReponse.includes("return n * factorial") || codeReponse.includes("for"));
        } catch (e) {
          return false;
        }
      },
      executerTestsUnitaires: (codeReponse: string) => {
        try {
          // Simulation des tests d'exécution
          return [
            { 
              testId: "test1", 
              passed: true, 
              input: 5, 
              expectedOutput: 120,
              actualOutput: 120
            },
            { 
              testId: "test2", 
              passed: true, 
              input: 0, 
              expectedOutput: 1,
              actualOutput: 1
            }
          ];
        } catch (e) {
          return [
            { 
              testId: "test1", 
              passed: false, 
              input: 5, 
              expectedOutput: 120,
              error: e instanceof Error ? e.message : "Erreur inconnue"
            },
            { 
              testId: "test2", 
              passed: false, 
              input: 0, 
              expectedOutput: 1,
              error: e instanceof Error ? e.message : "Erreur inconnue"
            }
          ];
        }
      },
    } as QuestionPratique,
];

const QuestionPage = () => {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [formOpen, setFormOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | undefined>(undefined);
    const { toast } = useToast();

    const handleAddQuestion = (question: Question) => {
        setQuestions(prev => [...prev, question]);
    };

    const handleUpdateQuestion = (question: Question) => {
        setQuestions(prev => prev.map(q => q.id === question.id ? question : q));
    };

    const handleDeleteQuestion = (id: string) => {
        setQuestions(prev => prev.filter(q => q.id !== id));
    };

    const handleEditQuestion = (question: Question) => {
        setEditingQuestion(question);
        setFormOpen(true);
    };

    const handleSaveQuestion = (question: Question) => {
        if (editingQuestion) {
            handleUpdateQuestion(question);
        } else {
            handleAddQuestion(question);
        }
        setFormOpen(false);
        toast({
            title: editingQuestion ? "Question mise à jour" : "Question ajoutée",
            description: editingQuestion 
                ? "La question a été mise à jour avec succès" 
                : "La question a été ajoutée avec succès",
        });
    };

    return (
        <Layout>
            <Questions 
                questions={questions} 
                onAddQuestion={handleAddQuestion} 
                onUpdateQuestion={handleUpdateQuestion} 
                onDeleteQuestion={handleDeleteQuestion}
               
            />
        </Layout>
    );
};

export default QuestionPage;