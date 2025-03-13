import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <nav className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          Visit India Global
        </Link>
        <div className="nav-links">
          <Link to="/destinations" className="nav-link">Destinations</Link>
          <Link to="/featured" className="nav-link">Featured</Link>
          <Link to="/upcoming" className="nav-link">Upcoming</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;