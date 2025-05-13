import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ hideConnexion = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  
  // Track scroll position with enhanced behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
      setHasScrolled(currentPosition > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Active link checker
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Enhanced fixed navigation with animation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-700 ${
          hasScrolled 
            ? 'bg-[#FAFAFC]/95 backdrop-blur-lg shadow-lg py-1' 
            : 'bg-[#FAFAFC] py-3'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                {/* Logo SVG avec taille plus importante */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className={`transition-all duration-700 ${
                  hasScrolled ? 'w-16 h-12' : 'w-24 h-16'
                }`}>
                  {/* Fond circulaire */}
                  <circle cx="150" cy="100" r="80" fill="#f8fafc" stroke="#162766" strokeWidth="3" className="transition-all duration-1000">
                    <animate attributeName="r" values="80;82;80" dur="3s" repeatCount="indefinite" />
                  </circle>
                 
                  {/* Chapeau de graduation (mortier) */}
                  <path d="M150,60 L90,85 L150,110 L210,85 Z" fill="#162766" stroke="#0f172a" strokeWidth="2.5"/>
                 
                  {/* Pompon et fil du chapeau */}
                  <line x1="150" y1="110" x2="150" y2="135" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round">
                    <animate attributeName="y2" values="135;130;135" dur="2s" repeatCount="indefinite" />
                  </line>
                  <circle cx="150" cy="135" r="5" fill="#0f172a">
                    <animate attributeName="cy" values="135;130;135" dur="2s" repeatCount="indefinite" />
                  </circle>
                 
                  {/* Dessus du chapeau (plaque) */}
                  <rect x="120" y="60" width="60" height="10" fill="#162766" stroke="#0f172a" strokeWidth="2"/>
                  <line x1="150" y1="70" x2="150" y2="60" stroke="#0f172a" strokeWidth="1" strokeLinecap="round"/>
                 
                  {/* Livre ouvert sous le chapeau */}
                  <path d="M110,120 Q150,100 190,120 L190,150 Q150,130 110,150 Z" fill="#4385E0" stroke="#162766" strokeWidth="2"/>
                  <path d="M150,100 L150,130" stroke="#162766" strokeWidth="1.5" strokeDasharray="2,2"/>
                 
                  {/* Petits éléments décoratifs */}
                  <circle cx="100" cy="70" r="5" fill="#4385E0"/>
                  <circle cx="200" cy="70" r="5" fill="#4385E0"/>
                  <path d="M90,115 A60,60 0 0,0 210,115" fill="none" stroke="#4A5888" strokeWidth="1.5" strokeDasharray="5,3"/>
                 
                  {/* Étoiles de connaissance avec animation de scintillement */}
                  <path d="M80,85 L85,85 L87,80 L89,85 L94,85 L90,88 L92,93 L87,90 L82,93 L84,88 Z" fill="#89C6F9">
                    <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
                  </path>
                  <path d="M210,95 L215,95 L217,90 L219,95 L224,95 L220,98 L222,103 L217,100 L212,103 L214,98 Z" fill="#89C6F9">
                    <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite" />
                  </path>
                  <path d="M180,65 L185,65 L187,60 L189,65 L194,65 L190,68 L192,73 L187,70 L182,73 L184,68 Z" fill="#89C6F9">
                    <animate attributeName="opacity" values="1;0.5;1" dur="4s" repeatCount="indefinite" />
                  </path>
                 
                  {/* Cercle de la connaissance */}
                  <circle cx="150" cy="100" r="95" fill="none" stroke="#4A5888" strokeWidth="2" strokeDasharray="5,5">
                    <animateTransform attributeName="transform" type="rotate" from="0 150 100" to="360 150 100" dur="30s" repeatCount="indefinite" />
                  </circle>
                </svg>
                
                <div className={`font-bold transition-all duration-700 ${
                  hasScrolled ? 'text-xl ml-2' : 'text-2xl ml-4'
                } text-[#162766] hover:text-[#4385E0] hover:scale-105`}>
                  {"EduTest"}
                </div>
              </Link>
            </div>
            
            {/* Desktop menu with enhanced active state indicators */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { path: '/', label: 'Accueil' },
                { path: '/about', label: 'À propos' },
                { path: '/contact', label: 'Contact' }
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`relative px-3 py-2 font-medium transition-all duration-500 group overflow-hidden ${
                    isActive(item.path) 
                      ? 'text-[#162766] font-semibold' 
                      : 'text-[#4A5888] hover:text-[#162766]'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Bottom border animation */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-all duration-500 ${
                    isActive(item.path) 
                      ? 'translate-x-0 bg-[#162766]' 
                      : '-translate-x-full bg-[#89C6F9] group-hover:translate-x-0'
                  }`}></span>
                  
                  {/* Top border animation */}
                  <span className={`absolute top-0 right-0 w-full h-0.5 transform transition-all duration-500 ${
                    isActive(item.path) 
                      ? 'translate-x-0 bg-[#162766]' 
                      : 'translate-x-full bg-[#89C6F9] group-hover:translate-x-0'
                  }`}></span>
                  
                  {/* Background glow effect */}
                  <span className="absolute inset-0 bg-[#162766]/5 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 rounded-md transition-all duration-500 -z-10"></span>
                </Link>
              ))}
              
              {!hideConnexion && (
                <Link 
                  to="/login" 
                  className="relative group bg-[#162766] text-white px-6 py-2 rounded-md font-medium transition-all duration-500 hover:shadow-lg hover:shadow-[#162766]/30 overflow-hidden"
                >
                  <span className="relative z-10 transition-all duration-500 group-hover:text-white">Se connecter</span>
                  
                  {/* Enhanced button effects */}
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#4385E0] to-[#162766] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"></span>
                  
                  {/* Animated border glow */}
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#162766] via-[#4385E0] to-[#89C6F9] opacity-0 group-hover:opacity-70 blur-md transition-all duration-1000 -z-10 group-hover:duration-500"></span>
                  
                  {/* Animated particles effect */}
                  <span className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#89C6F9] opacity-0 group-hover:opacity-50 transition-all duration-700" style={{ 
                    transform: 'translate(20%, 50%)',
                    animation: 'float-particle 3s infinite ease-in-out'
                  }}></span>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#4385E0] opacity-0 group-hover:opacity-70 transition-all duration-700" style={{ 
                    transform: 'translate(-30%, -40%)',
                    animation: 'float-particle 4s infinite ease-in-out reverse'
                  }}></span>
                  
                  {/* Add keyframes in style tag */}
                  <style jsx>{`
                    @keyframes float-particle {
                      0%, 100% { transform: translate(0, 0); }
                      50% { transform: translate(10px, -10px); }
                    }
                  `}</style>
                </Link>
              )}
            </div>
            
            {/* Improved mobile menu button with animation */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-3 rounded-full text-[#162766] hover:text-[#4385E0] hover:bg-[#89C6F9]/20 focus:outline-none transition-all duration-500"
                aria-expanded={isMenuOpen}
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-500 ${
                    isMenuOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'
                  }`}></span>
                  <span className={`absolute h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? 'w-0 opacity-0 left-1/2' : 'w-full opacity-100 left-0 top-3'
                  }`}></span>
                  <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-500 ${
                    isMenuOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Enhanced mobile menu with better animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-700 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 bg-gradient-to-b from-[#FAFAFC] to-[#FAFAFC]/95 backdrop-blur-lg shadow-inner">
            {[
              { path: '/', label: 'Accueil' },
              { path: '/courses', label: 'Cours' },
              { path: '/resources', label: 'Ressources' },
              { path: '/about', label: 'À propos' },
              { path: '/contact', label: 'Contact' }
            ].map((item, index) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`block pl-4 pr-4 py-3 text-base font-medium transition-all duration-500 transform ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                } ${
                  isActive(item.path) 
                    ? 'text-[#162766] border-l-4 border-[#162766] bg-gradient-to-r from-[#162766]/10 to-transparent' 
                    : 'text-[#4A5888] hover:text-[#162766] hover:border-l-4 hover:border-[#162766] hover:bg-gradient-to-r hover:from-[#162766]/5 hover:to-transparent'
                }`}
                style={{
                  transitionDelay: `${index * 75}ms`
                }}
              >
                {item.label}
              </Link>
            ))}
            
            {!hideConnexion && (
              <div className="pt-4 space-y-3 transform transition-all duration-700" style={{ transitionDelay: '400ms' }}>
                <Link 
                  to="/signup" 
                  className={`block mx-3 my-2 px-5 py-3 text-center text-base font-medium text-white bg-[#162766] hover:bg-[#4385E0] rounded-md transition-all duration-500 hover:shadow-md relative overflow-hidden transform ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                >
                  <span className="relative z-10">S'inscrire gratuitement</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#162766] to-[#4385E0] transform scale-x-0 origin-left hover:scale-x-100 transition-transform duration-700"></span>
                </Link>
                <Link 
                  to="/login" 
                  className={`block mx-3 my-2 px-4 py-2 text-center text-base font-medium text-[#162766] bg-[#FAFAFC] border-2 border-[#162766] hover:bg-[#162766]/10 rounded-md transition-all duration-500 transform ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: '500ms' }}
                >
                  Se connecter
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* Dynamic spacing to compensate for the variable height of the fixed menu */}
      <div className={`transition-all duration-700 ${hasScrolled ? 'h-20' : 'h-28'}`}></div>
    </>
  );
};

export default Navbar;