import React, { useState } from 'react';
import { featuredDestinationsData } from '../data/featuredDestinationsData';
import './styles/featured.css';
import { FaTimes, FaCalendar, FaEnvelope } from 'react-icons/fa';
import { BsCurrencyRupee } from 'react-icons/bs';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { isMobileDevice } from '../utils/deviceDetect';

const Featured = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = isMobileDevice();

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDestination(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="featurepage-container">
      {!isMobile && <Navbar />}
      
      <div 
        className="featurepage-hero"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                      url(${process.env.PUBLIC_URL}/assets/featured/hero.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="featurepage-hero-title">Featured Destinations</h1>
        <p className="featurepage-hero-subtitle">Discover Our Handpicked Experiences</p>
      </div>

      <div className="featurepage-content">
        <div className="featurepage-grid">
          {featuredDestinationsData.map((dest) => (
            <div 
              key={dest._id} 
              className="featurepage-card"
              onClick={() => handleDestinationClick(dest)}
            >
              <div className="featurepage-card-image">
                <img 
                  src={process.env.PUBLIC_URL + dest.image} 
                  alt={dest.heading}
                  onError={(e) => {
                    e.target.src = process.env.PUBLIC_URL + '/assets/featured/default.jpg';
                  }}
                />
                <div className="featurepage-card-overlay">
                  <h3 className="featurepage-card-title">{dest.heading}</h3>
                  <p className="featurepage-card-caption">{dest.caption}</p>
                  <div className="featurepage-card-price">
                    <BsCurrencyRupee />
                    <span>{dest.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && selectedDestination && (
        <div className={`featurepage-modal ${isMobile ? 'mobile' : ''}`} onClick={closeModal}>
          <div className="featurepage-modal-content" onClick={e => e.stopPropagation()}>
            <button className="featurepage-modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            
            <div className="featurepage-modal-grid">
              <div className="featurepage-modal-image">
                <img 
                  src={process.env.PUBLIC_URL + selectedDestination.image} 
                  alt={selectedDestination.heading}
                />
              </div>
              
              <div className="featurepage-modal-info">
                <h2>{selectedDestination.heading}</h2>
                <p className="featurepage-modal-caption">{selectedDestination.caption}</p>
                <p className="featurepage-modal-description">{selectedDestination.description}</p>
                <div className="featurepage-modal-meta">
                  <div className="featurepage-meta-item">
                    <FaCalendar />
                    <div>
                      <span>Duration</span>
                      <strong>{selectedDestination.days} Days</strong>
                    </div>
                  </div>
                  <div className="featurepage-meta-item">
                    <BsCurrencyRupee />
                    <div>
                      <span>Starting from</span>
                      <strong>₹{selectedDestination.price.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
                <button className="featurepage-enquire-btn">
                  <FaEnvelope />
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isMobile && <Footer />}
    </div>
  );
};

export default Featured;