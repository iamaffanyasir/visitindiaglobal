import React from 'react';
import { testimonialsData } from '../data/testimonialsData';
import './styles/mobileTestimonials.css';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const MobileTestimonials = () => {
  // Just use the first testimonial
  const testimonial = testimonialsData[0];

  return (
    <div 
      className="mobtm-container"
      style={{
        background: `url(${process.env.PUBLIC_URL}/assets/testimonials/testimonial-back.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '80%'
      }}
    >
      <div className="mobtm-content">
        <h2 className="mobtm-title">What Our Travelers Say</h2>
        
        <div className="mobtm-testimonial">
          <div className="mobtm-quote-icon">
            <FaQuoteLeft />
          </div>
          
          <p className="mobtm-comment">{testimonial.comment}</p>
          
          <div className="mobtm-author">
            <img 
              src={process.env.PUBLIC_URL + testimonial.image}
              alt={testimonial.name}
              className="mobtm-author-img"
            />
            <div className="mobtm-author-info">
              <h4 className="mobtm-author-name">{testimonial.name}</h4>
              <p className="mobtm-author-location">{testimonial.location}</p>
              <div className="mobtm-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="mobtm-star" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTestimonials;
