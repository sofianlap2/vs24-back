import React, { useState, useEffect } from 'react';
import ValueCard from './ValueCard';
import img1 from '../../../public/images/serviceClient.svg';
import img2 from '../../../public/images/value.svg';
import img3 from '../../../public/images/maintenance.svg';
import img4 from '../../../public/images/ccc.svg';

const valueData = [
  {
    icon: `${img1}`,
    title: "Service Client",
    description: "Service client disponible et à l'écoute 7/7"
  },
  {
    icon: `${img2}`,
    title: "Value",
    description: "Promotion de l'innovation technologique à travers le développ"
  },
  {
    icon: `${img3}`,
    title: "Maintenance",
    description: "Prise en charge de l'ensemble du processus de maintenance"
  },
  {
    icon: `${img4}`,
    title: "Personalization",
    description: "Promotion de l'innovation technologique à travers le développ"
  }
];

function ValueAddedSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentValueIndex, setCurrentValueIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the mobile breakpoint as needed
    };
    handleResize(); // Check screen size on initial render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentValueIndex((prevIndex) => (prevIndex === 0 ? valueData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentValueIndex((prevIndex) => (prevIndex === valueData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="value-added-section">
      <div className="value-card-grid">
        {isMobile ? (
          <ValueCard key={currentValueIndex} {...valueData[currentValueIndex]} />
        ) : (
          valueData.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))
        )}
      </div>

      {isMobile && (
        <div className="testimonial-navigation" style={{ marginTop: '20px' }}>
          <button className="nav-button prev" aria-label="Previous value" onClick={handlePrev}>
            <img src="../../../public/images/leftCircle.svg" alt="Previous" />
          </button>
          <button className="nav-button next" aria-label="Next value" onClick={handleNext}>
            <img src="../../../public/images/rightCircle.svg" alt="Next" />
          </button>
        </div>
      )}
    </section>
  );
}

export default ValueAddedSection;
