import React, { useState } from 'react';
import { FaPlus, FaTrash, FaImage } from 'react-icons/fa';
import { featuredData } from '../../data/featuredData';
import '../styles/featuredManager.css';

const FeaturedManager = () => {
  const [destinations, setDestinations] = useState(featuredData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      setLoading(true);
      const newDestination = {
        id: Date.now(),
        image: '/assets/slider/default.jpg',
        title: formData.get('title'),
        description: formData.get('description'),
        location: formData.get('location')
      };
      
      setDestinations([...destinations, newDestination]);
      e.target.reset();
      setSuccess('Destination added successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add destination. Please try again.');
      console.error('Error adding destination:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this destination?')) return;
    
    try {
      setLoading(true);
      setDestinations(destinations.filter(dest => dest.id !== id));
      setSuccess('Destination deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete destination. Please try again.');
      console.error('Error deleting destination:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ftm-container">
      <div className="ftm-add-section">
        <h2>Add New Featured Destination</h2>
        <form onSubmit={handleSubmit} className="ftm-form">
          <div className="ftm-form-group">
            <label htmlFor="image">
              <div className="ftm-image-upload">
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
              className="ftm-file-input"
            />
            <small className="ftm-note">Note: Using static images only</small>
          </div>

          <div className="ftm-form-group">
            <input
              type="text"
              name="title"
              placeholder="Destination Title"
              required
              className="ftm-input"
            />
          </div>

          <div className="ftm-form-group">
            <textarea
              name="description"
              placeholder="Destination Description"
              required
              className="ftm-textarea"
            />
          </div>

          <div className="ftm-form-group">
            <input
              type="text"
              name="location"
              placeholder="Location"
              required
              className="ftm-input"
            />
          </div>

          <button type="submit" className="ftm-button" disabled={loading}>
            <FaPlus /> Add Destination
          </button>
        </form>
      </div>

      {error && <div className="ftm-error">{error}</div>}
      {success && <div className="ftm-success">{success}</div>}

      <div className="ftm-destinations-section">
        <h2>Current Featured Destinations</h2>
        {loading ? (
          <div className="ftm-loading">Loading...</div>
        ) : (
          <div className="ftm-destinations-grid">
            {destinations.map((dest) => (
              <div key={dest.id} className="ftm-destination-card">
                <div className="ftm-destination-image-container">
                  <img 
                    src={process.env.PUBLIC_URL + dest.image}
                    alt={dest.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = process.env.PUBLIC_URL + '/assets/slider/default.jpg';
                    }}
                  />
                </div>
                <div className="ftm-destination-content">
                  <h3>{dest.title}</h3>
                  <p className="ftm-description">{dest.description}</p>
                  <p className="ftm-location">{dest.location}</p>
                  <button
                    onClick={() => handleDelete(dest.id)}
                    className="ftm-delete-button"
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

export default FeaturedManager;
