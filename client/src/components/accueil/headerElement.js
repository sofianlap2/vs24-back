// NavbarElement.js
import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";
 
export const Nav = styled.nav`
  background: ${({ scrollNav }) => (scrollNav ? "#000" : "#fff")};
  height: 80px;
  display: flex;
  padding:50px
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%; /* Remplacer "auto" par "100%" */
 
  @media only screen and (max-width: 975px) {
    transition: 0.6s all ease;
  max-width: auto; /* Remplacer "auto" par "100%" */
 
  }
 
  box-shadow: 1px 2px 4px rgba(0, 1, 0, 0.3); /* Ajout de l'ombre en bas */
`;
 
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  z-index: 1;
  width: 100%;
  padding: 8 0;
  max-width: 100%;
  margin-right: 10px;
  margin-left: 30px;
  @media only screen and (max-width: 975px) {
    margin-left: 10px;
  }
`;
export const NavLogo = styled(LinkR)`
  border-radius: 50px;
  justify-self: flex-start;
  cursor: pointer;
  display:flex;
  font-size: 1rem;
  align-items:center;
  margin-left:20px;
  font-weight:bold;
  text-decoration: none;
 
`;
 
export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 975px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 80%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #00000;
    margin-top: -20px;
    margin-right: 20px;
  }
`;
 
export const NavMenu = styled.ul`
   display: flex;
    list-style: none;
    gap: 1rem;
    margin-left: auto;
    margin-top: 1vh;
`;
 
export const NavItem = styled.li`
 text-decoration: none;
    color: #fff;
      @media screen and (max-width: 975px) {
    display: none;
  }
`;
export const NavDropDown = styled.li`
 display: flex; /* Masqué par défaut */
 
  @media screen and (max-width: 975px) {
    display: none; /* Affiché sur les écrans mobiles */
}
`;
 
export const NavLinks = styled(LinkS)`
  text-decoration: none;
    color: #fff;
  
  &:hover {
    color: #00bfa6;
    transition: 0.3s ease-out;
  }

`;
 
export const NavBtn = styled.nav`
  margin-top: 20px;
 
  @media screen and (max-width: 975px) {
    display: none;
  }
`;
 
export const NavBtnLink = styled(LinkR)`
  border-radius: 6.111px;
  box-shadow: 0px 4.889px 4.889px 0px rgba(0, 0, 0, 0.25);
  background-color: #9e0000;
 
  padding: 6px 13px;
  font: 12px ;
  text-decoration: none; // Supprimer le soulignement par défaut des liens
  color: #ffff; // Définir la couleur du texte
  align-items: center;
  white-space: nowrap; // Empêcher le retour à la ligne
  &:hover {
    background-color: #0000; // Couleur de fond au survol
    color: #9e0000; // Couleur du texte au survol
  }
  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -60px;
  }
`;
const DropdownContent = styled.div`
  display: ${(props) => (props.dropdownOpen ? "block" : "none")};
  position: absolute;
  top: 2.5em;
  background: white;
  border-radius: 5px;
  z-index: 1;
  min-width: 160px;
`;
 
const DropdownItem = styled.li`
  list-style: none;
  padding: 10px;
  cursor: pointer;
  font-weight: 500;
  background: transparent;
  border: none;
  color: ${(props) => (props.scrollNav ? "#fff" : "#000")};
  &:hover {
    background: #f1f1f1;
  }
`;
 