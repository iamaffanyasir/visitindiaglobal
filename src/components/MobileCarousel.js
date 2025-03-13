import React, { useState, useEffect } from 'react';
import { carouselData } from '../data/carouselData';
import './styles/mobileCarousel.css';

const MobileCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      try {
        const imagePromises = carouselData.map((slide) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = process.env.PUBLIC_URL + slide.image;
            img.onload = resolve;
            img.onerror = reject;
          });
        });
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setImagesLoaded(true);
      }
    };

    loadImages();

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!imagesLoaded) {
    return <div className="mobcar-loading">Loading...</div>;
  }

  return (
    <div className="mobcar-container">
      <div className="mobcar-wrapper">
        {carouselData.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`mobcar-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="mobcar-slide__inner">
              <img 
                src={process.env.PUBLIC_URL + slide.image} 
                alt={slide.heading}
                className="mobcar-image"
              />
              
              <div className="mobcar-overlay">
                <p className="mobcar-explore">EXPLORE</p>
                <h2 className="mobcar-heading">{slide.heading}</h2>
              </div>

              <div className="mobcar-locations">
                {slide.locations.map((location, i) => (
                  <div key={i} className="mobcar-location">
                    <span className="mobcar-location__name">{location}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mobcar-indicator">
        {carouselData.map((_, index) => (
          <div
            key={index}
            className={`mobcar-indicator__line ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileCarousel;
