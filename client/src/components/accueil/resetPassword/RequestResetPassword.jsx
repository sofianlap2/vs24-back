import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton ';
import './changePW.css';
import { useMediaQuery, useTheme } from "@mui/material";
import img from '../../../../public/images/Subtract.svg'
const RequestResetPassword = () => {
  const [email, setEmail] = useState('');
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${appUrl}/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            toast.success(data.message);
            setTimeout(() => {
              window.location.href = '/';
            }, 5000);
          });
        } else {
          return response.json().then((data) => {
            toast.error(data.message);
          });
        }
      })
      .catch(() => {
        toast.error('An error occurred. Please try again later.');
      });
  };
  const handleBackClick = () => {
    window.history.back(); // Navigate back to the previous page
  };
  return (
    <form className="password-reset-form" onSubmit={handleSubmit}>
        {isMobile && (
        <div className="back-arrow" onClick={handleBackClick}>
          &#8592;
        </div>
      )}
              <div className="triangle"></div>

      <img
        loading="lazy"
        src={img}
        className="logo"
        alt="Company logo"
      />
      <h1 className="form-title">Request Password Reset</h1>
      <FormInput
        label="Email"
        type="email"
        id="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <SubmitButton text="Submit" />
      <br/>
      <ToastContainer />
    </form>
  );
};

export default RequestResetPassword;
