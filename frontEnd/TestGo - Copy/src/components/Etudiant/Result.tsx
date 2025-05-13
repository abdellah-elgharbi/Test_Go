import React, { useState } from 'react';
import { ArrowLeft, Clock, Award, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TestResultsPage = () => {
  // Données d'exemple du résultat de test
  const testData = {
    title: "Les Bases de la Programmation Java",
    module: "Programmation Java",
    date: "5 Mai 2023 à 14h30",
    score: 80,
    totalScore: 100,
    timeSpent: "15:50",
    totalTime: "20:00",
    totalQuestions: 3,
    correct: 2,
    incorrect: 1,
    accuracy: 80,
    questions: [
      {
        id: 1,
        question: "Quelle est la manière correcte de déclarer une variable en Java ?",
        userAnswer: "int x = 10;",
        correctAnswer: "int x = 10;",
        timeSpent: "0:45",
        result: "correct"
      },
      {
        id: 2,
        question: "Parmi les suivantes, quelle est une signature valide pour la méthode main en Java ?",
        userAnswer: "public static void main(String[] args)",
        correctAnswer: "public static void main(String[] args)",
        timeSpent: "2:15",
        result: "correct"
      },
      {
        id: 3,
        question: "Quel mot-clé est utilisé pour créer un objet en Java ?",
        userAnswer: "create",
        correctAnswer: "new",
        timeSpent: "1:30",
        result: "incorrect"
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Résultats du Test</h1>
          <p className="text-gray-600">Consultez votre performance et vos réponses</p>
        </div>
      </div>

      {/* Carte de résumé du test */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{testData.title}</CardTitle>
          <div className="flex flex-wrap gap-3 mt-2">
            <Badge variant="secondary">{testData.module}</Badge>
            <Badge variant="outline">{testData.date}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Score et Temps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-600 mb-1">Score</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{testData.score} / {testData.totalScore} ({testData.score}%)</span>
              </div>
              <Progress value={testData.score} className="h-2.5 mt-2" />
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Temps Passé</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{testData.timeSpent} / {testData.totalTime}</span>
              </div>
              <Progress value={(parseFloat(testData.timeSpent.replace(':', '.')) / parseFloat(testData.totalTime.replace(':', '.')) * 100)} className="h-2.5 mt-2" />
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-gray-50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-gray-800">{testData.totalQuestions}</p>
                <p className="text-gray-600 text-sm">Questions Totales</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{testData.correct}</p>
                <p className="text-gray-600 text-sm">Correctes</p>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-red-600">{testData.incorrect}</p>
                <p className="text-gray-600 text-sm">Incorrectes</p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">{testData.accuracy}%</p>
                <p className="text-gray-600 text-sm">Précision</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Onglets */}
      <Tabs defaultValue="questions" className="mb-6">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        </TabsList>

        {/* Onglet Questions */}
        <TabsContent value="questions">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Votre Réponse</TableHead>
                    <TableHead>Réponse Correcte</TableHead>
                    <TableHead>Temps Passé</TableHead>
                    <TableHead>Résultat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testData.questions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="font-medium">{question.id}</TableCell>
                      <TableCell>{question.question}</TableCell>
                      <TableCell>
                        <code className="px-2 py-1 bg-gray-100 rounded text-sm">
                          {question.userAnswer}
                        </code>
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 bg-gray-100 rounded text-sm">
                          {question.correctAnswer}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock size={16} className="text-gray-400 mr-1" />
                          {question.timeSpent}
                        </div>
                      </TableCell>
                      <TableCell>
                        {question.result === 'correct' ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Correct</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Incorrect</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Analytiques */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="mr-2 text-blue-600" size={20} />
                  Analyse de Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Score Global</span>
                    <span className="text-sm font-medium text-gray-700">{testData.score}%</span>
                  </div>
                  <Progress value={testData.score} className="h-2.5" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Efficacité Temporelle</span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.floor((parseFloat(testData.timeSpent.replace(':', '.')) / parseFloat(testData.totalTime.replace(':', '.')) * 100))}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.floor((parseFloat(testData.timeSpent.replace(':', '.')) / parseFloat(testData.totalTime.replace(':', '.')) * 100))} 
                    className="h-2.5"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Précision</span>
                    <span className="text-sm font-medium text-gray-700">{testData.accuracy}%</span>
                  </div>
                  <Progress value={testData.accuracy} className="h-2.5" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Award className="mr-2 text-blue-600" size={20} />
                  Points Forts & Axes d'Amélioration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 flex items-center mb-2">
                    <CheckCircle size={16} className="mr-1" />
                    Vos Points Forts
                  </h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                    <li>Déclaration de variables en Java</li>
                    <li>Signatures de méthodes et syntaxe</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-700 flex items-center mb-2">
                    <XCircle size={16} className="mr-1" />
                    Axes d'Amélioration
                  </h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                    <li>Mots-clés et syntaxe de création d'objets</li>
                  </ul>
                </div>
                
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Prochaines Étapes Recommandées</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                    <li>Revoir la leçon sur la création d'objets en Java</li>
                    <li>Pratiquer avec plus d'exercices de programmation orientée objet</li>
                    <li>Passer le test "Objets et Classes Java"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Prochaines Étapes */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <Button variant="outline" className="flex items-center justify-center gap-2 py-6">
          Voir les Ressources d'Apprentissage
        </Button>
      </div>
    </div>
  );
};

export default TestResultsPage;