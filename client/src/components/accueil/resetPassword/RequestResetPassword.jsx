import { useState } from "react";
import { Link } from "react-router-dom";
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
function RequestResetPassword() {
  const [email, setEmail] = useState("");
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch(`${appUrl}/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            toast.success(data.message);
            setTimeout(() => {
              window.location.href = "/";
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
                <FormLabel htmlFor="email" style={{fontFamily: 'Constantia'}}>Email:</FormLabel>
                <FormInput style={{fontFamily: 'Constantia'}}
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <FormButton type="submit" style={{fontFamily: 'Constantia',fontWeight:"bold"}}>
                Demander la réinitialisation du mot de passe
              </FormButton>
            </Form>
            
            
         </FormContent>
      </FormWrap>
      </Container>
  );
}

export default RequestResetPassword;
