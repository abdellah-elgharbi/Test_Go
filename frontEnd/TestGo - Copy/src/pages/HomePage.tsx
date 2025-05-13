import React from 'react';
import Navbar from '../components/home/NavBar';
import { Link } from 'react-router-dom';

interface Student {
  id: number;
  name: string;
  email: string;
  progress: number;
  }

  interface Test {
  id: number;
  name: string;
  date: string;
  status: string;
  }

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#89C6F9] to-[#4385E0]">
      {/* Utilisez le composant Navbar isolé */}
    
      <Navbar hideConnexion={false}/>
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Apprendre devient <span className="text-[#162766]">simple</span> et <span className="text-[#162766]">amusant</span>
            </h1>
          
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
             <Link to ="/login"> <a href="#" className="px-6 py-3 bg-[#162766] text-white font-medium rounded-md shadow-md hover:bg-[#4A5888] transition duration-300 text-center">
                Commencer
              </a>
              </Link>
              <Link to="/">
              <a href="#" className="px-6 py-3 bg-white text-[#4A5888] font-medium rounded-md shadow-md hover:bg-gray-50 transition duration-300 text-center">
                Découvrir
              </a>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="src\assets\image.png" alt="Étudiants qui apprennent" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>
      
      {/* Badge gratuit */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <div className="bg-white border-l-4 border-[#162766] p-4 rounded-lg shadow-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-[#4385E0]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-[#4A5888]">
                <span className="font-bold">Accès libre et permanent</span> – Tous nos tests et ressources sont disponibles sans restriction.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#162766] mb-4">Pourquoi choisir notre plateforme</h2>
            <p className="text-lg text-[#4A5888] max-w-2xl mx-auto">
              Nous combinons technologie et pédagogie pour offrir la meilleure expérience d'apprentissage, gratuitement pour tous
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#89C6F9]/10 rounded-lg hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-md bg-[#4385E0] text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#162766] mb-2">Cours interactifs</h3>
              <p className="text-[#4A5888]">
                Des leçons engageantes avec vidéos, quiz et exercices pratiques pour un apprentissage actif.
              </p>
            </div>
            
            <div className="p-6 bg-[#89C6F9]/10 rounded-lg hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-md bg-[#4385E0] text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#162766] mb-2">Suivi de progression</h3>
              <p className="text-[#4A5888]">
                Suivez votre évolution avec des statistiques détaillées et des recommandations personnalisées.
              </p>
            </div>
            
            <div className="p-6 bg-[#89C6F9]/10 rounded-lg hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-md bg-[#4385E0] text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#162766] mb-2">Communauté d'apprenants</h3>
              <p className="text-[#4A5888]">
                Échangez avec d'autres étudiants et enseignants pour enrichir votre apprentissage.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-[#162766] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à commencer votre parcours éducatif ?</h2>
          <p className="text-[#89C6F9] text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'apprenants qui ont transformé leur vie grâce à notre plateforme gratuite.
          </p>
          <a href="#" className="px-8 py-3 bg-white text-[#162766] font-medium rounded-md shadow-md hover:bg-[#89C6F9] hover:text-[#162766] transition duration-300 inline-block animate-pulse">
            Se connecter
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#4A5888] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EduTest</h3>
              <p className="text-[#89C6F9]">
                Plateforme éducative gratuite et innovante dédiée à la réussite de tous les apprenants.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#89C6F9] hover:text-white transition-colors duration-300">Accueil</a></li>
                <li><a href="#" className="text-[#89C6F9] hover:text-white transition-colors duration-300">Cours</a></li>
                <li><a href="#" className="text-[#89C6F9] hover:text-white transition-colors duration-300">Ressources</a></li>
                <li><a href="#" className="text-[#89C6F9] hover:text-white transition-colors duration-300">Témoignages</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#89C6F9] hover:text-white transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="text-[#89C6F9] hover:text-white transition-colors duration-300">Contact</a></li>
                <li><a href="#" className="text-[#89C6F9] hover:text-white transition-colors duration-300">Assistance</a></li>
                <li><a href="#" className="text-[#89C6F9] hover:text-white transition-colors duration-300">Politique de confidentialité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Restez connecté</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-[#89C6F9] hover:text-white transition-colors duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[#89C6F9] hover:text-white transition-colors duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[#89C6F9] hover:text-white transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
              <form>
                <label className="block text-sm font-medium text-[#89C6F9] mb-2">S'abonner à notre newsletter</label>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="px-4 py-2 w-full bg-[#162766] text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#89C6F9]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4385E0] text-white rounded-r-md hover:bg-[#89C6F9] focus:outline-none focus:ring-2 focus:ring-[#89C6F9]"
                  >
                    OK
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#162766] text-center text-[#89C6F9]">
            <p>&copy; {new Date().getFullYear()} EduTest. Tous droits réservés. <span className="text-white">100% gratuit</span>.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;