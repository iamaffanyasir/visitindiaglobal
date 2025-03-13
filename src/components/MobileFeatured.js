import React, { useState } from 'react';
import { featuredDestinationsData } from '../data/featuredDestinationsData';
import './styles/mobileFeatured.css';
import { FaTimes, FaCalendar, FaEnvelope } from 'react-icons/fa';
import { BsCurrencyRupee } from 'react-icons/bs';

const MobileFeatured = () => {
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
    <div className="mobfeatured-container">
      <div className="mobfeatured-header">
        <h4 className="mobfeatured-subtitle">FEATURED PLACES</h4>
        <h2 className="mobfeatured-title">Popular Destinations</h2>
      </div>

      <div className="mobfeatured-slider">
        <div className="mobfeatured-carousel">
          {featuredDestinationsData.map((dest) => (
            <div 
              key={dest._id} 
              className="mobfeatured-tile"
              onClick={() => handleDestinationClick(dest)}
            >
              <div className="mobfeatured-tile-image">
                <img 
                  src={process.env.PUBLIC_URL + dest.image} 
                  alt={dest.heading}
                  onError={(e) => {
                    e.target.src = process.env.PUBLIC_URL + '/assets/featured/default.jpg';
                  }}
                />
                <div className="mobfeatured-tile-overlay">
                  <h3 className="mobfeatured-tile-title">{dest.heading}</h3>
                  <p className="mobfeatured-tile-caption">{dest.caption}</p>
                  <p className="mobfeatured-tile-price">
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
        <div className="mobfeatured-modal" onClick={closeModal}>
          <div className="mobfeatured-modal-content" onClick={e => e.stopPropagation()}>
            <button className="mobfeatured-modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            
            <div className="mobfeatured-modal-image">
              <img 
                src={process.env.PUBLIC_URL + selectedDestination.image} 
                alt={selectedDestination.heading}
              />
            </div>
            
            <div className="mobfeatured-modal-info">
              <h2>{selectedDestination.heading}</h2>
              <p className="mobfeatured-modal-caption">{selectedDestination.caption}</p>
              <p className="mobfeatured-modal-description">{selectedDestination.description}</p>
              <div className="mobfeatured-modal-meta">
                <div className="mobfeatured-meta-item">
                  <FaCalendar />
                  <div>
                    <span>Duration</span>
                    <strong>{selectedDestination.days} Days</strong>
                  </div>
                </div>
                <div className="mobfeatured-meta-item">
                  <BsCurrencyRupee />
                  <div>
                    <span>Starting from</span>
                    <strong>₹{selectedDestination.price.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
              <button className="mobfeatured-enquire-btn">
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

export default MobileFeatured;
