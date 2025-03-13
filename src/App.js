import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Carousel from './components/carousel';
import Login from './admin/login';
import Dashboard from './admin/dashboard';
import Footer from './components/footer';
import FeaturedDestinations from './components/featureddestinations';
import UpcomingTrips from './components/UpcomingTrips';
import WeekendTrips from './components/WeekendTrips';
import './App.css';
import { isMobileDevice } from './utils/deviceDetect';

function App() {
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile && window.location.pathname === '/') {
    return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={
              <div className="mobile-home">
                {/* Your new mobile home components will go here */}
                <h1>Mobile View Coming Soon</h1>
              </div>
            } />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }

  // Desktop view remains unchanged
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/" element={
            <>
              <Navbar />
              <main className="main-content">
                <Carousel />
                <FeaturedDestinations />
                <UpcomingTrips />
                <WeekendTrips />
                {/* Add other homepage components here */}
              </main>
              <Footer />
            </>
          } />
          {/* Redirect /admin to /admin/login */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;