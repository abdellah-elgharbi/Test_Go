import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  Database, 
  BarChart2, 
  Users, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface NavItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const TeacherNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/teacher-dashboard' },
    { name: 'Créer & administrer tests', icon: <FileText className="w-5 h-5" />, path: '/teacher/tests' },
    { name: 'Manage Questions', icon: <Database className="w-5 h-5" />, path: '/teacher/questions' },
    { name: 'Résultats & analyses', icon: <BarChart2 className="w-5 h-5" />, path: '/teacher/reports' },
    { name: 'Groupes de formation', icon: <Users className="w-5 h-5" />, path: '/teacher/groups' },
    { name: 'Paramètres', icon: <Settings className="w-5 h-5" />, path: '/teacher-profile' },
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile navbar toggle button */}
      <button
        onClick={toggleNavbar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-green-600 text-white"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar navigation */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:static inset-y-0 left-0 z-40 ${
          isExpanded ? 'w-64' : 'w-16'
        } bg-green-700 text-white transition-all duration-300 ease-in-out`}
      >
        {/* Logo and brand */}
        <div className="flex items-center justify-center h-16 border-b border-green-600">
          {isExpanded ? (
            <h1 className="text-xl font-bold">Portail Enseignant</h1>
          ) : (
            <Users className="w-6 h-6" />
          )}
        </div>

        {/* User information */}
        {isExpanded && (
          <div className="flex flex-col items-center p-4 border-b border-green-600">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div className="mt-2 text-center">
              <h2 className="font-semibold">Prof. Sarah Miller</h2>
              <p className="text-sm text-green-200">Computer Science Department</p>
            </div>
          </div>
        )}

        {/* Expand/collapse button */}
        <button 
          onClick={toggleExpand}
          className="w-full flex items-center justify-center p-2 border-b border-green-600 hover:bg-green-600"
        >
          {isExpanded ? 
            <ChevronLeft className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </button>

        {/* Navigation links */}
        <nav className="mt-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className={`flex items-center py-3 hover:bg-green-600 transition-colors ${
                    isExpanded ? 'px-4 justify-start' : 'px-0 justify-center'
                  }`}
                  title={!isExpanded ? item.name : undefined}
                >
                  <span className={isExpanded ? "mr-3" : ""}>{item.icon}</span>
                  {isExpanded && <span>{item.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button */}
        <div className={`absolute bottom-0 w-full p-2 border-t border-green-600 ${
          isExpanded ? 'px-4' : 'px-0'
        }`}>
          <button className={`flex items-center w-full py-2 text-white hover:bg-green-600 transition-colors ${
            isExpanded ? 'px-4 justify-start' : 'px-0 justify-center'
          }`}>
            <LogOut className={`w-5 h-5 ${isExpanded ? 'mr-3' : ''}`} />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default TeacherNavbar;