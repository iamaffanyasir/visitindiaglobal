import React, { useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './styles/mobileSearchBar.css';

const MobileSearchBar = ({ isOpen, onClose }) => {
  const inputRef = useRef(null);

  const handleOverlayClick = (e) => {
    // Close only if clicking the overlay background
    if (e.target.className === 'mobilesearch-overlay active') {
      onClose();
    }
  };

  return (
    <div 
      className={`mobilesearch-overlay ${isOpen ? 'active' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="mobilesearch-wrapper">
        <div className="mobilesearch-input-container">
          <FaSearch className="mobilesearch-icon" />
          <input
            ref={inputRef}
            type="text"
            className="mobilesearch-input"
            placeholder="Search destinations..."
            autoFocus
          />
          <button className="mobilesearch-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="mobilesearch-results">
          <p className="mobilesearch-empty-state">
            Start typing to search destinations...
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchBar;
