import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './styles/mobileTopBar.css';

const MobileTopBar = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+919999999999', '_blank'); // Replace with your WhatsApp number
  };

  return (
    <div className="mobtopbar-container">
      <div className="mobtopbar-left">
        <img 
          src={process.env.PUBLIC_URL + '/assets/logo/logo.jpg'} 
          alt="VisitIndia Logo" 
          className="mobtopbar-logo"
        />
        <span className="mobtopbar-brand">VisitIndia Global</span>
      </div>
      <button className="mobtopbar-whatsapp" onClick={handleWhatsAppClick}>
        <FaWhatsapp />
      </button>
    </div>
  );
};

export default MobileTopBar;
