
export type EyeDirection = 'left' | 'right' | 'straight' | 'down' | 'up';

export interface FraudAttempt {
  id: string;
  timestamp: string;
  eyeDirection: EyeDirection;
  description: string;
  imageUrl: string;
  severity: 'low' | 'medium' | 'high'
}

export interface Student {
  id: string;
  name: string;
  avatarUrl: string;
  testDate: string;
  testName: string;
  fraudAttempts: FraudAttempt[];
}

export const students: Student[] = [
  {
    id: '1',
    name: 'Thomas Dupont',
    avatarUrl: '/placeholder.svg',
    testDate: '2024-05-10',
    testName: 'Mathématiques Avancées',
    fraudAttempts: [
      {
        id: '101',
        timestamp: '2024-05-10T10:05:23',
        eyeDirection: 'left',
        description: 'Regard prolongé vers la gauche',
        imageUrl: '/placeholder.svg',
        severity: 'medium'
      },
      {
        id: '102',
        timestamp: '2024-05-10T10:15:45',
        eyeDirection: 'down',
        description: 'Regard vers le bas pendant 10 secondes',
        imageUrl: '/placeholder.svg',
        severity: 'low'
      }
    ]
  },
  {
    id: '2',
    name: 'Marie Laurent',
    avatarUrl: '/placeholder.svg',
    testDate: '2024-05-10',
    testName: 'Mathématiques Avancées',
    fraudAttempts: []
  },
  {
    id: '3',
    name: 'Alexandre Martin',
    avatarUrl: '/placeholder.svg',
    testDate: '2024-05-10',
    testName: 'Mathématiques Avancées',
    fraudAttempts: [
      {
        id: '301',
        timestamp: '2024-05-10T10:20:12',
        eyeDirection: 'right',
        description: 'Mouvement répété vers la droite',
        imageUrl: '/placeholder.svg',
        severity: 'high'
      }
    ]
  },
  {
    id: '4',
    name: 'Sophie Bernard',
    avatarUrl: '/placeholder.svg',
    testDate: '2024-05-09',
    testName: 'Physique Quantique',
    fraudAttempts: [
      {
        id: '401',
        timestamp: '2024-05-09T14:30:22',
        eyeDirection: 'left',
        description: 'Détournement du regard vers la gauche',
        imageUrl: '/placeholder.svg',
        severity: 'medium'
      },
      {
        id: '402',
        timestamp: '2024-05-09T14:45:55',
        eyeDirection: 'down',
        description: 'Regard vers le bas prolongé',
        imageUrl: '/placeholder.svg',
        severity: 'medium'
      }
    ]
  },
  {
    id: '5',
    name: 'Lucas Petit',
    avatarUrl: '/placeholder.svg',
    testDate: '2024-05-09',
    testName: 'Physique Quantique',
    fraudAttempts: []
  },
  {
    id: '6',
    name: 'Emma Leroy',
    avatarUrl: '/placeholder.svg',
    testDate: '2024-05-08',
    testName: 'Littérature Française',
    fraudAttempts: [
      {
        id: '601',
        timestamp: '2024-05-08T09:15:33',
        eyeDirection: 'up',
        description: 'Regard vers le plafond',
        imageUrl: '/placeholder.svg',
        severity: 'low'
      }
    ]
  },
  {
    id: '7',
    name: 'Maxime Dubois',
    avatarUrl: '/placeholder.svg',
    testDate: '2024-05-08',
    testName: 'Littérature Française',
    fraudAttempts: [
      {
        id: '701',
        timestamp: '2024-05-08T09:25:11',
        eyeDirection: 'right',
        description: 'Mouvement brusque vers la droite',
        imageUrl: '/placeholder.svg',
        severity: 'medium'
      },
      {
        id: '702',
        timestamp: '2024-05-08T09:35:47',
        eyeDirection: 'left',
        description: 'Regard prolongé vers la gauche',
        imageUrl: '/placeholder.svg',
        severity: 'high'
      },
      {
        id: '703',
        timestamp: '2024-05-08T09:40:18',
        eyeDirection: 'down',
        description: 'Détournement du regard vers le bas',
        imageUrl: '/placeholder.svg',
        severity: 'high'
      }
    ]
  }
];

export const getStudentById = (id: string): Student | undefined => {
  return students.find(student => student.id === id);
};
