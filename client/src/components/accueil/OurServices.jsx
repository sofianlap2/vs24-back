import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import img from "../../../public/images/Megaphone.svg";

const servicesData = [
  {
    icon: `${img}`,
    title: "Publicité",
    description: "Faites la publicité dans nos stations de recharge situées dans divers espaces publiques",
  },
  {
    icon: `${img}`,
    title: "Location",
    description: "Location des stations de recharge par jour ou par mois",
  },
  {
    icon: `${img}`,
    title: "Vente",
    description: "Vente des stations de recharge",
  },
];

function OurServices() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update the mobile breakpoint as needed
    };
    handleResize(); // Check screen size on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentServiceIndex((prevIndex) => (prevIndex === 0 ? servicesData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentServiceIndex((prevIndex) => (prevIndex === servicesData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="our-services" id="services">
      <h2 className="section-title-service">Nos Services</h2>
      <div className="service-card-container">
        {isMobile ? (
          <ServiceCard key={currentServiceIndex} {...servicesData[currentServiceIndex]} />
        ) : (
          servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))
        )}
      </div>

      {isMobile && (
        <div className="service-navigation" style={{ marginTop: '20px' }}>
          <button className="nav-button prev" aria-label="Previous service" onClick={handlePrev}>
            <img src="../../../public/images/leftCircle.svg" alt="Previous" />
          </button>
          <button className="nav-button next" aria-label="Next service" onClick={handleNext}>
            <img src="../../../public/images/rightCircle.svg" alt="Next" />
          </button>
        </div>
      )}
    </section>
  );
}

export default OurServices;
