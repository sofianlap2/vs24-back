import React from "react";

function ValueCard({ icon, title, description }) {
  return (
    <div className="value-card">
      <div className="value-card-inner">
        {/* Front side with the icon */}
        <div className="value-card-front">
          <img src={icon} alt={`${title} icon`} className="value-icon" />
          <h3 className="value-title">{title}</h3>

        </div>
        {/* Back side with the title and description */}
        <div className="value-card-back">
          <h3 className="value-title">{title}</h3>
          <p className="value-description">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ValueCard;
