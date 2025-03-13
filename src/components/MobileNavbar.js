import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HomeIcon,
  GlobeAltIcon, 
  CalendarIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  GlobeAltIcon as GlobeAltIconSolid,
  CalendarIcon as CalendarIconSolid,
  UserCircleIcon as UserCircleIconSolid
} from '@heroicons/react/24/solid';
import './styles/mobileNavbar.css';

const MobileNavbar = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <nav className="mobnav-container">
      <div className="mobnav-wrapper">
        <button 
          className={`mobnav-item ${currentPath === '/' ? 'active' : ''}`} 
          onClick={() => navigate('/')}
        >
          {currentPath === '/' ? (
            <HomeIconSolid className="mobnav-icon active" />
          ) : (
            <HomeIcon className="mobnav-icon" />
          )}
          <span className="mobnav-text">Home</span>
        </button>
        
        <button 
          className={`mobnav-item ${currentPath === '/explore' ? 'active' : ''}`}
          onClick={() => navigate('/explore')}
        >
          {currentPath === '/explore' ? (
            <GlobeAltIconSolid className="mobnav-icon active" />
          ) : (
            <GlobeAltIcon className="mobnav-icon" />
          )}
          <span className="mobnav-text">Explore</span>
        </button>
        
        <button 
          className={`mobnav-item ${currentPath === '/trips' ? 'active' : ''}`}
          onClick={() => navigate('/trips')}
        >
          {currentPath === '/trips' ? (
            <CalendarIconSolid className="mobnav-icon active" />
          ) : (
            <CalendarIcon className="mobnav-icon" />
          )}
          <span className="mobnav-text">Trips</span>
        </button>
        
        <button 
          className={`mobnav-item ${currentPath === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
        >
          {currentPath === '/profile' ? (
            <UserCircleIconSolid className="mobnav-icon active" />
          ) : (
            <UserCircleIcon className="mobnav-icon" />
          )}
          <span className="mobnav-text">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;
