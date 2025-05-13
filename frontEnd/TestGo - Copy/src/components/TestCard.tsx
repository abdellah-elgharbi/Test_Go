import React from 'react'; 
import { Link } from 'react-router-dom';  

interface TestCardProps {
  id: number;
  title: string;
  status: 'disponible' | 'indisponible';
  startTime: string;
  date: string;
  duration: string;
  onStart?: () => void;
}  

const TestCard: React.FC<TestCardProps> = ({
  id,
  title, 
  status,
  startTime,
  date,
  duration,
  onStart
}) => {
  const isDisabled = false;
   
  // Render button based on availability
  const renderButton = () => {
    if (isDisabled) {
      // Disabled button without link when unavailable
      return (
        <button
          className="w-full py-2 px-4 rounded-md text-center text-sm font-medium bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
          disabled={true}
        >
          Commencer le test
        </button>
      );
    } else {
      // Active button with link when available - nouvelle couleur bleu marine foncé
      return (
        <Link to={`/test/${id}`} className="block w-full">
          <button
            className="w-full py-2 px-4 rounded-md text-center text-sm font-medium bg-indigo-900 text-white hover:bg-indigo-800 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition-colors duration-200"
            onClick={onStart}
          >
            Suivant
          </button>
        </Link>
      );
    }
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${isDisabled ? 'border-l-4 border-gray-400' : 'border-l-4 border-green-500'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          isDisabled 
            ? 'bg-gray-100 text-gray-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {isDisabled ? 'Indisponible' : 'Disponible'}
        </span>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Heure début</span>
          <span className="text-sm font-medium text-gray-700">{startTime}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Date</span>
          <span className="text-sm font-medium text-gray-700">{date}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Durée max</span>
          <span className="text-sm font-medium text-gray-700">{duration}</span>
        </div>
      </div>
 
      {/* Render appropriate button based on status */}
      {renderButton()}
    </div>
  );
};  

export default TestCard;