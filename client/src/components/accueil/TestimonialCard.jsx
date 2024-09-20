import React from 'react';

function TestimonialCard({ content, avatar, name, role, rating }) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-content">{content}</p>
      <div className="testimonial-author">
        <img src={avatar} alt={`${name}'s avatar`} className="author-avatar" />
        <div className="author-info">
          <p className="author-name">{name}</p>
          <p className="author-role">{role}</p>
        </div>
      </div>
      <div className="testimonial-rating">
        {[...Array(rating)].map((_, i) => (
          <img key={i} src="../../../public/images/Vector.svg" alt="" className="star-icon" />
        ))}
      </div>
    </div>
  );
}

export default TestimonialCard;