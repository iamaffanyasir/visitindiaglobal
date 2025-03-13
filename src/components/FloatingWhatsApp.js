import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { PhoneIcon } from '@heroicons/react/24/solid';
import './styles/floatingWhatsApp.css';

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918506032347', '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+918506032347';
  };

  return (
    <div className="floating-buttons">
      <button className="floating-call" onClick={handleCallClick}>
        <PhoneIcon className="floating-call-icon" />
      </button>
      <button className="floating-whatsapp" onClick={handleWhatsAppClick}>
        <FaWhatsapp className="floating-whatsapp-icon" />
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
