import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ChoiceType {
  id: string;
  text: string;
}

export interface QuestionType {
  id: string;
  text: string;
  type: "mcq" | "coding";
  choices?: ChoiceType[];
  code?: string;
}

interface QuestionViewProps {
  question: QuestionType;
  totalQuestions: number;
  currentQuestionIndex: number;
  timeRemaining: number;
  totalTime: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  selectedAnswer?: string;
}

// Composant CircularProgress avec la couleur #162766
function CircularProgress({ value, size = 24, strokeWidth = 2 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Cercle de fond */}
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(229, 231, 235)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Cercle de progression */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5 }}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={value < 25 ? "rgb(239, 68, 68)" : value < 50 ? "rgb(245, 158, 11)" : "#162766"}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function QuestionView({
  question,
  totalQuestions,
  currentQuestionIndex,
  timeRemaining,
  totalTime,
  onAnswer,
  onNext,
  onPrevious,
  selectedAnswer
}: QuestionViewProps) {
  const [currentAnswer, setCurrentAnswer] = useState<string>(selectedAnswer || "");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (value: string) => {
    setCurrentAnswer(value);
    onAnswer(value);
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const timeProgress = (timeRemaining / totalTime) * 100;

  // Format remaining time
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Style constants
  const primaryColor = "#162766";
  
  // Animation when question changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [question.id]);

  return (
    <div className="space-y-8 px-6 py-4">
      {/* Barre de progression et timer circulaire */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center text-gray-600"
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">Question {currentQuestionIndex + 1}/{totalQuestions}</span>
          <motion.div className="w-28">
            <Progress value={progress} className="w-full" style={{ "--progress-color": primaryColor } as any} />
          </motion.div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={14} className="text-gray-500" />
          <CircularProgress value={timeProgress} size={20} strokeWidth={2} />
          <motion.span 
            key={`${minutes}-${seconds}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-medium"
          >
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </motion.span>
        </div>
      </motion.div>

      {/* Carte de la question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: isAnimating ? 50 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-lg border border-gray-200 rounded-xl">
            <motion.div
              initial={{ backgroundColor: "rgba(22, 39, 102, 0)" }}
              animate={{ backgroundColor: "rgba(22, 39, 102, 0.1)" }}
              transition={{ duration: 0.5 }}
            >
              <CardHeader className="p-4 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {question.text}
                    </motion.span>
                  </CardTitle>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Badge
                      variant="outline"
                      className="text-sm px-3 py-1"
                      style={{ borderColor: primaryColor, color: primaryColor }}
                    >
                      {question.type === 'mcq' ? 'QCM' : 'Code'}
                    </Badge>
                  </motion.div>
                </div>
              </CardHeader>
            </motion.div>

            <CardContent className="p-6">
              {/* Question à choix multiple */}
              {question.type === 'mcq' && question.choices && (
                <RadioGroup value={currentAnswer} onValueChange={handleAnswer} className="space-y-4">
                  {question.choices.map((choice, index) => (
                    <motion.div
                      key={choice.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <RadioGroupItem
                        value={choice.id}
                        id={choice.id}
                        style={{
                          borderColor: primaryColor,
                          "--radio-checked-color": primaryColor
                        } as any}
                      />
                      <Label htmlFor={choice.id} className="text-gray-700 font-medium">{choice.text}</Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              )}

              {/* Question de type code */}
              {question.type === 'coding' && (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 bg-gray-900 text-white rounded-lg shadow-md"
                  >
                    <pre className="text-sm font-mono">{question.code || "// Write your solution here"}</pre>
                  </motion.div>
                  <motion.textarea
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="w-full h-40 p-4 font-mono text-sm bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:outline-none"
                    style={{ "--focus-ring-color": primaryColor } as any}
                    placeholder="Écris ton code ici..."
                    value={currentAnswer}
                    onChange={(e) => handleAnswer(e.target.value)}
                  />
                </motion.div>
              )}
            </CardContent>

            {/* Boutons de navigation */}
            <CardFooter className="flex justify-between p-4 border-t bg-gray-100 rounded-b-xl">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  className="px-5 py-2"
                  onClick={onPrevious}
                  disabled={currentQuestionIndex === 0}
                  style={{ 
                    borderColor: primaryColor, 
                    color: primaryColor
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Précédent
                </Button>
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Button
                  onClick={onNext}
                  disabled={!currentAnswer}
                  className="text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
                  style={{ 
                    backgroundColor: primaryColor
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentQuestionIndex === totalQuestions - 1 ? "Terminer" : "Suivant"}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}