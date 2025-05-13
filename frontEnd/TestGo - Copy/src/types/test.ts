
export interface Test {
  id: string;
  titre: string;
  module: string;
  niveau: string;
  typeExamen: string;
  creneau: string;
  dureeTotal: number;
  melange: boolean;
  nombreQuestions: number;
  filiere: string;
  dateCreation: string;
}

export interface TestPassage {
  id: string;
  testId: string;
  etudiant: string;
  dateDebut: string;
  dateFin: string;
  score: number;
  status: string;
}

export interface TestStatistics {
  filiere: string;
  totalTests: number;
  scoresMoyens: number;
  tauxReussite: number;
  nombreEtudiants: number;
  niveaux?: { 
    niveau: string;
    totalTests: number;
    scoresMoyens: number;
    tauxReussite: number;
  }[];
}

export interface FilterOptions {
  startDate: Date | null;
  endDate: Date | null;
  filiere: string | null;
}
