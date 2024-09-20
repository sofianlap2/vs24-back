import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './changePW.css';
import SubmitButton from './SubmitButton ';
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${appUrl}/reset/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
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
      .catch((error) => {
        toast.error('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="body">
      <main>
    <form className="password-reset-form" onSubmit={handleSubmit}>
      <img
        loading="lazy"
        src='../../../../public/images/Subtract.svg'
        className="logo"
        alt="Company logo"
      />
      <h1 className="form-title">Demande de réinitialisation du mot de passe</h1>
      <div>
        <label htmlFor="password" className='input-label'>Nouveau mot de passe:</label>
        <input
          type="password"
          id="password"
          name="password"
          className='input-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className='input-label'>Confirmer le mot de passe:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className='input-control'

          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
        />
      </div>
      <SubmitButton text="Submit" />      <ToastContainer />
   
    </form>
    </main>
    </div>
  );
};

export default ResetPassword;
