import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/dashboard.css';
import CarouselManager from './components/CarouselManager';
import FeaturedDestinationManager from './components/FeaturedDestinationManager';
import { FaImages, FaMapMarkedAlt, FaSignOutAlt, FaChartLine } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('carousel');
  const [stats, setStats] = useState({
    carouselCount: 0,
    destinationsCount: 0
  });
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [carouselRes, destinationsRes] = await Promise.all([
          axios.get(`${API_URL}/api/carousel`),
          axios.get(`${API_URL}/api/featured-destinations`)
        ]);
        setStats({
          carouselCount: carouselRes.data.length,
          destinationsCount: destinationsRes.data.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>VisitIndia</h2>
          <p>Admin Dashboard</p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeSection === 'carousel' ? 'active' : ''}`}
            onClick={() => setActiveSection('carousel')}
          >
            <FaImages className="nav-icon" />
            <span>Carousel Manager</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'destinations' ? 'active' : ''}`}
            onClick={() => setActiveSection('destinations')}
          >
            <FaMapMarkedAlt className="nav-icon" />
            <span>Destinations</span>
          </button>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="nav-icon" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="content-header">
          <h1>{activeSection === 'carousel' ? 'Carousel Manager' : 'Featured Destinations'}</h1>
        </header>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <FaImages />
            </div>
            <div className="stat-details">
              <h3>Carousel Slides</h3>
              <p>{stats.carouselCount}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaMapMarkedAlt />
            </div>
            <div className="stat-details">
              <h3>Destinations</h3>
              <p>{stats.destinationsCount}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-details">
              <h3>Total Views</h3>
              <p>1.2K</p>
            </div>
          </div>
        </div>

        <div className="content-body">
          {activeSection === 'carousel' && <CarouselManager />}
          {activeSection === 'destinations' && <FeaturedDestinationManager />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;