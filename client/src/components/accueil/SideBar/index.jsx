import React, { useState } from 'react';
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
  SidebarRoute,
  NavDropDown,
  StyledButton
} from './SidebarElements';
 
const Sidebar = ({ isOpen, toggle, setShowDemandeClients, setShowDemandePubs }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook
 
  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent the sidebar from closing
    setDropdownOpen(!dropdownOpen);
  };
 
  const handleShowDemandeClients = () => {
    navigate(`/demandeClient`);
        setDropdownOpen(false); // Close dropdown
    toggle(); // Close the sidebar
  };
 
  const handleShowDemandePubs = () => {
    toggle();
    navigate(`/demandePub`);
    setDropdownOpen(false); // Close dropdown
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
            <SidebarLink style={{ fontFamily: 'Constantia' }} to='about' onClick={toggle}>Accueil</SidebarLink>
            <SidebarLink style={{ fontFamily: 'Constantia' }} to='valeurs' onClick={toggle}>Valeurs</SidebarLink>
            <SidebarLink style={{ fontFamily: 'Constantia' }} to='footer' onClick={toggle}>Contact</SidebarLink>
            <NavDropDown style={{ position: "relative" }}>
            <div
      onClick={toggleDropdown}
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        gap: '10px',
        marginTop:'25px',
      }}
    >
     {/* <FaAngleDown /> */}
      <button style={{padding :'4px 15px'}} class="btn btn-outline-secondary dropdown-toggle">Joignez</button>
    </div>
              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "65px",
                    textAlign:'center',
                    alignContent:'center',
                    background: "#ffff",
                    borderRadius: "15px",
                    zIndex: 1,
                    padding: "10px"
                  }}
                >
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    <li >
                      <StyledButton  
                        onClick={handleShowDemandeClients}
 
                      >
                        Client
                      </StyledButton >
                    </li>
                    <li>
                      <button to='demandePub'
                        onClick={handleShowDemandePubs}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: "#000",
                          fontWeight: "500",
                          fontFamily: "Constantia",
                          textAlign:'center',
 
                        }}
                      >
                        Publicitaire
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </NavDropDown>
          </SidebarMenu>
          <SideBtnWrap>
            <SidebarRoute style={{ fontFamily: 'Constantia', fontWeight: 'bold' }} to='/signin'>Se Connecter</SidebarRoute>
          </SideBtnWrap>
        </SidebarWrapper>
      </SidebarContainer>
    </>
  );
};
 
export default Sidebar;