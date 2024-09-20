import React from 'react';

function ServiceCard({ icon, title, description }) {
  return (
    <div className="service-card">
      <img src={icon} alt={`${title} icon`} className="service-icon" />
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      <button className="see-more-button">See more</button>
    </div>
  );
}

export default ServiceCard;