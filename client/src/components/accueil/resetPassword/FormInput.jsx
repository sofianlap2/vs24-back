import React from 'react';
import './changePW.css'
const FormInput = ({ label, type, id, placeholder, value, onChange }) => {
  return (
    <div className="input-field">
      <label htmlFor={`${label.toLowerCase()}Input`} className="input-label">{label}</label>
      <input 
        type={type} 
        id={`${label.toLowerCase()}Input`}
        className="input-control" 
        placeholder={placeholder}
        value={value}  // Ensure value is controlled
        onChange={onChange}  // Ensure onChange is set
        aria-label={label}
      />
      
    </div>
  );
};

export default FormInput;