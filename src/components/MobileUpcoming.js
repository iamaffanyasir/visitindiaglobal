import React, { useState } from 'react';
import { upcomingTripsData } from '../data/upcomingTripsData';
import './styles/mobileUpcoming.css';
import { FaTimes, FaCalendar, FaEnvelope } from 'react-icons/fa';
import { BsCurrencyRupee } from 'react-icons/bs';

const MobileUpcoming = () => {
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
    <div className="mobupcoming-container">
      <div className="mobupcoming-header">
        <h4 className="mobupcoming-subtitle">PLAN AHEAD</h4>
        <h2 className="mobupcoming-title">Upcoming Trips</h2>
      </div>

      <div className="mobupcoming-slider">
        <div className="mobupcoming-carousel">
          {upcomingTripsData.map((dest) => (
            <div 
              key={dest._id} 
              className="mobupcoming-tile"
              onClick={() => handleDestinationClick(dest)}
            >
              <div className="mobupcoming-tile-image">
                <img 
                  src={process.env.PUBLIC_URL + dest.image} 
                  alt={dest.heading}
                  onError={(e) => {
                    e.target.src = process.env.PUBLIC_URL + '/assets/upcoming/default.jpg';
                  }}
                />
                <div className="mobupcoming-tile-overlay">
                  <h3 className="mobupcoming-tile-title">{dest.heading}</h3>
                  <p className="mobupcoming-tile-caption">{dest.caption}</p>
                  <p className="mobupcoming-tile-price">
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
        <div className="mobupcoming-modal" onClick={closeModal}>
          <div className="mobupcoming-modal-content" onClick={e => e.stopPropagation()}>
            <button className="mobupcoming-modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            
            <div className="mobupcoming-modal-image">
              <img 
                src={process.env.PUBLIC_URL + selectedDestination.image} 
                alt={selectedDestination.heading}
              />
            </div>
            
            <div className="mobupcoming-modal-info">
              <h2>{selectedDestination.heading}</h2>
              <p className="mobupcoming-modal-caption">{selectedDestination.caption}</p>
              <p className="mobupcoming-modal-description">{selectedDestination.description}</p>
              <div className="mobupcoming-modal-meta">
                <div className="mobupcoming-meta-item">
                  <FaCalendar />
                  <div>
                    <span>Duration</span>
                    <strong>{selectedDestination.days} Days</strong>
                  </div>
                </div>
                <div className="mobupcoming-meta-item">
                  <BsCurrencyRupee />
                  <div>
                    <span>Starting from</span>
                    <strong>₹{selectedDestination.price.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
              <button className="mobupcoming-enquire-btn">
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

export default MobileUpcoming;
