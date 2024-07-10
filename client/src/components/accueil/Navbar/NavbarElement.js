// NavbarElement.js
import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';

export const Nav= styled.nav`
  background:${({scrollNav})=>(scrollNav ? '#000':'#fff')};
  height: 100px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px)  {
    transition: 0.6s all ease;
  }
  
`;

export const NavbarContainer = styled.div `
  display:flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 0;
  max-width: 1100px;
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

    display:none;
    @media screen and (max-width: 1225px){
        display:block;   
        position: absolute;
        top:0;
        right:0;
        transform :translate(-100%,60%);
        font-size: 1.8rem;
        cursor   :pointer;
        color: #fff;
    }
    
`;

export const NavMenu = styled.ul `
  display:flex;  
  align-items: center;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 1225px) {
    display:none;
    widhth: 50vw;
  }

`;

export  const NavItem = styled.li `
  height: 70px;

`;
export const NavDropDown=styled.li`
display: inline-flex;
margin-left:100px;

  @media screen and (max-width: 768px){
    display:inline-flex;
  }
`;

export const NavLinks = styled(LinkS)`
  color: ${({ scrollNav }) => (scrollNav ? '#fff' : '#000')};
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-top:8px;
  padding: 0 1.3rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 4px solid #8fd1e3;
  }
  &:hover{
    color: #8fd1e3;
    transition:  0.3s ease-out;
  }
`;

export const NavBtn = styled.nav`
  display: inline-flex;
  align-items: center;
  margin-left: 80px;
  margin-top:20px;

  @media screen and (max-width: 768px){
    display:none;
  }
`;

export const NavBtnLink= styled(LinkR)`
  border-radius: 50px;
  background: #8fd1e3;
  white-space: nowrap;
  padding: 10px  22px;
  font-size: 16px;
  color: #010606;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background:#fff;
    color:#010606;
  }
`;
