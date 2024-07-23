import styled from "styled-components";

const currentLanguage = 'fr'; // Assuming you have a way to determine the current language

const getDirection = (lang) => {
  return lang === 'ar' ? 'rtl' : 'ltr'; // Dynamic direction based on language
};

export const MapContainer = styled.div`
  color: #fff;
  width: 90vw;
  justify-content: center;
  align-items: center;
  background: ${({ lightBg }) => (lightBg ? '#fff' : '#010606')};
  padding: 50px 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 50px 0px;
  }
`;

export const MapWrapper = styled.div`
  display: grid;
  z-index: 1;
  max-width: 1100px;
  width: 80vw;
  margin: 0 auto;
  padding: 0 24px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
    width:50vw;
  }
  @media screen and (max-width: 380px) {
    justify-content: center;
    align-items: center;
    width:40vw;
  }
`;

export const MapRow = styled.div`
display: grid;
justify-content: center;
align-items: center;
text-align:center;
paddig: 0 15px;
  grid-template-areas: ${({ imgStart }) => (imgStart ? `'col2 col1'` : `'col1 col2'`)};

  @media screen and (max-width: 830px) {
    grid-template-areas: ${({ imgStart }) => (imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`)};
    width:90vw;
    justify-content: center;
    grid-auto-columns: minmax(auto, 1fr 1fr);
text-align:center;
    align-items: center;

  }
  @media screen and (max-width: 915px) {
    grid-template-areas: ${({ imgStart }) => (imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`)};
    width:100vw;
    justify-content: center;
    grid-auto-columns: minmax(1fr 1fr ,1fr 1fr);
text-align:center;
    align-items: center;

  }
  @media screen and (max-width: 380px) {
    grid-template-areas: ${({ imgStart }) => (imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`)};
    width:100vw;
    justify-content: center;
    grid-auto-columns: minmax(auto,1fr 1fr);

    align-items: center;

  }
`;

export const Column1 = styled.div`
  grid-area: col1;
 
  justify-content: center;
  @media screen and (max-width: 830px){
    justify-content: center;
    align-items: center;
  text-align:center;

  }
  @media screen and (max-width: 378px){
    align-items: center;
    width: 100vw;
    display:flex;


}

@media screen and (max-width: 915px){
  justify-content: center;
  align-items: center;
text-align:center;
display:flex;
}


`;

export const Column2 = styled.div`
grid-area: col2;
justify-content: center;
height:40hw;

@media screen and (max-width: 830px){
  justify-content: center;
  align-items: center;
text-align:center;
}
@media screen and (max-width: 378px){
  align-items: center;
  justify-content: center;
text-align:center;
display:flex;
height:40hw;
widhth:50vw;

}
@media screen and (max-width: 415px){
  align-items: center;
  justify-content: center;
text-align:center;
widhth:40vw;
}
@media screen and (max-width: 1030px){
  align-items: center;
  justify-content: center;
text-align:center;
widhth:90%;
height:50hw;
}
`;

export const Iframe = styled.iframe`
  width: 40vw;
  height: 50vh;
  object-fit: cover;
  border-radius: 20px;

  @media screen and (max-width: 821px) {
    height: 40vh;
    width:60vw;
    
  }
  @media screen and (max-width: 1025px) {
    height: 30vh;
    width:50vw;
    
  }
`;

export const MapRowP = styled.div`
  display: flex;
  justify-content: center;
  padding:auto;
width:50vw;
  animation: slideLeft 10s linear infinite; /* Adjust duration as needed */
  @keyframes slideLeft {
    from {
      transform: translateX(10vw); /* Start from 0vw (left edge) */
    }
    to {
      transform: translateX(53vw); /* End at 100vw (right edge) */
    }
  }
  @media screen and (max-width: 413px) {
    animation: slideLeft 10s linear infinite;
    display:flex;
    width:40vw;
   
  }
  @media screen and (max-width: 821px) {
    animation: slideLeft 10s linear infinite;
    width: 40vw;
    display:flex;

  }
  @media screen and (max-width: 380px) {
    animation: slideLeft 10s linear infinite;
    width: 50vw;
    display:flex;

  }
`;


export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  padding: 10px;
  line-height: 24px;
  justify-content: center;
  align-items: center;
  text-align: center;

    color: ${({ darkText }) => (darkText ? '#010606' : '#fff')};
  @media screen and (max-width: 821px){
  align-items: center;
  }
  @media screen and (max-width: 378px){
    align-items: center;
    width: 100vw;
    padding: 30px;

}
`;

export const MapH1 = styled.h1`
  font-size: 1.5rem;
  color: #000;
  // direction: rtl;
  width: 100vw;
  justify-content: center;
  align-items: center;
  text-align: center; /* Center-align the text */
  
  @media screen and (max-width: 830px) {
    font-size: 1.5rem;
    justify-content: center;
    width: 100vw;
    align-items: center;
    text-align: center; /* Center-align the text */
  }
`;

export const ImgWrap = styled.div`
  max-width: 100%;
  width:40vw;
  height: 100%;
  @media screen and (max-width: 960px){
    width:80vw;
  }
`;

export const TextWrapperMap = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
  direction: ${getDirection(currentLanguage)};
`;

export const PartnerImage = styled.img`
  margin-right: 10px;
  width: 100px;
  height: auto;

  @media screen and (max-width: 768px) {
    width: 30vw;
  }
`;
