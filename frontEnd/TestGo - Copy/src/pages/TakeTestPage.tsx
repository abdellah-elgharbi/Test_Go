import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionView from "../components/tests/QuestionView";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { useToast } from "../hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { Camera } from "lucide-react";

export default function TakeTestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const getDat = () => {};
  const confirm = () => {};
  
  // Référence pour surveiller l'état du plein écran
  const pageRef = useRef<HTMLDivElement>(null);
  // Référence pour la vidéo
  const videoRef = useRef<HTMLVideoElement>(null);
  // Référence pour le canvas (pour capturer les images)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Référence pour l'intervalle de capture
  const captureIntervalRef = useRef<number | null>(null);
  
  // Mock test data
  const testData = {
    id: testId || "1",
    title: "Java Programming Basics",
    module: "Java Programming",
    duration: 1200, // 20 minutes in seconds
    questions: [
      {
        id: "q1",
        text: "What is the correct way to declare a variable in Java?",
        type: "mcq",
        choices: [
          { id: "a", text: "var x = 10;" },
          { id: "b", text: "int x = 10;" },
          { id: "c", text: "x = 10;" },
          { id: "d", text: "variable x = 10;" },
        ],
      },
      {
        id: "q2",
        text: "Which of the following is NOT a primitive data type in Java?",
        type: "mcq",
        choices: [
          { id: "a", text: "int" },
          { id: "b", text: "float" },
          { id: "c", text: "String" },
          { id: "d", text: "boolean" },
        ],
      },
      {
        id: "q3",
        text: "Write a Java method that returns the sum of two integers.",
        type: "coding",
        code: "public int sum(int a, int b) {\n  // Write your code here\n}",
      },
    ],
  };
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState(testData.duration);
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [isResultsReady, setIsResultsReady] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraPermissionDialogOpen, setIsCameraPermissionDialogOpen] = useState(true);
  
  // Fonction pour demander l'accès à la caméra et commencer l'examen
  const startExamWithCamera = async () => {
    try {
      await initializeWebcam();
      setIsCameraPermissionDialogOpen(false);
      enterFullscreen();
    } catch (error) {
      console.error("Impossible de démarrer l'examen avec la caméra:", error);
      toast({
        title: "Erreur d'accès à la caméra",
        description: "L'accès à la caméra est requis pour cet examen. Veuillez autoriser l'accès et réessayer.",
        variant: "destructive"
      });
    }
  };
  
  // Fonction pour entrer en mode plein écran
  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
          console.log("Plein écran activé");
        })
        .catch(err => {
          console.error("Erreur d'activation du plein écran:", err);
          toast({
            title: "Erreur de plein écran",
            description: "Impossible d'activer le mode plein écran. Veuillez continuer l'examen en mode normal.",
            variant: "destructive"
          });
        });
    } else {
      console.warn("Le navigateur ne supporte pas l'API Fullscreen");
    }
  };
  
  // Fonction pour quitter le mode plein écran - uniquement appelée lorsque c'est permis
  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
          console.log("Sortie du plein écran réussie");
        })
        .catch(err => console.error("Erreur lors de la sortie du mode plein écran:", err));
    }
  };
  
  // Fonction pour initialiser la webcam
  const initializeWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"  // Utiliser la caméra frontale pour voir l'étudiant
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();  // S'assurer que la vidéo commence à jouer
        setIsCameraActive(true);
        
        toast({
          title: "Caméra activée",
          description: "La surveillance par caméra est maintenant active pour cet examen.",
        });
        
        return true;
      }
      return false;
    } catch (err) {
      console.error("Erreur d'accès à la webcam:", err);
      toast({
        title: "Erreur d'accès à la caméra",
        description: "Impossible d'accéder à votre caméra. Veuillez vérifier les permissions du navigateur.",
        variant: "destructive"
      });
      throw err;
    }
  };
  
  // Fonction pour capturer une image depuis la webcam
  const captureImage = () => {
    if (videoRef.current && canvasRef.current && isCameraActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.videoWidth && video.videoHeight) {
        // Définir les dimensions du canvas pour correspondre à la vidéo
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Dessiner l'image de la vidéo sur le canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        try {
          // Convertir l'image en base64
          const imageData = canvas.toDataURL('image/jpeg', 0.7); // Qualité 0.7 pour réduire la taille
          
          // Envoyer l'image à l'API
          sendImageToAPI(imageData);
        } catch (err) {
          console.error("Erreur lors de la capture de l'image:", err);
        }
      } else {
        console.warn("La vidéo n'est pas encore prête ou le contexte du canvas n'est pas disponible");
      }
    }
  };
  
  // Fonction pour envoyer l'image à l'API
  const sendImageToAPI = async (imageData: string) => {
    try {
      // URL de l'API de traitement (correction du double slash)
      const apiUrl = 'http://127.0.0.1:5000/analyse';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testId: testId,
          studentId: "1", // À remplacer par l'ID réel de l'étudiant
          timestamp: new Date().toISOString(),
          image: imageData
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log("Image envoyée avec succès:", result);
        
        // Si la détection de fraude est positive
        if (result && result.fraudDetected) {
          console.log("Alerte: comportement suspect détecté", result.details);
          toast({
            title: "Comportement suspect détecté",
            description: `Le système de surveillance a détecté: ${result.details}`,
            variant: "destructive"
          });
        }
      } else {
        console.error("Erreur lors de l'envoi de l'image:", await response.text());
      }
    } catch (error) {
      console.error("Erreur de communication avec l'API:", error);
    }
  };
  
  // Démarrer la capture périodique dès que la caméra est active
  useEffect(() => {
    if (isCameraActive && videoRef.current) {
      // Démarrer la capture après un court délai pour s'assurer que la vidéo est chargée
      const startCaptureTimeout = setTimeout(() => {
        if (captureIntervalRef.current) {
          clearInterval(captureIntervalRef.current);
        }
        
        // Capture immédiate dès que la caméra est prête
        captureImage();
        
        // Puis démarrer la capture périodique toutes les 5 secondes
        captureIntervalRef.current = window.setInterval(() => {
          captureImage();
        }, 5000); // 5000ms = 5s pour réduire la charge réseau
        
        console.log("Capture d'images démarrée avec succès");
      }, 1000); // Attendre 1 seconde pour s'assurer que la vidéo est prête
      
      return () => {
        clearTimeout(startCaptureTimeout);
        if (captureIntervalRef.current) {
          clearInterval(captureIntervalRef.current);
        }
      };
    }
  }, [isCameraActive]);
  
  // Gestionnaire d'événement pour empêcher la sortie du mode plein écran
  const handleFullscreenChange = () => {
    // Si on n'est plus en plein écran mais qu'on devrait l'être
    if (!document.fullscreenElement && isFullscreen) {
      if (isTestSubmitted && isResultsReady) {
        // Si le test est soumis et les résultats sont prêts, on peut quitter le plein écran
        setIsFullscreen(false);
        console.log("Sortie du plein écran autorisée");
      } else {
        console.log("Tentative de sortie du plein écran détectée, affichage du dialogue");
        // Sinon on affiche l'alerte
        setIsExitDialogOpen(true);
      }
    }
  };
  
  // Activer le plein écran au chargement de la page
  useEffect(() => {
    // Ajouter des écouteurs d'événements pour détecter la sortie du mode plein écran
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    // Empêcher l'utilisation des touches de raccourci pour quitter
    const handleKeyDown = (e: KeyboardEvent) => {
      // Empêcher les combinaisons comme Alt+Tab, F11, Esc, etc.
      if ((e.key === "F11" || e.key === "Escape" || 
          (e.altKey && e.key === "Tab") || 
          (e.altKey && e.key === "F4"))) {
        e.preventDefault();
        
        toast({
          title: "Action restreinte",
          description: "Cette action est restreinte pendant l'examen.",
          variant: "destructive"
        });
        
        return false;
      }
    };
    
    document.addEventListener("keydown", handleKeyDown, true);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isFullscreen]);
  
  // Handle timer
  useEffect(() => {
    if (isTestSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isTestSubmitted]);
  
  const handleAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [testData.questions[currentQuestionIndex].id]: answer,
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsConfirmSubmitOpen(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmitTest = () => {
    setIsTestSubmitted(true);
    setIsConfirmSubmitOpen(false);
    
    // In a real app, you would send the answers to the server here
    toast({
      title: "Test submitted successfully",
      description: "Your answers have been recorded. Please wait for your results.",
    });
    
    // Simuler le chargement des résultats
    setTimeout(() => {
      setIsResultsReady(true);
      
      // Afficher la boîte de dialogue pour continuer
      setIsExitDialogOpen(true);
    }, 2000);
  };
  
  // Fonction pour finaliser le test et naviguer vers les résultats
  const finalizeTest = () => {
    // Fermer la boîte de dialogue
    setIsExitDialogOpen(false);
    
    // Maintenant on peut quitter le plein écran
    exitFullscreen();
    
    // Arrêter la caméra SEULEMENT à la fin de l'examen
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      // Arrêter la capture d'images
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
      
      // Arrêter tous les tracks de la caméra
      tracks.forEach(track => track.stop());
      setIsCameraActive(false);
      
      // Envoyer une dernière notification à l'API pour signaler la fin de l'examen
      fetch('http://127.0.0.1:5000/exam-completed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testId: testId,
          studentId: "1",
          timestamp: new Date().toISOString(),
          status: "completed"
        })
      }).catch(err => console.error("Erreur lors de la notification de fin d'examen:", err));
    }
    
    // Naviguer vers les résultats
    navigate(`/test/${testId}/results`);
  };
  
  // Fonction pour continuer l'examen et retourner en plein écran
  const continueExam = () => {
    setIsExitDialogOpen(false);
    
    // Forcer le retour en plein écran
    if (!document.fullscreenElement) {
      console.log("Retour en plein écran après avoir cliqué sur Continuer");
      enterFullscreen();
    }
  };
  
  // Gestionnaire d'événement pour bloquer la fermeture de la fenêtre/onglet
  useEffect(() => {
    if (!isResultsReady) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "Êtes-vous sûr de vouloir quitter l'examen ? Votre progression sera perdue.";
        return "Êtes-vous sûr de vouloir quitter l'examen ? Votre progression sera perdue.";
      };
      
      window.addEventListener("beforeunload", handleBeforeUnload);
      
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [isResultsReady]);
  
  // Protection lors de la fermeture du composant
  useEffect(() => {
    return () => {
      // Nettoyage de la caméra si le composant est démonté
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      
      // Arrêter la capture d'images
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
    };
  }, []);
  
  return (
    <Layout>
      <div ref={pageRef} className="fullscreen-container">
        {/* Elements invisibles pour la capture vidéo */}
        <div className="hidden">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            style={{ width: "640px", height: "480px" }}
          />
          <canvas ref={canvasRef} />
        </div>
        
        {/* Boîte de dialogue pour demander la permission d'utiliser la caméra */}
        <Dialog 
          open={isCameraPermissionDialogOpen} 
          onOpenChange={(open) => {
            // Empêcher la fermeture de cette boîte de dialogue sans autoriser la caméra
            if (!open) {
              toast({
                title: "Action requise",
                description: "L'accès à la caméra est obligatoire pour commencer l'examen.",
                variant: "destructive"
              });
              return;
            }
            setIsCameraPermissionDialogOpen(open);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Autorisation de caméra requise</DialogTitle>
              <DialogDescription>
                Pour assurer l'intégrité de l'examen, nous avons besoin d'accéder à votre caméra. 
                Votre vidéo sera analysée uniquement à des fins de prévention de la fraude.
                La caméra restera active pendant toute la durée de l'examen.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center py-4">
              <Camera size={64} className="text-primary" />
            </div>
            <DialogFooter>
              <Button 
                onClick={startExamWithCamera}
                style={{ backgroundColor: "#162766", color: "white" }}
                className="hover:opacity-90"
              >
                Autoriser et commencer l'examen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{testData.title}</h1>
              <p className="text-muted-foreground">{testData.module}</p>
            </div>
            {isCameraActive && (
              <div className="flex items-center gap-2 text-green-600">
                <Camera size={16} />
                <span className="text-sm">Surveillance active</span>
              </div>
            )}
          </div>
          
          <div className="max-w-3xl mx-auto">
            {isTestSubmitted && isResultsReady ? (
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <h2 className="text-xl font-bold text-green-800 mb-4">Test completed successfully!</h2>
                <p className="mb-4">All your answers have been recorded. You will be redirected to your results shortly.</p>
                <Button 
                  onClick={finalizeTest}
                  style={{ backgroundColor: "#162766", color: "white" }}
                  className="hover:opacity-90"
                >
                  View Results
                </Button>
              </div>
            ) : (
              <QuestionView
                question={testData.questions[currentQuestionIndex]}
                totalQuestions={testData.questions.length}
                currentQuestionIndex={currentQuestionIndex}
                timeRemaining={timeRemaining}
                totalTime={testData.duration}
                onAnswer={handleAnswer}
                onNext={handleNext}
                onPrevious={handlePrevious}
                selectedAnswer={answers[testData.questions[currentQuestionIndex].id]}
              />
            )}
          </div>
        </div>
        
        {/* Indicateur visuel de capture (optionnel) */}
        {isCameraActive && (
          <div className="fixed bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs text-gray-600">Surveillance</span>
            </div>
          </div>
        )}
        
        {/* Boîte de dialogue pour confirmer la soumission */}
        <Dialog open={isConfirmSubmitOpen} onOpenChange={setIsConfirmSubmitOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Test</DialogTitle>
              <DialogDescription>
                Are you sure you want to submit your test? This action cannot be undone.
                La surveillance par caméra sera arrêtée une fois que vous aurez consulté vos résultats.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfirmSubmitOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitTest} 
                style={{ backgroundColor: "#162766", color: "white" }}
                className="hover:opacity-90"
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Boîte de dialogue pour la fin de l'examen */}
        <Dialog open={isExitDialogOpen} onOpenChange={(open) => {
          // Si on essaie de fermer la boîte de dialogue, on la maintient ouverte jusqu'à ce que l'utilisateur clique sur le bouton
          if (!open && !isResultsReady) {
            setIsExitDialogOpen(true);
          } else {
            setIsExitDialogOpen(open);
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isResultsReady ? "Test Completed" : "Mode Examen"}
              </DialogTitle>
              <DialogDescription>
                {isResultsReady 
                  ? "Félicitations! Votre examen a été soumis avec succès. Cliquez sur 'Voir les résultats' pour continuer. La surveillance par caméra sera arrêtée à ce moment-là."
                  : "Vous devez terminer l'examen avant de pouvoir quitter le mode plein écran. Veuillez continuer l'examen jusqu'à la fin."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {isResultsReady ? (
                <Button 
                  onClick={finalizeTest}
                  style={{ backgroundColor: "#162766", color: "white" }}
                  className="hover:opacity-90"
                >
                  Voir les résultats
                </Button>
              ) : (
                <Button 
                  onClick={continueExam}
                  style={{ backgroundColor: "#162766", color: "white" }}
                  className="hover:opacity-90"
                >
                  Continuer l'examen
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
       </div>
     </Layout>
  );
}