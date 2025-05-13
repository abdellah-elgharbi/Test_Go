
import { Clock, Eye } from "lucide-react";

const MonitoringExplanation = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium text-green-800 flex items-center gap-2 mb-2">
        <Eye className="h-5 w-5" />
        Processus de surveillance
      </h3>
      <div className="text-sm text-green-700">
        <p className="mb-2">
          <span className="font-medium">Comment fonctionne la surveillance ?</span> Toutes les 2 secondes, 
          notre système prend automatiquement une capture de l'écran durant l'examen.
        </p>
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <Clock className="h-4 w-4" />
          <span>Fréquence de capture: une image toutes les 2 secondes</span>
        </div>
        <p>
          Chaque image est analysée en temps réel par notre modèle d'intelligence artificielle 
          qui détecte la direction du regard de l'étudiant. Les mouvements suspects sont 
          enregistrés comme tentatives potentielles de fraude et classés selon leur gravité.
        </p>
      </div>
    </div>
  );
};

export default MonitoringExplanation;
