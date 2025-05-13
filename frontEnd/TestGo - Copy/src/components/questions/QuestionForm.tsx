import React, { useState } from "react";
import { Question, QuestionType, QuestionTheorique, QuestionPratique, TestUnitaire } from "../../types/question";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Save, X, Plus, FileText, Code, Clock, Award, Info, Star, RotateCcw } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Switch } from "../../components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Badge } from "../../components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { Separator } from "../../components/ui/separator";

interface QuestionFormProps {
  question?: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

// Liste des modules disponibles
const MODULES = [
  "Algorithmique",
  "Programmation",
  "Base de données",
  "Structures de données",
  "Web",
  "Systèmes d'exploitation",
  "Réseaux",
  "Intelligence artificielle",
  "Sécurité informatique"
];

// Palette de couleurs cohérente
const COLORS = {
  primary: "#10b981", // Vert émeraude principal
  secondary: "#059669", // Vert plus foncé pour hover
  light: "#d1fae5", // Vert très clair pour backgrounds subtils
  pratique: "#0d9488", // Vert-bleu pour les questions pratiques
  theorique: "#10b981", // Vert émeraude pour les questions théoriques
  border: "#e2e8f0", // Gris subtil pour les bordures
  danger: "#ef4444", // Rouge pour les actions de suppression
  background: "#f8fafc", // Fond très légèrement grisé
};

export function QuestionForm({ question, onSave, onCancel }: QuestionFormProps) {
  const [questionType, setQuestionType] = useState<QuestionType>(question?.type || 'theorique');
  
  // Initialisation des tests unitaires avec la structure correcte
  const initialTestsUnitaires: TestUnitaire[] = question?.type === 'pratique' ? 
    (question as QuestionPratique).testsUnitaires || [{ id: uuidv4(), description: "", input: "", expectedOutput: "", isHidden: false }] : 
    [{ id: uuidv4(), description: "", input: "", expectedOutput: "", isHidden: false }];

  const [formData, setFormData] = useState({
    id: question?.id || '',
    enonce: question?.enonce || '',
    module: question?.module || MODULES[0],
    dureeReponse: question?.dureeReponse || 10,
    niveau: question?.niveau || 1,
    explications: question?.explications || '',
    pointsMax: question?.pointsMax || 1,
    nbEssaisMax: question?.nbEssaisMax || 1,
    
    // Champs spécifiques à QuestionTheorique
    options: question?.type === 'theorique' ? (question as QuestionTheorique).options || [''] : [''],
    CorrectOption: question?.type === 'theorique' ? (question as QuestionTheorique).CorrectOption || 0 : 0,
    dateDebut: question?.type === 'theorique' ? (question as QuestionTheorique).dateDebut || new Date().toISOString() : new Date().toISOString(),
    
    // Champs spécifiques à QuestionPratique
    codeInitial: question?.type === 'pratique' ? (question as QuestionPratique).codeInitial || '' : '',
    testsUnitaires: initialTestsUnitaires,
    consigne: question?.type === 'pratique' ? (question as QuestionPratique).consigne || '' : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const baseQuestion = {
      id: formData.id || uuidv4(),
      enonce: formData.enonce,
      module: formData.module,
      dureeReponse: Number(formData.dureeReponse),
      niveau: Number(formData.niveau),
      type: questionType,
      explications: formData.explications,
      pointsMax: Number(formData.pointsMax),
      nbEssaisMax: Number(formData.nbEssaisMax),
    };
    
    if (questionType === 'theorique') {
      const filteredOptions = formData.options.filter(opt => opt.trim() !== '');
      const CorrectOption = Math.min(formData.CorrectOption, filteredOptions.length - 1);
      
      const theoriqueQuestion: QuestionTheorique = {
        ...baseQuestion,
        type: 'theorique',
        options: filteredOptions,
        CorrectOption,
        dateDebut: formData.dateDebut,
        verifierReponseQCM: (reponses: string[]) => {
          return reponses.includes(filteredOptions[CorrectOption]);
        }
      };
      onSave(theoriqueQuestion);
    } else {
      const pratiqueQuestion: QuestionPratique = {
        ...baseQuestion,
        type: 'pratique',
        codeInitial: formData.codeInitial,
        testsUnitaires: formData.testsUnitaires.filter(test => test.description.trim() !== ''),
        consigne: formData.consigne,
        evaluerCode: (codeReponse: string) => {
          // Logique d'évaluation simple à implémenter
          return true;
        },
        executerTestsUnitaires: (codeReponse: string) => {
          // Retourne un tableau de résultats conforme à l'interface
          return formData.testsUnitaires.map(test => ({
            testId: test.id,
            passed: false, // À implémenter avec l'exécution réelle des tests
            input: test.input,
            expectedOutput: test.expectedOutput,
            actualOutput: undefined,
            error: undefined
          }));
        }
      };
      onSave(pratiqueQuestion);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    handleChange('options', newOptions);
  };

  const addOption = () => {
    handleChange('options', [...formData.options, '']);
  };

  const removeOption = (index: number) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    // Ajuster l'index de la bonne réponse si nécessaire
    let newCorrectOption = formData.CorrectOption;
    if (index === formData.CorrectOption) {
      newCorrectOption = 0; // Réinitialiser à la première option
    } else if (index < formData.CorrectOption) {
      newCorrectOption = formData.CorrectOption - 1; // Décrémenter
    }
    
    handleChange('options', newOptions);
    handleChange('CorrectOption', newCorrectOption);
  };

  // Gestion des tests unitaires
  const handleTestChange = (index: number, field: keyof TestUnitaire, value: any) => {
    const newTests = [...formData.testsUnitaires];
    newTests[index] = {
      ...newTests[index],
      [field]: value
    };
    handleChange('testsUnitaires', newTests);
  };

  const addTest = () => {
    const newTest: TestUnitaire = {
      id: uuidv4(),
      description: "",
      input: "",
      expectedOutput: "",
      isHidden: false
    };
    handleChange('testsUnitaires', [...formData.testsUnitaires, newTest]);
  };

  const removeTest = (index: number) => {
    const newTests = formData.testsUnitaires.filter((_, i) => i !== index);
    handleChange('testsUnitaires', newTests);
  };

  // Pour obtenir l'icône du niveau
  const getNiveauStars = (niveau: number) => {
    const stars = [];
    for (let i = 0; i < niveau; i++) {
      stars.push(<Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />);
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border border-gray-100 shadow-sm bg-white">
        <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Badge 
              className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors" 
              variant="outline"
            >
              {questionType === 'theorique' ? 'QCM' : 'Codage'}
            </Badge>
            <CardTitle className="text-xl font-semibold text-gray-800">
              {question ? 'Modifier une question' : 'Ajouter une question'}
            </CardTitle>
          </div>
          <CardDescription>
            Créez une nouvelle question {questionType === 'theorique' ? 'théorique' : 'pratique'} pour vos étudiants
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="module" className="font-medium">Module</Label>
                </div>
                <Select
                  value={formData.module}
                  onValueChange={(value) => handleChange('module', value)}
                >
                  <SelectTrigger id="module" className="border-gray-300 focus:ring-green-500 focus:border-green-500 bg-white">
                    <SelectValue placeholder="Sélectionner un module" />
                  </SelectTrigger>
                  <SelectContent>
                    {MODULES.map((module) => (
                      <SelectItem key={module} value={module}>
                        {module}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="enonce" className="font-medium">Énoncé de la question</Label>
              <Textarea
                id="enonce"
                value={formData.enonce}
                onChange={(e) => handleChange('enonce', e.target.value)}
                rows={3}
                required
                className="border-gray-300 focus:ring-green-500 focus:border-green-500 bg-white resize-y"
                placeholder="Saisissez l'énoncé de votre question..."
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="dureeReponse" className="font-medium">Durée (min)</Label>
                </div>
                <Input
                  id="dureeReponse"
                  type="number"
                  min="1"
                  value={formData.dureeReponse}
                  onChange={(e) => handleChange('dureeReponse', parseInt(e.target.value))}
                  required
                  className="border-gray-300 focus:ring-green-500 focus:border-green-500 bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="niveau" className="font-medium">Niveau (1-5)</Label>
                </div>
                <div className="relative">
                  <Input
                    id="niveau"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.niveau}
                    onChange={(e) => handleChange('niveau', parseInt(e.target.value))}
                    required
                    className="border-gray-300 focus:ring-green-500 focus:border-green-500 bg-white pr-12"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    {getNiveauStars(formData.niveau)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="pointsMax" className="font-medium">Points</Label>
                </div>
                <Input
                  id="pointsMax"
                  type="number"
                  min="1"
                  value={formData.pointsMax}
                  onChange={(e) => handleChange('pointsMax', parseInt(e.target.value))}
                  required
                  className="border-gray-300 focus:ring-green-500 focus:border-green-500 bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="nbEssaisMax" className="font-medium">Essais max</Label>
                </div>
                <Input
                  id="nbEssaisMax"
                  type="number"
                  min="1"
                  value={formData.nbEssaisMax}
                  onChange={(e) => handleChange('nbEssaisMax', parseInt(e.target.value))}
                  required
                  className="border-gray-300 focus:ring-green-500 focus:border-green-500 bg-white"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-gray-500" />
                <Label htmlFor="explications" className="font-medium">Explications/Feedback</Label>
              </div>
              <Textarea
                id="explications"
                value={formData.explications}
                onChange={(e) => handleChange('explications', e.target.value)}
                rows={2}
                className="border-gray-300 focus:ring-green-500 focus:border-green-500 bg-white resize-y"
                placeholder="Explications qui seront montrées après la réponse..."
              />
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <Tabs
            value={questionType}
            onValueChange={(value) => setQuestionType(value as QuestionType)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger 
                value="theorique" 
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800 data-[state=active]:shadow-sm"
              >
                <FileText className="h-4 w-4 mr-2" />
                Théorique (QCM)
              </TabsTrigger>
              <TabsTrigger 
                value="pratique"
                className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800 data-[state=active]:shadow-sm"
              >
                <Code className="h-4 w-4 mr-2" />
                Pratique (Codage)
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="theorique" className="space-y-4 pt-2">
              <div className="space-y-6 bg-green-50 p-6 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Label className="text-lg font-semibold text-green-800">Options (réponses)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-green-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-60">Sélectionnez le bouton radio à côté de la réponse correcte</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <RadioGroup 
                  value={formData.CorrectOption.toString()} 
                  onValueChange={(value) => handleChange('CorrectOption', parseInt(value))}
                  className="space-y-4"
                >
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-md shadow-sm border border-green-100">
                      <RadioGroupItem 
                        value={index.toString()} 
                        id={`option-${index}`} 
                        className="mt-0 h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <div className="flex-1 flex items-center space-x-2">
                        <Input
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="flex-1 border-gray-300 focus:ring-green-500 focus:border-green-500"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeOption(index)}
                          disabled={formData.options.length <= 1}
                          className="h-8 w-8 rounded-md border-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                
                <Button
                  type="button"
                  onClick={addOption}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une option
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="pratique" className="space-y-6 pt-2">
              <div className="space-y-4 bg-teal-50 p-6 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="consigne" className="text-lg font-semibold text-teal-800">Consigne de programmation</Label>
                  <Textarea
                    id="consigne"
                    value={formData.consigne}
                    onChange={(e) => handleChange('consigne', e.target.value)}
                    rows={3}
                    className="border-gray-300 focus:ring-teal-500 focus:border-teal-500 bg-white resize-y"
                    placeholder="Instructions spécifiques pour la programmation..."
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="codeInitial" className="text-lg font-semibold text-teal-800">Code initial</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-teal-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-60">Ce code sera pré-rempli dans l'éditeur de l'étudiant</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="bg-gray-900 p-2 rounded-md">
                    <Textarea
                      id="codeInitial"
                      value={formData.codeInitial}
                      onChange={(e) => handleChange('codeInitial', e.target.value)}
                      className="font-mono text-sm bg-gray-900 text-gray-100 border-gray-700 focus:ring-teal-500 focus:border-teal-500 resize-y"
                      rows={5}
                      placeholder="// Code qui sera disponible au départ pour l'étudiant"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label className="text-lg font-semibold text-gray-800">Tests unitaires</Label>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      {formData.testsUnitaires.length} tests
                    </Badge>
                  </div>
                  <Button
                    type="button"
                    className="bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                    onClick={addTest}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un test
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500 italic mb-4">
                  Définissez les tests avec des entrées et sorties attendues pour évaluer le code des étudiants
                </div>
                
                <Accordion type="multiple" className="w-full">
                  {formData.testsUnitaires.map((test, index) => (
                    <AccordionItem 
                      value={`test-${index}`} 
                      key={test.id} 
                      className="border rounded-md mb-4 shadow-sm overflow-hidden bg-white"
                    >
                      <div className="flex items-center justify-between px-4 bg-gradient-to-r from-gray-50 to-white">
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center">
                            {test.isHidden && (
                              <Badge variant="outline" className="mr-2 bg-gray-100 text-gray-600 border-gray-200">
                                Caché
                              </Badge>
                            )}
                            <span className="font-medium text-gray-800">
                              {test.description ? test.description : `Test ${index + 1}`}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTest(index)}
                          disabled={formData.testsUnitaires.length <= 1}
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <AccordionContent className="space-y-4 pt-2 px-4 pb-4">
                        <div className="space-y-2">
                          <Label htmlFor={`test-description-${index}`} className="font-medium">Description</Label>
                          <Input
                            id={`test-description-${index}`}
                            value={test.description}
                            onChange={(e) => handleTestChange(index, 'description', e.target.value)}
                            placeholder="Description du test"
                            className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`test-input-${index}`} className="font-medium">Entrée (input)</Label>
                            <Textarea
                              id={`test-input-${index}`}
                              value={typeof test.input === 'string' ? test.input : JSON.stringify(test.input, null, 2)}
                              onChange={(e) => {
                                try {
                                  // Tente de parser comme JSON si possible
                                  const value = e.target.value.trim();
                                  const parsedValue = value.startsWith('[') || value.startsWith('{') 
                                    ? JSON.parse(value)
                                    : e.target.value;
                                  handleTestChange(index, 'input', parsedValue);
                                } catch (err) {
                                  // Si échec de parsing, enregistre en tant que string
                                  handleTestChange(index, 'input', e.target.value);
                                }
                              }}
                              placeholder="Valeur d'entrée (JSON)"
                              className="font-mono text-sm bg-gray-50 border-gray-300 focus:ring-teal-500 focus:border-teal-500 resize-y"
                              rows={2}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`test-output-${index}`} className="font-medium">Sortie attendue (output)</Label>
                            <Textarea
                              id={`test-output-${index}`}
                              value={typeof test.expectedOutput === 'string' ? test.expectedOutput : JSON.stringify(test.expectedOutput, null, 2)}
                              onChange={(e) => {
                                try {
                                  // Tente de parser comme JSON si possible
                                  const value = e.target.value.trim();
                                  const parsedValue = value.startsWith('[') || value.startsWith('{') 
                                    ? JSON.parse(value)
                                    : e.target.value;
                                  handleTestChange(index, 'expectedOutput', parsedValue);
                                } catch (err) {
                                  // Si échec de parsing, enregistre en tant que string
                                  handleTestChange(index, 'expectedOutput', e.target.value);
                                }
                              }}
                              placeholder="Valeur de sortie attendue (JSON)"
                              className="font-mono text-sm bg-gray-50 border-gray-300 focus:ring-teal-500 focus:border-teal-500 resize-y"
                              rows={2}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                          <Switch
                            id={`test-hidden-${index}`}
                            checked={!!test.isHidden}
                            onCheckedChange={(checked) => handleTestChange(index, 'isHidden', checked)}
                            className="data-[state=checked]:bg-teal-600"
                          />
                          <Label htmlFor={`test-hidden-${index}`} className="font-medium">
                            Test caché 
                            <span className="text-sm text-gray-500 ml-2">(invisible pour l'étudiant)</span>
                          </Label>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between space-x-2 py-4 px-6 bg-gray-50 border-t rounded-b-lg">
          <Button 
            variant="outline" 
            type="button" 
            onClick={onCancel}
            className="border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 mr-2" />
            Annuler
          </Button>
          <Button 
            type="submit"
            style={{ 
              backgroundColor: questionType === 'theorique' ? COLORS.theorique : COLORS.pratique,
              transition: 'all 0.3s ease'
            }}
            className="hover:opacity-90 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Enregistrer la question
          </Button>
        </CardFooter>
      </Card>
    </form>
  );}