import { useState } from "react";
import { useParams } from "react-router-dom";
import Video from '../../../videos/video.mp4';

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
} from './requestChangePwElement';
import { ToastContainer, toast } from "react-toastify";
function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${appUrl}/reset/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          toast.success(data.message);
          setTimeout(() => {
            window.location.href = "/signin";
            }, 5000);
        });
      } else {
        return response.json().then((data) => {
          toast.error(data.message);
        });
      }
    })
    .catch((error) => {
      toast.error("An error occurred. Please try again later.");
    });
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
          
          <Form onSubmit={handleSubmit}>
            <ToastContainer/>
          <FormH1 style={{fontFamily: 'Constantia'}}>Demande de réinitialisation du mot de passe</FormH1>
            <div>
              <FormLabel htmlFor="password" style={{fontFamily: 'Constantia'}}>Nouveau mot de passe:</FormLabel>
              <FormInput style={{fontFamily: 'Constantia'}}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <FormLabel htmlFor="confirmPassword" style={{fontFamily: 'Constantia'}}>
                Confirmer le mot de passe:
              </FormLabel>
              <FormInput style={{fontFamily: 'Constantia'}}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <br></br>
            <FormButton type="submit" style={{fontFamily: 'Constantia',fontWeight:"bold"}}>Réinitialiser le mot de passe</FormButton>
            </Form>
            
            
         </FormContent>
      </FormWrap>
      </Container>
  );
}

export default ResetPassword;
