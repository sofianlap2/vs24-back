import React, { useState, useEffect } from "react";
import ValueCard from "./ValueCard";
import img1 from "../../../public/images/Innovation.svg";
import img2 from "../../../public/images/Partage.svg";
import img3 from "../../../public/images/Transparence.svg";
import next from "../../../public/images/leftCircle.svg";
import prev from "../../../public/images/rightCircle.svg";
const valuesData = [
  {
    icon: img1,
    title: "Innovation",
    description:
      "Promotion de l'innovation technologique à travers le développement et la proposition de solutions novatrices répondant aux évolutions du marché de l'énergie électrique.",
  },
  {
    icon: img2,
    title: "Partage",
    description:
      "Le partage de l'énergie stockée favorise la collaboration et la solidarité au sein de la communauté en permettant à chacun de recharger ses appareils électroniques.",
  },
  {
    icon: img3,
    title: "Transparence",
    description:
      "Respect de la politique de transparence envers les utilisateurs concernant la collecte, l'utilisation et le partage de leurs données.",
  },
];

function OurValues() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentValueIndex, setCurrentValueIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the mobile breakpoint if needed
    };
    handleResize(); // Check screen size on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentValueIndex((prevIndex) => (prevIndex === 0 ? valuesData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentValueIndex((prevIndex) => (prevIndex === valuesData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="our-values" id="valeurs">
      <h2 className="section-title">Nos Valeurs</h2>
      <div className="values-card-grid">
        {isMobile ? (
          <ValueCard key={currentValueIndex} {...valuesData[currentValueIndex]} />
        ) : (
          valuesData.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))
        )}
      </div>

      {isMobile && (
        <div className="value-navigation" style={{ marginTop: '20px' }}>
          <button className="nav-button next" aria-label="Next value" onClick={handleNext}>
            <img src={next} alt="Next" />
          </button>
          <button className="nav-button prev" aria-label="Previous value" onClick={handlePrev}>
            <img src={prev} alt="Previous" />
          </button>
          
        </div>
      )}
    </section>
  );
}

export default OurValues;
