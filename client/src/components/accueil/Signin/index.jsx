import React, { useState, useEffect } from 'react';
import Video from '../../../videos/video.mp4';
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FormInput,
  Container,
  FormWrap,
  Form,
  FormContent,
  FormH1,
  FormLabel,
  Icon,
  Text,
  FormButton,
  FormLinks,
  VideoBg,
  HeroBg,
} from './SigninElement';

const SignIn = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [verification, setVerification] = useState("");
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${appUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || `Erreur HTTP ! statut : ${response.status}`);
      }

      if (data.token) {
        Cookies.set("token", data.token);
        const role = data.role; // Assuming 'data.role' is a JSON string
        let redirectUrl;
        
        if (role === "SUPERADMIN"|| role === "ADMINPUB"||role === "ADMINCLIENT" || role === "ADMINDEMANDE") {
          redirectUrl = `/dashboard/${window.btoa(email)}`;
        } else if (role === "CLIENT" || role === "PUBLICITAIRE") {
          redirectUrl = `/dashboardClient/${window.btoa(email)}`;
        }  else {
          throw new Error("Rôle invalide");
        }
        
        window.location.href = redirectUrl;
      } else {
        throw new Error("Aucun jeton reçu");
      }
    } catch (error) {
      setError(error.message);
      setMessage(error.message);
      if (error.message.includes("vérifier votre email")) {
        setVerification(error.message);
        toast.info(error.message);
      } else {
        toast.error(error.message);
      }
    }
  };

 

  return (
    <Container>
      <FormWrap>
        <HeroBg>
          <Icon to="/">
            <img src="../../images/RemoteHub.png" height="60" alt="RemoteHub Logo" loading="lazy" />
          </Icon>
          <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
        </HeroBg>
        <FormContent>
          <Form onSubmit={handleSignIn}>
            <FormH1 style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Connectez-vous à votre compte</FormH1>
            <FormLabel htmlFor="email" style={{fontFamily: 'Constantia'}}>Email</FormLabel>
            <FormInput
              type="email"
              placeholder="Votre Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)} style={{fontFamily: 'Constantia'}}
            />
            <FormLabel htmlFor="password" style={{fontFamily: 'Constantia'}}>Mot de passe</FormLabel>
            <FormInput
              type="password"
              placeholder="Votre Mot de passe"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)} style={{fontFamily: 'Constantia'}}
            />
            
            <div>
              <FormButton type="submit" style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Connectez</FormButton>
              <ToastContainer />
            </div>
            <FormLinks to="/requestResetPassword" style={{fontFamily: 'Constantia'}}>Oublié mot de passe?</FormLinks>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default SignIn;
