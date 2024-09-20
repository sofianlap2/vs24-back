import styled from "styled-components";
import {FaTimes} from  'react-icons/fa';
import {Link as LinkS} from  'react-scroll';
import {Link as LinkR} from 'react-router-dom';
 
 
 
export const SidebarContainer = styled.aside`
position: fixed;
z-index: 999;
width: 100%;
height: 100% ;
background : #0d0d0d;
display: grid;
aligne-items: center;
top: 10vh;
left: 0;
transition: 0.3s ease-in-out;
opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`;
export  const NavItem = styled.li `
  height: 70px;
  direction: rtl;
 
`;
export const CloseIcon = styled(FaTimes)`
color: #fff;
&:hover{
    transition: all   0.2s ease-in-out;
    color: #8fd1e3;
`;
export const Icon = styled.div`
 position: absolute;
 top: 1.2rem;
 right: 1.5rem;
 background: transparent;
 cursor: pointer;
 font-size: 2rem;
outline: none;
`;
export  const SidebarWrapper = styled.div`
color:  #fff;
margin-top: 70px;
`;
export const SidebarMenu = styled.ul`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: repeat(6, 80px);
direction: rtl;
margin-top: 5vh;
 
@media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
 }
`;
export const SidebarLink = styled(LinkS)`
display: flex;
align-items: center;
justify-content: center;
font-size: 1.5rem;
text-decoration: none;
life-style:none;
transition: 0.2s ease-in-out ;
color:  #fff;
text-decoration: none;
cursor:pointer;
&:hover {
    background-color: #0000; // Couleur de fond au survol
    color: #00bfa6; // Couleur du texte au survol

  }
 
`;
export const SideBtnWrap = styled.nav`
    display:flex;
    justify-content:center;
   
  }
 
`;
export const SidebarRoute = styled(LinkR)`
border-radius: 6.111px;
  box-shadow: 0px 4.889px 4.889px 0px rgba(0, 0, 0, 0.25);
    background: linear-gradient(135deg, #1E5F75, #40E0D0);
 
  padding: 6px 13px;
  font: 12px ;
  text-decoration: none; // Supprimer le soulignement par défaut des liens
  color: #ffff; // Définir la couleur du texte
  align-items: center;
  cursor: pointer;
  text-align: center;
  white-space: nowrap; // Empêcher le retour à la ligne
  display: block; // Ensure the button is a block element
  &:hover {
    background-color: #fff; // Couleur de fond au survol
    color: #9e0000; // Couleur du texte au survol
  }
`;
export const SidebarLi = styled.li`
    white-space: nowrap;
        padding: 16px 64px;
        font-size: 16px;
        text-decoration: none;
        color: #000;
        transition: all  0.2s ease-in-out;
        cursor: pointer;
        outline: none;
        &:hover{
            transition: all   0.2s ease-in-out;
            background: #fff;
`;
export const NavDropDown = styled.li`
 display: flex; /* Masqué par défaut */
 align-items: center;
justify-content: center;
 
 
`;
export const StyledButton = styled.button`
  background: transparent;
  border: none;
  color: #000;
  font-weight: 500;
  text-align: center;
 
  &:hover {
    background-color: #f0f0f0; /* Changez cette couleur selon vos besoins */
    color: #333;
  }
`;