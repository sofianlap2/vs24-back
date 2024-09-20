import React from 'react';
import './login.css';

const InputField = ({ label, type, placeholder, value, onChange }) => {
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

export default InputField;
