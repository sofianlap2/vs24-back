import styled from "styled-components";
// Assuming you have a way to determine the current language (e.g., 'en' for English, 'fr' for French, 'ar' for Arabic)
const currentLanguage = 'fr'; // Replace with your logic to get the language

const getDirection = (lang) => {
  return lang === 'ar' ? 'rtl' : 'ltr'; // Dynamic direction based on language
};
export const InfoContainer = styled.div`
  color: #fff;
  display: flex;

  background: ${({ lightBg, video }) =>
    video ? `url(${video}) no-repeat center center/cover` : (lightBg ? '#fff' : '#010606')};
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;


 export const InfoWrapper = styled.div`
    display: grid;
    z-index: 1;
    height: 860px;
    max-width: 1100px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding: 0 24px;
    align-items: center;
    justify-content: center;
    `;

 export const InfoRow = styled.div`
    display: grid;
    width: 100%;
    grid-auto-columns: minmax(auto,1fr);
    align-items: center;
    grid-template-areas:${({imgStart})=>(imgStart ? `'col2 col1'`:`'col1 col2'`)};
    @media screen and (max-width: 768px){
        grid-template-areas: ${({imgStart})=>(imgStart ? `'col1' 'col2'`:`'col1 col1' 'col2 col2'`)};
    }
 `;
 export const Column1= styled.div`
        margin-buttom: 15px;
        padding: 0 15px;
        grid-area: col1;
 `;
 export const Column2= styled.div`
 margin-buttom: 15px;
 width: 100%;
 padding: 0 15px;
 grid-area: col2;
`;
export const TextWrapper = styled.div`
        max-width: 540px;
        padding-top: 0 ;
        padding-buttom: 60px;
        direction: ${getDirection(currentLanguage)}; // Conditional direction
        `;
export const TopLine = styled.p`
        color: #0070ad;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 1.4px;
        margin-bottom: 16px ;
        text-transform: uppercase;

`;
export const Heading = styled.h1`
    // color:#fff;
    margin-bottom: 24px ;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({lightText})=>( lightText ? '#f7f8fa':'#010606')};
    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`;
export const Subtitle = styled.p`
    //color:#000;
    max-width: 440px;
    margin-bottom: 35px ;
    font-size: 18px;
    line-height: 24px;
    color: ${({darkText})=>(darkText? '#010606':'#fff')};
`;
export const BtnWrap = styled.div`
    display: flex;
    justify-content: flex-start;
`;
export const ImgWrap = styled.div`
    max-width: 555px;
    height: 100%;

`;
export  const Img = styled.img`
    width: 100%;
    margin: 0 0 10px 0;
`;
export  const Vid = styled.video`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
       object-fit: cover;
       border-radius:  20px;

    margin: 0 0 0 0;
`;
