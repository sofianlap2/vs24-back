import React from 'react';
import { InfoContainer, InfoWrapper, InfoRow, Column1, Column2, ImgWrap, Img, Heading, TopLine, Subtitle, BtnWrap, TextWrapper, Vid } from './InfoElement';
import { Button } from '../ButtonElement';
import { Trans } from 'react-i18next'




const InfoSection = ({ lightBg, id, imgStart, topLine, lightText, darkText, headline, description, buttonLabel, img, alt, primary, dark, dark2, video, iframeSrc }) => {
  return (
    <>
      <InfoContainer lightBg={lightBg} id={id}>
        
            <Trans>

        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine style={{ fontFamily: 'Constantia', fontWeight: 'bold' }}>{topLine}</TopLine>
                <Heading lightText={lightText} style={{ fontFamily: 'Constantia', fontWeight: 'bold' }}>{headline}</Heading>
                <Subtitle darkText={darkText} style={{ fontFamily: 'Constantia', fontWeight: 'bold', fontStyle: 'italic' }}>{description}</Subtitle>
              
              </TextWrapper>
            </Column1>
            <Column2 className='col-md-6'>
              <ImgWrap>
                {video ? (
                  <Vid autoPlay loop muted src={video}>
                    
                  </Vid>
                ) : (
                  <Img src={img} alt={alt} />
                 
                )
                }
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
        </Trans>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
