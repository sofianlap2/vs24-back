import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    min-height: 692px;
    position: relative;
    color: #2a2559;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    // overflow: hidden;
    background: linear-gradient(180deg, rgba(1,174,86,1) 0%, rgba(10,201,122,1) 100%);
    background-attachment: fixed;
`;

export const FormWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    @media screen and (max-width: 400px){
        height: 80%
    }
`;
export const  Icon = styled(Link)`
    margin-left: 32px;
    text-decoration: none;
    font-size: 38px;
    font-weight: 700;
    
    @media screen and (max-width: 480px) {
        margin-left: 16px;
        margin-top: 8px;
    }

`;

export const FormContent = styled.div`
background: #000;
    height:100%;
    display: flex;
    // margin-top: 50px;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 100%) {
        padding: 10px;
        }
`;
export const Form = styled.form`

  background: #000;
  max-width: 400px;
  border-radius: 4px;
  background: #010101;  // Fix the typo here
  height: auto;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  margin-top: 175px;
  padding: 60px 60px;
  box-shadow: 0 1px px rgba(0, 0, 0, 0.9);

  @media only screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;
export const FormH1 = styled.h1`
            color: #fff;
            font-size:  20px;
            font weight: 400;
            text-align: center;
`;
export  const FormLabel = styled.label `
margin-bottom: 8px;
margin-top: 10px;

font-size:  14px;
color: #fff;
`;
export const FormInput = styled.input `
padding : 10px 9px;
margin-bottom: 10px;
border: none;
border-radius: 4px;
display: flex; /* Add display: flex */
  justify-content: space-between; /* Align icons to the right */
`;
export const IconPassword = styled.div `
position:absolute;
color:grey;
margin-top:483px;
right:15.9cm;
z-index: 1;
cursor:pointer;
@media screen and (max-width: 768px) {
    left: 300px; /* Center align the icon horizontally */
    bottom: 243px; /* Adjust the position from the bottom */
   transform: translateX(50%); /* Center align the icon horizontally */  }

`;
export const IconConfirmPassword = styled.div `
position:absolute;
color:grey;
margin-top:567px;
right:15.9cm;
z-index: 1;
cursor:pointer;
@media screen and (max-width: 768px) {
    left: 300px; /* Center align the icon horizontally */
    bottom: 157px; /* Adjust the position from the bottom */
   transform: translateX(50%); /* Center align the icon horizontally */
  }

`;
export const FormButton = styled.button`
  background: #8fd1e3;
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  display: block; // Ensure the button is a block element
  width: 100%; // Ensure the button takes the full width of its container

  &:hover {
    background: #76b8c8; // Add a background color change on hover for better UX
    color: #2a2559;
    transition: 0.3s ease-out;
  }
`;
export const Text = styled.span`
            text-align: center;
            margin-top: 24px;
            color: #fff;
            font-size: 14px;
`;
export const FormLinks= styled(Link)`
    text-decoration: underline;
    white-space: nowrap;
    padding: 10px  22px;
    text-align:center;
    font-size: 16px;
    color: #8fd1e3;
    &:hover{
        color: #2a2559;
       transition:  0.3s ease-out;

    }

  
    `;
export   const VideoBg = styled.video`
    width: 100vw;
    height: 100vh;
    margin-top: 3vh;
    -o-object-fit: cover;
       object-fit: cover;
       background: #232323;
`;
export const HeroBg = styled.div`
  position: absolute;
  height:100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  z-index: 0;  /* Set z-index to 2 */
`;
