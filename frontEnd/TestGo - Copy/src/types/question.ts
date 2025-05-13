export type QuestionType = 'theorique' | 'pratique';

export interface BaseQuestion {
  id: string;
  enonce: string;
  module: string;
  dureeReponse: number;
  niveau: number;
  type: QuestionType;
  explications: string;
  pointsMax: number;
  nbEssaisMax: number;
}

export interface QuestionTheorique extends BaseQuestion {
  type: 'theorique';
  options: string[];
  dateDebut: string;
  CorrectOption:number;
  verifierReponseQCM: (reponses: string[]) => boolean;
}


export interface TestUnitaire {
  id: string;
  description: string;
  input: any;    
  expectedOutput: any; 
  isHidden?: boolean;  
}

export interface QuestionPratique extends BaseQuestion {
  type: 'pratique';
  codeInitial: string;
  testsUnitaires: TestUnitaire[];  
  consigne: string;
  evaluerCode: (codeReponse: string) => boolean;
  executerTestsUnitaires: (codeReponse: string) => Array<{
    testId: string;
    passed: boolean;
    input: any;
    expectedOutput: any;
    actualOutput?: any;
    error?: string;
  }>;
}

export type Question = QuestionTheorique | QuestionPratique;

export interface Module {
  id: string;
  nom: string;
  description: string;
  questions: Question[];
}