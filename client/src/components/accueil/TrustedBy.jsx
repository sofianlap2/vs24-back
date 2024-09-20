import React, { useState, useEffect } from 'react';

const partnersData = [
  {
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/1683f119e14aca8a3de41862b6387ca0eedb9c81ff370b31610ee24c016f6285?placeholderIfAbsent=true&apiKey=5c35c3dd778f44179e62d77341ae2b07",
    name: "MARRIOTT",
    location: "TUNIS"
  },
  {
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/57d153cb9b035c5e978fd80fadfaee049de351d5e04c39a1cab7e0bf2630a693?placeholderIfAbsent=true&apiKey=5c35c3dd778f44179e62d77341ae2b07"
   ,name: "California Gym",
    location: "TUNIS"
  },
  {
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/1683f119e14aca8a3de41862b6387ca0eedb9c81ff370b31610ee24c016f6285?placeholderIfAbsent=true&apiKey=5c35c3dd778f44179e62d77341ae2b07",
    name: "MARRIOTT",
    location: "TUNIS"
  },
  {
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/57d153cb9b035c5e978fd80fadfaee049de351d5e04c39a1cab7e0bf2630a693?placeholderIfAbsent=true&apiKey=5c35c3dd778f44179e62d77341ae2b07"
   ,name: "California Gym",
    location: "TUNIS"
  }
];

function TrustedBy() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the mobile breakpoint if needed
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentPartnerIndex((prevIndex) => (prevIndex === 0 ? partnersData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentPartnerIndex((prevIndex) => (prevIndex === partnersData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="trusted-by">
      <h2 className="section-title">Ils nous font confiance</h2>
      <div className="partner-grid">
        {isMobile ? (
          <div className="partner-card">
            <img src={partnersData[currentPartnerIndex].logo} alt="Partner logo" className="partner-logo" />
            {partnersData[currentPartnerIndex].name && (
              <div className="partner-info">
                <p className="partner-name">{partnersData[currentPartnerIndex].name}</p>
                <p className="partner-location">{partnersData[currentPartnerIndex].location}</p>
              </div>
            )}
          </div>
        ) : (
          partnersData.map((partner, index) => (
            <div key={index} className="partner-card">
              <img src={partner.logo} alt="Partner logo" className="partner-logo" />
              {partner.name && (
                <div className="partner-info">
                  <p className="partner-name">{partner.name}</p>
                  <p className="partner-location">{partner.location}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isMobile && (
        <div className="testimonial-navigation" style={{ marginTop: '20px' }}>
          <button className="nav-button prev" aria-label="Previous partner" onClick={handlePrev}>
            <img src="../../../public/images/leftCircle.svg" alt="Previous" />
          </button>
          <button className="nav-button next" aria-label="Next partner" onClick={handleNext}>
            <img src="../../../public/images/rightCircle.svg" alt="Next" />
          </button>
        </div>
      )}
    </section>
  );
}

export default TrustedBy;
