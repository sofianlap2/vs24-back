import React, { useEffect, useState } from "react";
import { FaBars, FaAngleDown } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import {
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  Nav,
  NavBtn,
  NavBtnLink,
  NavDropDown,
 
} from "./NavbarElement"; // Make sure to import your styled components
import { animateScroll as scroll } from "react-scroll";
import LanguageSelector from "../../admin/outils/LanguageSelector";
import { Trans } from "react-i18next";
import { color } from "../../../assets/vendor/chart.js/helpers";
import { Button } from "bootstrap";
import img1 from '../../../images/VS.png';
import { Radio } from "@mui/material";
import { pink, red } from "@mui/material/colors";
 
const lngs = {
  fr: { nativeName: "" },
  en: { nativeName: "" },
};
 
const Navbar = ({ toggle, setShowDemandeClients,setShowDemandePubs }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const [logoSrc, setLogoSrc] = useState(img1);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
 
  const changeNav = () => {
   
    if (window.scrollY >= 80) {
      setScrollNav(true);
      setLogoSrc("/src/images/LN.png");
    } else {
      setScrollNav(false);
      setLogoSrc("/src/images/LN.png");
    }
  };
 
 /* useEffect( () => {
   window.addEventListener("scroll", changeNav);
    return () => {
      window.removeEventListener("scroll", changeNav);
    };
  }, []);*/
 
  const toggleHome = () => {
    scroll.scrollToTop();
  };
 
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
 
  const handleShowDemandeClients = () => {
    setShowDemandeClients(true);
    setDropdownOpen(false); // Close dropdown
  };
 
  const handleShowDemandePubs = () => {
    setShowDemandePubs(true);
    setDropdownOpen(false); // Close dropdown
  };
  return (
    <>
        <Trans>
          <Nav scrollNav={scrollNav}>
            <NavbarContainer>
              <NavLogo  to="/" onClick={toggleHome}>
              <a >
                <img
                  src={logoSrc}
                  height={logoSrc.includes("RemoteHub") ? "80" : "50"}
 
                  alt="RemoteHub Logo"
                  loading="lazy"
                 
                  style={{
                    marginBottom: logoSrc.includes("RemoteHub")
                      ? "10px"
                      : "10px",
                  }}
                />
              </a>
              </NavLogo>
              <MobileIcon onClick={toggle}>
                <FaBars />
              </MobileIcon>
              <NavMenu>
              <NavItem>
                  <NavLinks
                    to="about"
                   
                  >
                    Accueil
                  </NavLinks>
                </NavItem>
 
                <NavItem>
                  <NavLinks
                    to="valeurs"
                   
                   
                  >
                    Valeurs
                  </NavLinks>
                </NavItem>
                {/* <NavItem>
                  <NavLinks
                    to="produits"
                   
                   
                  >
                    Activité
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks
                    to="temoineages"
                   
                  >
                    Partenaires
                  </NavLinks>
                </NavItem> */}
                <NavItem>
                  <NavLinks
                    to="footer"
                   
                  >
                    Contact
                  </NavLinks>
                </NavItem>
                {/* <NavItem>
                  <NavLinks
                    to="actualite"
                   
                  >
                    Blog
                  </NavLinks>
                </NavItem> */}
                <NavBtn>
                  <NavBtnLink to="/signin" exact >
                    Se Connecter
                  </NavBtnLink>
                </NavBtn>
            <NavDropDown className="col-sm-2">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      color: scrollNav ? "#fff" : "#000",
                    }}
                  >
                    <div
      onClick={toggleDropdown}
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: scrollNav ? "#0000" : "#000",
        marginTop:'25px',
      }}
    >
     {/* <FaAngleDown /> */}
      <button class="btn btn-outline-secondary dropdown-toggle">Joignez</button>
    </div>
                  </div>
                 
                  {dropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10vh",
                        alignContent:'center',
                        alignItems:'center',
                        background: "#ffff",
                        borderRadius: "15px",
                        padding:'1px',
                        zIndex: 0,
                      }}
                    >
                      <ul style={{ margin: 0, padding: 0 }}>
                        <li style={{ color: "transparent" }}>
                       
                        <label
          onClick={handleShowDemandeClients}
          style={{
            background: '#ffff',
            border: 'none',
            color: scrollNav ? "#00000" : "#000",
            fontWeight: "500",
            marginTop: '10px',
            fontFamily: "Constantia",
            cursor: 'pointer', // Ajouter le pointeur de souris
            padding: '10px', // Ajouter du padding pour faciliter le survol
            transition: 'background 0.3s', // Ajouter une transition pour un effet plus fluide
            borderRadius: "40px",
 
          }}
          onMouseEnter={(e) => e.target.style.background = '#f0f0f0'} // Changer le fond au survol
          onMouseLeave={(e) => e.target.style.background = '#ffff'} // Revenir au fond initial
        >
                               Client
                          </label>
                        </li>
                        <li style={{ color: "transparent" }}>
                        <label
          onClick={handleShowDemandePubs}
          style={{
            background: '#ffff',
            color: scrollNav ? "#00000" : "#000",
            fontWeight: "500",
            fontFamily: "Constantia",
            cursor: 'pointer', // Ajouter le pointeur de souris
            padding: '10px', // Ajouter du padding pour faciliter le survol
            transition: 'background 0.3s', // Ajouter une transition pour un effet plus fluide
            borderRadius: "40px",
 
          }}
          onMouseEnter={(e) => e.target.style.background = '#f0f0f0'} // Changer le fond au survol
          onMouseLeave={(e) => e.target.style.background = '#ffff'} // Revenir au fond initial
        >
                             Publicitaire
                        </label>
 
                        </li>
                      </ul>
                    </div>
                  )}
                </NavDropDown>
              </NavMenu>
            </NavbarContainer>
          </Nav>
        </Trans>
        {/*</></IconContext.Provider>*/}
    </>
  );
};
 
export default Navbar;