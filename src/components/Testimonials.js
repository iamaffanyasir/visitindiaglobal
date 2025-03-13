import React, { useState, useEffect } from 'react';
import { testimonialsData } from '../data/testimonialsData';
import './styles/testimonials.css';
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTransition = (newIndex) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentTestimonial(newIndex);
    
    // Reset animation flag after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Match this with your longest animation duration
  };

  const nextTestimonial = () => {
    const newIndex = currentTestimonial === testimonialsData.length - 1 ? 0 : currentTestimonial + 1;
    handleTransition(newIndex);
  };

  const prevTestimonial = () => {
    const newIndex = currentTestimonial === 0 ? testimonialsData.length - 1 : currentTestimonial - 1;
    handleTransition(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000); // Auto-advance every 6 seconds
    return () => clearInterval(timer);
  }, [currentTestimonial]);

  return (
    <div className="tm-container">
      <div className="tm-content">
        <h2 className="tm-title">What Our Travelers Say</h2>
        
        <div className="tm-carousel">
          <button className="tm-nav-btn tm-prev" onClick={prevTestimonial}>
            <FaArrowLeft />
          </button>

          <div className="tm-testimonial">
            <div className="tm-quote-icon">
              <FaQuoteLeft />
            </div>
            
            <p className="tm-comment">{testimonialsData[currentTestimonial].comment}</p>
            
            <div className="tm-author">
              <img 
                src={process.env.PUBLIC_URL + testimonialsData[currentTestimonial].image} 
                alt={testimonialsData[currentTestimonial].name} 
                className="tm-author-img"
              />
              <div className="tm-author-info">
                <h4 className="tm-author-name">{testimonialsData[currentTestimonial].name}</h4>
                <p className="tm-author-location">{testimonialsData[currentTestimonial].location}</p>
                <div className="tm-rating">
                  {[...Array(testimonialsData[currentTestimonial].rating)].map((_, i) => (
                    <FaStar key={i} className="tm-star" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button className="tm-nav-btn tm-next" onClick={nextTestimonial}>
            <FaArrowRight />
          </button>
        </div>

        <div className="tm-indicators">
          {testimonialsData.map((_, index) => (
            <div 
              key={index}
              className={`tm-indicator ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => handleTransition(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
