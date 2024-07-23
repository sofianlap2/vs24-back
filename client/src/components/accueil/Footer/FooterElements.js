import styled from 'styled-components';
import {Link}  from "react-router-dom";
const currentLanguage = 'fr'; // Replace with your logic to get the language
 
export  const FooterContainer = styled.footer`
    background: #9e0000;
        margin-top: 50px;
 
        box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.3); /* Inversez l'ombre pour la mettre en haut */
   @media only screen and (max-width : 600px){
   max-width:auto;
   }
`;
export const FooterWrap = styled.div`
padding: 8px 4px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 1100%;
margin: 0 auto;
box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.3); /* Inversez l'ombre pour la mettre en haut */
 @media only screen and (max-width : 600px){
    margin-top: -50px;
 padding: 8px 50px;
 
 
    `;
export const FooterLinksContainer = styled.div`
    display:flex;
    justify-content: center;
    @media only screen and (max-width : 600px){
    padding-top: 32px;
 
    }
`;
export const FooterLinksWrapper= styled.div`
    display:flex;
    @media screen and (max-width : 820px) {
        flex-direction: column;
    }
`;
export const FooterLinkTitle = styled.h1`
font-size:14px;
margin-bottom:16px;
`;
export  const FooterLinkItems = styled.div`
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 16px;
    text-align: left;
    width: 160px;
    direction: ${currentLanguage === 'fr' ? 'auto' : 'ltr'}; // RTL for French if needed
 
    box-sizing: border-box;
    color: #fff;
    @media screen and (max-width : 420px) {
        width: 100px;
        margin: 0;
        padding: 10px;
    }
   
 
`;
export   const FooterLink = styled(Link)`
    color:#fff;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 14px;
 
    &:hover{
        color: #2a2559;
       transition:  0.3s ease-out;
 
    }
 
`;
export const SocialMedia=styled.section`
display: flex;
  margin-top: 59px;
  width: 100%;
  max-width: 1038px;
  gap: 20px;
  font-size: 16px;
  font-weight: 400;
  justify-content: space-between;
  @media only screen and (max-width : 600px){
    margin-top: -12px;
    height: 250px;
    padding-bottom: -170px ;
}
`;
export  const SocialMediaWrap=styled.div`
 
    display: flex;
  margin-bottom: 22px;
  width: 100%;
  max-width: 1038px;
  gap: 20px;
  font-size: 16px;
  font-weight: 400;
  justify-content: space-between;
 
 
}
    `;
    export  const SocialLogo=styled(Link)`
        color: #fff;
        justify-self: start;
        cursor: pointer;
        text-decoration: none;
        font-size: 1.5rem;
        display: flex;
        margin-top: auto;
        align-items: center;
        margin-bottom: 16px;
        font-weight: bold;
    `;
    export  const WebsiteRights = styled.small`
         color: #000;
  font-family: Constantia, sans-serif;
    `;
    export const SocialIcons=styled.div`
       display: flex;
  width: 100%;
  max-width: 1438px;
  gap: 150px;
  font-size: 16px;
  font-weight: 400;
  justify-content: space-between;
   max-width: 100%;
    flex-wrap: wrap;
    margin-top: 10px;
    @media only screen and (max-width : 600px){
        height: 0%;
}
    `;
    export const SocialIcons1=styled.div`
  color: rgba(210, 199, 200, 0.5);
  font-family: Constantia, sans-serif;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
    white-space: nowrap;
  @media only screen and (max-width : 600px){
        height: 100%;
                    margin-bottom:20px
           
 
}
`;
export const Num=styled.div`
    color: #ffffff;
 font-family: Constantia, sans-serif;
    margin-top: 0; // Supprimer l'espace entre les éléments
    white-space: nowrap;
 
`;
    export  const SocialIconLink=styled.a`
     color: #ffffff;
  font-family: Constantia, sans-serif;
  margin-top: 0; // Supprimer l'espace entre les éléments
 text-decoration: none; // Supprimer le soulignement par défaut des liens
  white-space: normal;
 
  &:hover {
    color: #8fd1e3; // Couleur du texte au survol (facultatif)
  }
    }
    @media only screen and (max-width : 600px){
            font-size: calc(10px + 1vw); /* Ajuster la taille de la police pour les petits écrans */
            margin-bottom:20px
}
    `;
    export  const Linkedin=styled.a`
     color: #ffffff;
  font-family: Constantia, sans-serif;
  margin-top: 0; // Supprimer l'espace entre les éléments
 text-decoration: none; // Supprimer le soulignement par défaut des liens
  white-space: nowrap;
 
  &:hover {
    color: #8fd1e3; // Couleur du texte au survol (facultatif)
  }
   
    @media only screen and (max-width : 600px){
          flex-wrap: wrap; /* Permet à chaque ligne de s'enrouler */
 
}
    `;