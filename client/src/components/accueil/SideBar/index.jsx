import React from 'react';
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarLink,
  SidebarMenu,
  SideBtnWrap,
  SidebarRoute
} from './SidebarElements';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
     
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to='Home' onClick={toggle}>Accueil</SidebarLink>
          <SidebarLink to='services' onClick={toggle}>Services</SidebarLink>
          <SidebarLink to='products' onClick={toggle}>Produits</SidebarLink>

          <SidebarLink to='valeurs' onClick={toggle}>Valeurs</SidebarLink>
          <SidebarLink to='testimonials' onClick={toggle}>Témoignages</SidebarLink>
          <SidebarLink to='FAQ' onClick={toggle}>FAQ</SidebarLink>
          <SidebarLink to='map' onClick={toggle}>Emplacement</SidebarLink>

          <SidebarLink to='contact' onClick={toggle}>Contact</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to='/signin'>Se Connecter</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
