import React from "react";
import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  Column2,
  ImgWrap,
  Img,
  Heading,
  TopLine,
  Subtitle,
  BtnWrap,
  TextWrapper,
  Vid,
  VideoBg,
  
} from "./InfoElement";
import { Button } from "../ButtonElement";
import Video from "../../../videos/sectionBg.mp4";
const InfoSection = ({
  lightBg,
  id,
  imgStart,
  topLine,
  lightText,
  darkText,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  primary,
  dark,
  dark2,
  video,
  iframeSrc,
}) => {
  return (
    <>
    
      <InfoContainer lightBg={lightBg} id={id}>
      
      
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />

        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1 className="col-md-6">
              <ImgWrap>{img ? <Img src={img} alt={alt} /> : null}</ImgWrap>
            </Column1>
            <Column2>
              <TextWrapper>
                <TopLine
                  style={{ fontFamily: "Constantia", fontWeight: "bold" }}
                >
                  {topLine}
                </TopLine>
                <Heading
                  lightText={lightText}
                  style={{ fontFamily: "Constantia", fontWeight: "bold" }}
                >
                  {headline}
                </Heading>
                <Subtitle
                  darkText={darkText}
                  style={{ fontFamily: "Constantia" }}
                >
                  {description}
                </Subtitle>
              </TextWrapper>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
