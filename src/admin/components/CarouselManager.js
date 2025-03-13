import React, { useState } from 'react';
import { FaPlus, FaTrash, FaImage } from 'react-icons/fa';
import { carouselData } from '../../data/carouselData';
import '../styles/carouselManager.css';
import '../styles/image-styles.css';

const CarouselManager = () => {
  const [slides, setSlides] = useState(carouselData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      setLoading(true);
      const newSlide = {
        id: Date.now(),
        image: '/assets/carousel/default.jpg',
        heading: formData.get('heading'),
        locations: formData.get('locations').split(',').map(loc => loc.trim())
      };
      
      setSlides([...slides, newSlide]);
      e.target.reset();
      setSuccess('Slide added successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add slide. Please try again.');
      console.error('Error adding slide:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return;
    
    try {
      setLoading(true);
      setSlides(slides.filter(slide => slide.id !== id));
      setSuccess('Slide deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete slide. Please try again.');
      console.error('Error deleting slide:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crm-container">
      <div className="crm-add-section">
        <h2>Add New Slide</h2>
        <form onSubmit={handleSubmit} className="crm-form">
          <div className="crm-form-group">
            <label htmlFor="image">
              <div className="crm-image-upload">
                <FaImage />
                <span>Choose Image</span>
              </div>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              disabled
              className="crm-file-input"
            />
            <small className="crm-note">Note: Using static images only</small>
          </div>

          <div className="crm-form-group">
            <input
              type="text"
              name="heading"
              placeholder="Slide Heading"
              required
              className="crm-input"
            />
          </div>

          <div className="crm-form-group">
            <input
              type="text"
              name="locations"
              placeholder="Locations (comma-separated)"
              required
              className="crm-input"
            />
          </div>

          <button type="submit" className="crm-button" disabled={loading}>
            <FaPlus /> Add Slide
          </button>
        </form>
      </div>

      {error && <div className="crm-error">{error}</div>}
      {success && <div className="crm-success">{success}</div>}

      <div className="crm-slides-section">
        <h2>Current Slides</h2>
        {loading ? (
          <div className="crm-loading">Loading...</div>
        ) : (
          <div className="crm-slides-grid">
            {slides.map((slide) => (
              <div key={slide.id} className="crm-slide-card">
                <div className="crm-slide-image-container">
                  <img 
                    src={process.env.PUBLIC_URL + slide.image}
                    alt={slide.heading}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = process.env.PUBLIC_URL + '/assets/carousel/default.jpg';
                    }}
                  />
                </div>
                <div className="crm-slide-content">
                  <h3>{slide.heading}</h3>
                  <p>{Array.isArray(slide.locations) ? slide.locations.join(', ') : slide.locations}</p>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="crm-delete-button"
                    disabled={loading}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselManager;
