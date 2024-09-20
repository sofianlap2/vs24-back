import React, { useState } from 'react';
import img from '../../../public/images/heroSection.svg'
import ValueAddedSection from './ValueAddedSection';
function HeroSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  const scrollToJoinSection = () => {
    const joinSection = document.getElementById('join');
    if (joinSection) {
      joinSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="hero-section" id="Home">
      <div className="hero-content">
        <h1 className="hero-title">EMBRACE THE FUTURE<br />AUTOMATE YOUR SERVICES</h1>
        
        <p className={`hero-description ${isExpanded ? 'expanded' : 'collapsed'}`}>
          Voltwise Solutions se spécialise dans la conception, le développement et le déploiement de bornes connectées, 
          en mettant l'accent sur les entreprises accueillant du public. Notre expertise couvre l'ensemble du processus, 
          de l'analyse initiale à la phase de conception, en passant par un soutien dédié à nos clients pour l'intégration 
          de services connectés destinés à leurs visiteurs. Notre produit phare est une borne de recharge pour appareils 
          électroniques, spécifiquement conçue pour améliorer l'expérience d'accueil en offrant un service de recharge 
          automatique et sécurisé.
        </p> 
        <button className="toggle-description-button" onClick={toggleDescription}>
          {isExpanded ? 'Montrer Moins' : 'Savoir Plus'}
        </button>
<br/>
        <div className="hero-buttons">
          <button className="cta-button primary">Demander Un Devis</button>
          <button className="cta-button secondary" onClick={scrollToJoinSection}>
            Rejoignez-nous
          </button>
        </div>
      </div>
      <img src={img} alt="Hero illustration" className="hero-image" />
     
    </section>
    
  );
}

export default HeroSection;
