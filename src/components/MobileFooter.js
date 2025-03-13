import React from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaPinterestP } from 'react-icons/fa';
import './styles/mobileFooter.css';

const MobileFooter = () => {
  return (
    <footer className="mobfooter-container">
      <div className="mobfooter-content">
        <div className="mobfooter-logo-section">
          <img 
            src={process.env.PUBLIC_URL + '/assets/logo/logo.jpg'} 
            alt="VisitIndia Logo" 
            className="mobfooter-logo"
          />
          <h2 className="mobfooter-brand">VisitIndiaGlobal</h2>
        </div>

        <div className="mobfooter-nav-links">
          <a href="/destinations" className="mobfooter-nav-btn">Destinations</a>
          <a href="/featured" className="mobfooter-nav-btn">Featured</a>
          <a href="/upcoming" className="mobfooter-nav-btn">Upcoming</a>
          <a href="/contact" className="mobfooter-nav-btn">Contact Us</a>
          <a href="/privacy-policy" className="mobfooter-nav-btn">Privacy Policy</a>
        </div>

        <hr className="mobfooter-divider" />

        <div className="mobfooter-bottom">
          <div className="mobfooter-social-icons">
            <a href="https://instagram.com/visitindia" target="_blank" rel="noopener noreferrer" className="mobfooter-social-link">
              <FaInstagram />
            </a>
            <a href="https://facebook.com/visitindia" target="_blank" rel="noopener noreferrer" className="mobfooter-social-link">
              <FaFacebookF />
            </a>
            <a href="https://youtube.com/visitindia" target="_blank" rel="noopener noreferrer" className="mobfooter-social-link">
              <FaYoutube />
            </a>
            <a href="https://pinterest.com/visitindia" target="_blank" rel="noopener noreferrer" className="mobfooter-social-link">
              <FaPinterestP />
            </a>
          </div>
          <p className="mobfooter-copyright">© 2025 VisitIndiaGlobal. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
