
export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface Technology {
  name: string;
}

export interface TrainingGroup {
  id: string;
  name: string;
  studentCount: number;
  technology: Technology; // Modifié: technologies -> technology (un seul objet)
  students: Student[];
  teacher: string;
}
