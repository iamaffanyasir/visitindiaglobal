import React, { useState, useEffect } from 'react';
import { carouselData } from '../data/carouselData';
import './styles/carousel.css';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Carousel = () => {
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
        setImagesLoaded(true); // Still show carousel even if some images fail
      }
    };

    loadImages();

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!imagesLoaded) {
    return <div className="carousel-loading">Loading...</div>;
  }

  return (
    <div className="c-container">
      <div className="c-wrapper">
        {carouselData.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`c-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="c-slide__inner">
              <img 
                src={process.env.PUBLIC_URL + slide.image} 
                alt={slide.heading}
                onError={(e) => {
                  console.error(`Failed to load image: ${slide.image}`);
                  e.target.src = process.env.PUBLIC_URL + '/assets/carousel/default.jpg';
                }}
              />
              
              <div className="c-social">
                <a href="https://wa.me/918506032347" className="c-social__icon"><FaWhatsapp /></a>
                <a href="https://www.instagram.com/visitindiaglobal?igsh=MTY3ZGhuaXpuemZkeQ%3D%3D&utm_source=qr" className="c-social__icon"><FaInstagram /></a>
                <a href="#" className="c-social__icon"><FaFacebook /></a>
              </div>

              <div className="c-overlay">
                <p className="c-explore">EXPLORE</p>
                <h2 className="c-heading">{slide.heading}</h2>
              </div>

              <div className="c-locations">
                {slide.locations.map((location, i) => (
                  <div key={i} className="c-location">
                    <span className="c-location__name">{location}</span>
                  </div>
                ))}
              </div>

              <div className="c-slide-number">
                <span className="c-slide-number__current">0{index + 1}</span>
                <div className="c-slide-number__line"></div>
                <span className="c-slide-number__total">05</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="c-indicator">
        {carouselData.map((_, index) => (
          <div
            key={index}
            className={`c-indicator__line ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;