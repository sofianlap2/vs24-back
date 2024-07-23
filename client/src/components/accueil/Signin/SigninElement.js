import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  min-height: 692px;
  position: fixed;
  color: #9e0000;

  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  // overflow: hidden;

`;

export const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  @media screen and (max-width: 400px){
    height: 100%
        display: block;

  }
`;

export const Icon = styled(Link)`
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
  height: 100%;
  display: flex;
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
  background: #010101;
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
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  margin-top: 10px;
  font-size: 14px;
  color: #fff;
`;

export const FormInput = styled.input`
  padding: 10px 9px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
`;

export const IconPassword = styled.div`
  position: absolute;
  color: grey;
  margin-top: 483px;
  right: 15.9cm;
  z-index: 1;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    left: 300px;
    bottom: 243px;
    transform: translateX(50%);
  }
`;

export const IconConfirmPassword = styled.div`
  position: absolute;
  color: grey;
  margin-top: 567px;
  right: 15.9cm;
  z-index: 1;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    left: 300px;
    bottom: 157px;
    transform: translateX(50%);
  }
`;

export const NavBtn = styled.nav`
  margin-top: 20px;
`;

export const FormButton = styled.button`
  border-radius: 6.111px;
  box-shadow: 0px 4.889px 4.889px 0px rgba(0, 0, 0, 0.25);
  background-color: #9e0000;
  padding: 6px 13px;
  font: 12px Constantia, sans-serif;
  text-decoration: none;
  color: #ffff;
  align-items: center;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  display: block;
  width: 100%;
  
  &:hover,
  &:focus,
  &:active {
    background-color: #fff;
    color: #9e0000;
  }
`;

export const Text = styled.span`
  text-align: center;
  margin-top: 24px;
  color: #fff;
  font-size: 14px;
`;

export const FormLinks = styled(Link)`
  text-decoration: underline;
  white-space: nowrap;
  padding: 10px 22px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  &:hover,
  &:focus,
  &:active {
    color: #9e0000;
    transition: 0.3s ease-out;
  }
`;

export const VideoBg = styled.video`
  width: 100vw;
  height: 100vh;
  margin-top: 3vh;
  -o-object-fit: cover;
  object-fit: cover;
  background: #000;
  @media screen and (max-width:975px){
  width: 100vw;
  height: 100vh;
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  z-index: 0;
`;
