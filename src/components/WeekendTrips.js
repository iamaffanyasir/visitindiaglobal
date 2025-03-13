import React, { useState } from 'react';
import { weekendTripsData } from '../data/weekendTripsData';
import './styles/featureddestinations.css';
import { FaArrowLeft, FaArrowRight, FaTimes, FaCalendar, FaEnvelope } from 'react-icons/fa';
import { BsCurrencyRupee } from 'react-icons/bs';

const WeekendTrips = () => {
  const [destinations, setDestinations] = useState(weekendTripsData);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleScroll = (direction) => {
    const container = document.querySelector('.weekend-carousel');
    const scrollAmount = direction === 'left' ? -1100 : 1100;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

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
    <div className="fd-container">
      <div className="fd-header">
        <h4 className="fd-subtitle">QUICK ESCAPES</h4>
        <h2 className="fd-title">Weekend Trips</h2>
      </div>

      <div className="fd-wrapper">
        <button 
          className="fd-nav-btn fd-nav-prev"
          onClick={() => handleScroll('left')}
          aria-label="Previous"
        >
          <FaArrowLeft />
        </button>

        <div className="fd-carousel weekend-carousel">
          {destinations.map((dest) => (
            <div 
              key={dest._id} 
              className="fd-tile"
              onClick={() => handleDestinationClick(dest)}
            >
              <div className="fd-tile-image">
                <img 
                  src={process.env.PUBLIC_URL + dest.image} 
                  alt={dest.heading}
                  onError={(e) => {
                    console.error(`Failed to load image: ${dest.image}`);
                    e.target.src = process.env.PUBLIC_URL + '/assets/featured/default.jpg';
                  }}
                />
                <div className="fd-tile-overlay">
                  <h3 className="fd-tile-title">{dest.heading}</h3>
                  <p className="fd-tile-price">
                    <BsCurrencyRupee />
                    {dest.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="fd-nav-btn fd-nav-next"
          onClick={() => handleScroll('right')}
          aria-label="Next"
        >
          <FaArrowRight />
        </button>
      </div>

      {modalOpen && selectedDestination && (
        <div className="fd-modal" onClick={closeModal}>
          <div className="fd-modal-content" onClick={e => e.stopPropagation()}>
            <button className="fd-modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            
            <div className="fd-modal-grid">
              <div className="fd-modal-image">
                <img 
                  src={process.env.PUBLIC_URL + selectedDestination.image} 
                  alt={selectedDestination.heading}
                  onError={(e) => {
                    console.error(`Failed to load image: ${selectedDestination.image}`);
                    e.target.src = process.env.PUBLIC_URL + '/assets/featured/default.jpg';
                  }}
                />
              </div>
              
              <div className="fd-modal-info">
                <h2 className="fd-modal-title">{selectedDestination.heading}</h2>
                <p className="fd-modal-caption">{selectedDestination.caption}</p>
                <p className="fd-modal-description">{selectedDestination.description}</p>
                
                <div className="fd-modal-meta">
                  <div className="fd-meta-item">
                    <FaCalendar className="fd-icon" />
                    <div>
                      <span>Duration</span>
                      <strong>{selectedDestination.days} Days</strong>
                    </div>
                  </div>
                  
                  <div className="fd-meta-item">
                    <BsCurrencyRupee className="fd-icon" />
                    <div>
                      <span>Starting from</span>
                      <strong>₹{selectedDestination.price.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                <button className="fd-enquire-btn">
                  <FaEnvelope />
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekendTrips;
