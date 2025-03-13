import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HomeIcon,
  GlobeAltIcon, 
  CalendarIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  GlobeAltIcon as GlobeAltIconSolid,
  CalendarIcon as CalendarIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
} from '@heroicons/react/24/solid';
import MobileSearchBar from './MobileSearchBar';
import './styles/mobileNavbar.css';

const MobileNavbar = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  return (
    <>
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
            className={`mobnav-item ${currentPath === '/featured' ? 'active' : ''}`}
            onClick={() => {
              navigate('/featured');
              document.body.style.overflow = 'auto'; // Reset scroll when navigating
            }}
          >
            {currentPath === '/featured' ? (
              <GlobeAltIconSolid className="mobnav-icon active" />
            ) : (
              <GlobeAltIcon className="mobnav-icon" />
            )}
            <span className="mobnav-text">Featured</span>
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
            className={`mobnav-item ${isSearchOpen ? 'active' : ''}`}
            onClick={handleSearchClick}
          >
            {isSearchOpen ? (
              <MagnifyingGlassIconSolid className="mobnav-icon active" />
            ) : (
              <MagnifyingGlassIcon className="mobnav-icon" />
            )}
            <span className="mobnav-text">Search</span>
          </button>
        </div>
      </nav>

      <MobileSearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default MobileNavbar;
