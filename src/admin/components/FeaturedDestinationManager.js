import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaImage } from 'react-icons/fa';
import '../styles/featuredDestinationManager.css';
import '../styles/image-styles.css';
import { getApiUrl, getImageUrl } from '../../config/api';

const API_URL = getApiUrl() || 'http://localhost:5000';

const FeaturedDestinationManager = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/featured-destinations`);
      setDestinations(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch destinations. Please try again.');
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      setLoading(true);
      await axios.post(`${API_URL}/featured-destinations`, formData);
      await fetchDestinations();
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this destination?')) return;
    
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/featured-destinations/${id}`);
      await fetchDestinations();
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
    <div className="fdm-container">
      {/* Add New Destination Form */}
      <div className="fdm-add-section">
        <h2>Add New Featured Destination</h2>
        <form onSubmit={handleSubmit} className="fdm-form">
          <div className="fdm-form-group">
            <label htmlFor="image">
              <div className="fdm-image-upload">
                <FaImage />
                <span>Choose Image</span>
              </div>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              className="fdm-file-input"
            />
          </div>

          <div className="fdm-form-group">
            <input
              type="text"
              name="heading"
              placeholder="Destination Heading"
              required
              className="fdm-input"
            />
          </div>

          <div className="fdm-form-group">
            <input
              type="text"
              name="caption"
              placeholder="Destination Caption"
              required
              className="fdm-input"
            />
          </div>

          <button type="submit" className="fdm-button" disabled={loading}>
            <FaPlus /> Add Destination
          </button>
        </form>
      </div>

      {/* Messages */}
      {error && <div className="fdm-error">{error}</div>}
      {success && <div className="fdm-success">{success}</div>}

      {/* Current Destinations */}
      <div className="fdm-destinations-section">
        <div className="fdm-section-header">
          <h2>MANAGE</h2>
          <h1>Featured Destinations</h1>
        </div>

        {loading ? (
          <div className="fdm-loading">Loading...</div>
        ) : (
          <div className="fdm-destinations-grid">
            {destinations.map((destination) => (
              <div key={destination._id} className="fdm-destination-card">
                <img src={getImageUrl(destination.image)} alt={destination.heading} />
                <div className="fdm-destination-content">
                  <h3>{destination.heading}</h3>
                  <p>{destination.caption}</p>
                  <button
                    onClick={() => handleDelete(destination._id)}
                    className="fdm-delete-button"
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

export default FeaturedDestinationManager;
