import React, { useState } from "react";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  
  ArrowForward,
  ArrowRight,
} from "./HeroElements";
import Video from "../../../videos/Bochra.mp4";
import { Button } from "../ButtonElement";
import { Trans } from "react-i18next";
import DemandeClients from "../../admin/demande/demandeClients";
import { Margin } from "@mui/icons-material";
// import rr from "../../../images/cc.png"

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <>
      <HeroContainer id="home">
        <HeroBg>
          <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
        </HeroBg>
      
          <HeroContent>
           
            <HeroH1>EMBRACE THE FUTURE: AUTOMATE YOUR SERVICES</HeroH1>
            <HeroP>Sign up for new account</HeroP>
            
          </HeroContent>
         
          {/* <img src={rr} alt="rr" style={{ width: '100%',marginBottom:'-80vh',height: 'auto' ,zIndex:6,position:'absolute'}} /> */}

      </HeroContainer>

    </>
  );
};

export default HeroSection;
