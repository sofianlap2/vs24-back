import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Newsletter() {
  const [emailNewsletter, setEmailNewsletter] = useState('');
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch(`${appUrl}/newsletters/addNewsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailNewsletter }),
    })
      .then((response) => {
        return response.json().then((data) => {
          if (response.ok) {
            toast.success(data.message );  
            setEmailNewsletter('');  // Clear the input after success

          } else {
            toast.error(data.message);
            setEmailNewsletter('');  // Clear the input after success

          }
        });
      })
      .catch((error) => {
        toast.error('An error occurred. Please try again later.');
        setEmailNewsletter('');  // Clear the input after success

      });
  };
  

  return (
    <div>
      <h2 className="newsletter-title">Ne manquez rien avec notre newsletter !</h2>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="you@example.com"
          aria-label="Email address for newsletter"
          className="newsletter-input"
          value={emailNewsletter}
          onChange={(e) => setEmailNewsletter(e.target.value)}
        />
        <button type="submit" className="newsletter-submit">Subscribe</button>
      </form>
      <p className="newsletter-description">
        Abonnez-vous à notre newsletter pour accéder à des avantages exclusifs et être le premier à découvrir nos nouveaux produits, offres spéciales et actualités passionnantes.
      </p>
      <ToastContainer />
    </div>
  );
}

export default Newsletter;
