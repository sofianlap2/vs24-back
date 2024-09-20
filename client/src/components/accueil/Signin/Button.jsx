import React from 'react';
import './login.css'
const Button = ({ text }) => {
  return (
    <div className="button-wrapper">
      <button className="submit-button">{text}</button>
      
    </div>
  );
};

export default Button;