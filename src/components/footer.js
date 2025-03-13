import React from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaPinterestP } from 'react-icons/fa';
import './styles/footer.css';

const Footer = () => {
  return (
    <footer className="ft-container">
      <div className="ft-content">
        {/* Logo and Brand Name */}
        <div className="ft-logo-section">
          <img src="../assets/logo/logo.jpg" alt="VisitIndia Logo" className="ft-logo" />
          <h2 className="ft-brand">VisitIndiaGlobal</h2>
        </div>

        {/* Navigation Links */}
        <div className="ft-nav-links">
          <a href="/destinations" className="ft-nav-btn">Destinations</a>
          <a href="/featured" className="ft-nav-btn">Featured</a>
          <a href="/upcoming" className="ft-nav-btn">Upcoming</a>
          <a href="/contact" className="ft-nav-btn">Contact Us</a>
          <a href="/privacy-policy" className="ft-nav-btn">Privacy Policy</a>
        </div>

        {/* Divider Line */}
        <hr className="ft-divider" />

        {/* Bottom Section */}
        <div className="ft-bottom">
          <p className="ft-copyright"> 2025 VisitIndiaGlobal. All rights reserved</p>
          <div className="ft-social-icons">
            <a href="https://instagram.com/visitindia" target="_blank" rel="noopener noreferrer" className="ft-social-link"><FaInstagram /></a>
            <a href="https://facebook.com/visitindia" target="_blank" rel="noopener noreferrer" className="ft-social-link"><FaFacebookF /></a>
            <a href="https://youtube.com/visitindia" target="_blank" rel="noopener noreferrer" className="ft-social-link"><FaYoutube /></a>
            <a href="https://pinterest.com/visitindia" target="_blank" rel="noopener noreferrer" className="ft-social-link"><FaPinterestP /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;