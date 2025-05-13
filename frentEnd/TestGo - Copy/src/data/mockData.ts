import { Student, Technology, TrainingGroup } from "@/types/models";

export const technologies: Technology[] = [
  { name: "Java" },
  { name: "SQL" },
  { name: "Python" },
  { name: "XML" },
  { name: "JS" },
  { name: "JAVA" },
  { name: "C" },
  { name: "C#" },
  { name: "Spring" },
];

// Programs/tracks for the students
export const programs = ["Informatique", "Réseaux", "Cybersécurité", "Intelligence Artificielle"];

export const students: Student[] = [
  { id: "1", name: "Jean Dupont", email: "jean.dupont@example.com", program: "Informatique" },
  { id: "2", name: "Marie Laurent", email: "marie.laurent@example.com", program: "Réseaux" },
  { id: "3", name: "Pierre Martin", email: "pierre.martin@example.com", program: "Informatique" },
  { id: "4", name: "Sophie Dubois", email: "sophie.dubois@example.com", program: "Cybersécurité" },
  { id: "5", name: "Lucas Bernard", email: "lucas.bernard@example.com", program: "Intelligence Artificielle" },
  { id: "6", name: "Camille Thomas", email: "camille.thomas@example.com", program: "Informatique" },
  { id: "7", name: "Hugo Richard", email: "hugo.richard@example.com", program: "Réseaux" },
  { id: "8", name: "Emma Petit", email: "emma.petit@example.com", program: "Cybersécurité" },
  { id: "9", name: "Nathan Durand", email: "nathan.durand@example.com", program: "Informatique" },
  { id: "10", name: "Léa Leroy", email: "lea.leroy@example.com", program: "Intelligence Artificielle" },
  { id: "11", name: "Louis Moreau", email: "louis.moreau@example.com", program: "Réseaux" },
  { id: "12", name: "Chloé Simon", email: "chloe.simon@example.com", program: "Cybersécurité" },
];

export const trainingGroups: TrainingGroup[] = [
  {
    id: "1",
    name: "2ITE-1",
    studentCount: 30,
    technology: { name: "Java" },
    students: students.slice(0, 5),
    teacher: "Prof. Dubois"
  },
  {
    id: "2",
    name: "2ITE-2",
    studentCount: 25,
    technology: { name: "Spring" },
    students: students.slice(5, 9),
    teacher: "Prof. Martin"
  },
  {
    id: "3",
    name: "ISIC-2",
    studentCount: 40,
    technology: { name: "JS" },
    students: students.slice(9),
    teacher: "Prof. Laurent"
  },
];
