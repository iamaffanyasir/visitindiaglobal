import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleAdminClick = () => {
    navigate('/admin/login');
  };

  return (
    <nav className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <a href="/" className="nav-logo">
          VisitIndiaGlobal
        </a>

        <div className="nav-links">
          <a href="#destinations" className="nav-link">Destinations</a>
          <a href="#featured" className="nav-link">Featured</a>
          <a href="#upcoming" className="nav-link">Upcoming</a>
          <a href="#contact" className="nav-link">Contact Us</a>
          <button className="nav-button" onClick={handleAdminClick}>
            Admin Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;