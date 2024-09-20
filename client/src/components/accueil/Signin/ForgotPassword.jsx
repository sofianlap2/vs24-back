import React from 'react';
import './login.css'
const ForgotPassword = () => {
  return (
    <div className="forgot-password-wrapper">
      <a href="/requestResetPassword" className="forgot-password-link" style={{ textDecoration: 'none' }}>
        Forgot password?
      </a>
      
    </div>
  );
};

export default ForgotPassword;
