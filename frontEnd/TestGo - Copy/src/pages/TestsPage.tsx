import React, { useState, useEffect } from 'react';
import TestCard from '../components/TestCard';
import './TestsPage.css';
import StudentNavbar from '@/components/navbar/StudentNavbar';
import Layout from '@/components/layout/Layout';
// Fonction pour formater la date au format DD-MM-YYYY
const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Fonction pour formater l'heure au format HH:mm
const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const testsData = [
  {
    id: 1,
    title: 'OOP Concepts',
    startTime: '14:30',
    date: formatDate(new Date()),  // Aujourd'hui
    duration: '45'
  },
  {
    id: 2,
    title: 'PL SQL',
    startTime: '16:45',
    date: formatDate(new Date()),  // Aujourd'hui
    duration: '45'
  },
  {
    id: 3,
    title: 'Mongo Db',
    startTime: '10:30',
    date: formatDate(new Date(Date.now() + 86400000)),  // Demain
    duration: '30'
  },
  {
    id: 4,
    title: 'PHP',
    startTime: '14:30',
    date: formatDate(new Date(Date.now() + 86400000)),  // Demain
    duration: '45'
  },
  {
    id: 5,
    title: 'Cloud',
    startTime: '11:30',
    date: formatDate(new Date(Date.now() + 7 * 86400000)),  // Dans une semaine
    duration: '45'
  }
];

const TestsPage: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  // Mise à jour chaque minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const tests = testsData
    .filter(test => test.title.toLowerCase().includes(searchTerm))
    .map(test => {
      const currentDate = formatDate(currentDateTime);
      const currentTime = formatTime(currentDateTime);

      // Le test est disponible uniquement si la date correspond ET que l'heure actuelle est l'heure de début
      const isAvailable = test.date === currentDate && test.startTime === currentTime;

      return {
        ...test,
        status: isAvailable ? 'disponible' as const : 'indisponible' as const,
        duration: `${test.duration} min`
      };
    });

  const handleStartTest = (testId: number) => {
    console.log('Starting test:', testId);
    // Logique pour démarrer le test
  };

  return (
   
     <Layout>
    <div className='flex-1'>
    
    <div className="tests-page">
      <div className="tests-header">
        <h1>Tests disponibles</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Rechercher un test..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="tests-grid">
        {tests.map(test => (
          <TestCard
            key={test.id}
            id={test.id}
            title={test.title}
            status={test.status}
            startTime={test.startTime}
            date={test.date}
            duration={test.duration}
            onStart={() => handleStartTest(test.id)}
          />
        ))}
      </div>
    </div>
    </div>
    </Layout>
  );
};

export default TestsPage; 