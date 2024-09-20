import React from 'react';
import './changePW.css'

const SubmitButton = ({ text }) => {
  return (
    <div className="button-wrapper">
      <button type="submit" className="submit-button">{text}</button>
      
    </div>
  );
};

export default SubmitButton;