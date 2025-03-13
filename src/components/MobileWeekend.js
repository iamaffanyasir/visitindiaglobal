import React, { useState } from 'react';
import { weekendTripsData } from '../data/weekendTripsData';
import './styles/mobileWeekend.css';
import { FaTimes, FaCalendar, FaEnvelope } from 'react-icons/fa';
import { BsCurrencyRupee } from 'react-icons/bs';

const MobileWeekend = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    <div className="mobweekend-container">
      <div className="mobweekend-header">
        <h4 className="mobweekend-subtitle">QUICK ESCAPES</h4>
        <h2 className="mobweekend-title">Weekend Trips</h2>
      </div>

      <div className="mobweekend-slider">
        <div className="mobweekend-carousel">
          {weekendTripsData.map((dest) => (
            <div 
              key={dest._id} 
              className="mobweekend-tile"
              onClick={() => handleDestinationClick(dest)}
            >
              <div className="mobweekend-tile-image">
                <img 
                  src={process.env.PUBLIC_URL + dest.image} 
                  alt={dest.heading}
                  onError={(e) => {
                    e.target.src = process.env.PUBLIC_URL + '/assets/weekend/default.jpg';
                  }}
                />
                <div className="mobweekend-tile-overlay">
                  <h3 className="mobweekend-tile-title">{dest.heading}</h3>
                  <p className="mobweekend-tile-caption">{dest.caption}</p>
                  <p className="mobweekend-tile-price">
                    <BsCurrencyRupee />
                    {dest.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && selectedDestination && (
        <div className="mobweekend-modal" onClick={closeModal}>
          <div className="mobweekend-modal-content" onClick={e => e.stopPropagation()}>
            <button className="mobweekend-modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            
            <div className="mobweekend-modal-image">
              <img 
                src={process.env.PUBLIC_URL + selectedDestination.image} 
                alt={selectedDestination.heading}
              />
            </div>
            
            <div className="mobweekend-modal-info">
              <h2>{selectedDestination.heading}</h2>
              <p className="mobweekend-modal-caption">{selectedDestination.caption}</p>
              <p className="mobweekend-modal-description">{selectedDestination.description}</p>
              <div className="mobweekend-modal-meta">
                <div className="mobweekend-meta-item">
                  <FaCalendar />
                  <div>
                    <span>Duration</span>
                    <strong>{selectedDestination.days} Days</strong>
                  </div>
                </div>
                <div className="mobweekend-meta-item">
                  <BsCurrencyRupee />
                  <div>
                    <span>Starting from</span>
                    <strong>₹{selectedDestination.price.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
              <button className="mobweekend-enquire-btn">
                <FaEnvelope />
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileWeekend;
