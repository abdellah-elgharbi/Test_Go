import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      
      <nav className="sidebar-nav">
        <button 
          className="nav-item"
          onClick={() => navigate('/profile')}
        >
          <span className="nav-icon">👤</span>
          <span className="nav-text">Profil</span>
        </button>
        
        <button 
          className="nav-item active"
          onClick={() => navigate('/tests')}
        >
          <span className="nav-icon">📝</span>
          <span className="nav-text">Tests</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar; 