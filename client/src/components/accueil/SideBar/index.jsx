import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarLink,
  SidebarMenu,
  SideBtnWrap,
  SidebarRoute,
  SidebarLi // Added SidebarLi styled component
} from './SidebarElements';


const Sidebar = ({ isOpen, toggle, setShowDemandeClients, setShowDemandePubs }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (option) => {
    if (option === 'Client') {
      setShowDemandeClients(true);
    } else if (option === 'Publicitaire') {
      setShowDemandePubs(true);
    }
    setDropdownOpen(false); // Close dropdown after selection
    toggle(); // Close the sidebar
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
              <SidebarLink style={{fontFamily: 'Constantia'}} to='about' onClick={toggle}>À propos</SidebarLink>
              <SidebarLink style={{fontFamily: 'Constantia'}} to='valeurs' onClick={toggle}>Valeurs</SidebarLink>
              <SidebarLink style={{fontFamily: 'Constantia'}} to='produits' onClick={toggle}>Produits</SidebarLink>
              <SidebarLink style={{fontFamily: 'Constantia'}} to='temoineages' onClick={toggle}>Témoinéages</SidebarLink>
              <SidebarLink style={{fontFamily: 'Constantia'}} to='map' onClick={toggle}>Carte</SidebarLink>
              <SidebarLink style={{fontFamily: 'Constantia'}} to='actualite' onClick={toggle}>Actualité</SidebarLink>
            </SidebarMenu>
           
            <SideBtnWrap>
              <SidebarRoute style={{fontFamily: 'Constantia',fontWeight: 'bold'}} to='/signin'>Se Connecter</SidebarRoute>
            </SideBtnWrap>
           
        </SidebarWrapper>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
