import React, { useState, useRef, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import SignIn from '../accueil/Signin/index'; // Adjust the import path as needed
import ForgotPassword from '../accueil/resetPassword/RequestResetPassword'; // Adjust the import path as needed
import img from '../../../public/images/RemoteHub.png';
import { FaBars } from 'react-icons/fa';
import Sidebar from './SideBar/index'; // Ensure the path is correct
import './global.css'; // Import your CSS file
import { NavItem, NavLinks, NavMenu } from './headerElement';

const Header = ({toggle}) => {
  const [scrollNav, setScrollNav] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to control Sidebar visibility
  const popoverRef = useRef(null);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const handleSignInClick = () => {
    setShowSignIn((prev) => !prev);
    setShowForgetPassword(false);
  };

  const handleForgotPasswordClick = () => {
    setShowForgetPassword(true);
    setShowSignIn(false);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setShowSignIn(false);
      setShowForgetPassword(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle Sidebar visibility
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    return () => {
      window.removeEventListener('scroll', changeNav);
    };
  }, []);

  return (
    <>
      <header className={`site-header ${scrollNav ? 'scroll-nav' : ''}`}>
        <div className="header-container">
          <div className="mobile-icon" onClick={toggleSidebar}>
            <FaBars />
          </div>
          <img src={img} alt="Navigation Icon" className="logo" onClick={toggleHome} />
        </div>
        <nav className="main-nav">
          <div className="nav-container">
            <NavMenu>
            <NavItem><NavLinks to="Home" >Accueil</NavLinks></NavItem>
              <NavItem><NavLinks to="services" >Services</NavLinks></NavItem>
              {/* <NavItem><NavLinks to="products" >Produits</NavLinks></NavItem> */}
              <NavItem><NavLinks to="valeurs" >Valeurs</NavLinks></NavItem>
              {/* <NavItem><NavLinks to="testimonials" >Témoignages</NavLinks></NavItem>
              <NavItem><NavLinks to="FAQ" >FAQ</NavLinks></NavItem>
              <NavItem><NavLinks to="map" >Emplacement</NavLinks></NavItem> */}

              <NavItem><NavLinks to="contact" >Contact</NavLinks></NavItem>
            </NavMenu>
            <button className="login-button" onClick={handleSignInClick}>
              Se connecter
            </button>
            {showSignIn && (
              <div className="popover" ref={popoverRef}>
                <SignIn onForgotPasswordClick={handleForgotPasswordClick} />
              </div>
            )}
            {showForgetPassword && (
              <div className="popover" ref={popoverRef}>
                <ForgotPassword />
              </div>
            )}
          </div>
        </nav>
      </header>
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
    </>
  );
};

export default Header;
