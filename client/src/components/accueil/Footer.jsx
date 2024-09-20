import React from "react";
import { animateScroll as scroll } from "react-scroll";
import { Linkedin, SocialIconLink, SocialIcons1 } from "./footerElement";
import Newsletter from "./Newsletter";
import img from '../../../public/images/RemoteHub.png'
function Footer() {
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <Newsletter />
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Company</h3>
          <ul className="footer-list">
            <li>
              <a href="#about">Voltlockers</a>
            </li>
            <li>
              <a href="#careers">Trendy</a>
            </li>
            <li>
              <a href="#contact">Produits</a>
            </li>
            <li>
              <a href="#liftmedia">Publicity</a>
            </li>
            <li>
              <a href="#promotions">Promotions</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Company</h3>
          <ul className="footer-list">
            <li>
              <a href="#about">About us</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#contact">Contact us</a>
            </li>
            <li>
              <a href="#liftmedia">Lift Media</a>
            </li>
            <li>
              <a href="#promotions">Promotions</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Information</h3>
          <ul className="footer-list">
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
            <li>
              <a href="#policy">Politique</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <img
          src={img}
          alt="Company logo"
          className="footer-logo"
          to="/"
          onClick={toggleHome}
        />
        <div className="contact-info">
          <div>
            <p>E-mail:</p>
            <SocialIconLink
              href="https://mail.google.com/mail/u/0/#search/voltwisesolutions%40gmail.com?compose=new"
              target="_blank"
            >
              Voltwisesolutions@gmail.com
            </SocialIconLink>
          </div>

          <div>
            <p>Tél:</p>
            <SocialIconLink href="tel:+21654479625">
              +216 54 479 625
            </SocialIconLink>
          </div>

          <div>
            <p>Adresse :</p>{" "}
            <SocialIconLink
              href="https://www.google.com/maps/place/P%C3%A9pini%C3%A8re+de+Technop%C3%B4le+El+Ghazela,+Rue+IBN+HAMDOUN/@36.894049,10.1858932,17z/data=!4m15!1m8!3m7!1s0x12e2cb7254b0ee4f:0x7e87e33674451f9e!2sEl+Ghazala!3b1!8m2!3d36.8950951!4d10.188536!16s%2Fg%2F1ptvwdcx4!3m5!1s0x12e2cb7173d7cd7f:0x1ec59d1fe9ec5b54!8m2!3d36.8945506!4d10.186172!16s%2Fg%2F11byl57xvw?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
            >
              3ème Étage, Pépinière Technopole Al Ghazella.
            </SocialIconLink>
          </div>
        </div>
        <div className="social-links">
         
          <Linkedin
            href="https://www.linkedin.com/company/voltwise-solutions/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="../../../public/images/Icon.svg"
              alt=""
            />
          </Linkedin>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
