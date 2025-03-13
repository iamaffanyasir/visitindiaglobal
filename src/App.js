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
import MobileNavbar from './components/MobileNavbar';
import MobileTopBar from './components/MobileTopBar';
import MobileCarousel from './components/MobileCarousel';
import MobileFeatured from './components/MobileFeatured';
import MobileUpcoming from './components/MobileUpcoming';
import MobileWeekend from './components/MobileWeekend';
import MobileFooter from './components/MobileFooter';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Testimonials from './components/Testimonials';
import MobileTestimonials from './components/MobileTestimonials';

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
              <>
                <MobileTopBar />
                <div className="mobile-home">
                  <MobileCarousel />
                  <MobileFeatured />
                  <MobileUpcoming />
                  <MobileWeekend />
                  <MobileTestimonials />
                  <MobileFooter />
                  <FloatingWhatsApp />
                </div>
                <MobileNavbar />
              </>
            } />
            <Route path="/explore" element={<div>Explore Page</div>} />
            <Route path="/trips" element={<div>Trips Page</div>} />
            <Route path="/profile" element={<div>Profile Page</div>} />
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
                <Testimonials />
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