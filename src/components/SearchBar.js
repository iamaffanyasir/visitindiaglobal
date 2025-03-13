import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './styles/searchBar.css';

const SearchBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show search button after carousel (100vh)
      const shouldShow = window.scrollY > window.innerHeight;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300); // Wait for animation to complete
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSearchTerm('');
    setTimeout(() => {
      setIsOpen(false);
    }, 300); // Wait for collapse animation
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isExpanded && e.target.value) {
      setIsExpanded(true);
    } else if (isExpanded && !e.target.value) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {isVisible && !isOpen && (
        <button 
          className="searchbar-button"
          onClick={handleOpen}
        >
          <FaSearch />
        </button>
      )}

      <div className={`searchbar-pill ${isOpen ? 'active' : ''}`}>
        <div className="searchbar-input-wrapper">
          <FaSearch className="searchbar-input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="searchbar-input"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="searchbar-close" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
