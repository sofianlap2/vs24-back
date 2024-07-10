import React from 'react'
import { animateScroll as scroll } from 'react-scroll';

import {
    FooterContainer, FooterLink, FooterLinkItems
    , FooterLinksContainer, FooterWrap, FooterLinksWrapper
    , FooterLinkTitle, SocialIconLink, SocialIcons, SocialLogo
    , SocialMedia, SocialMediaWrap, WebsiteRights
} from './FooterElements'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { Trans } from 'react-i18next';

const Footer = () => {

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    return (
        <>
            <FooterContainer>
                <FooterWrap>
                    <FooterLinksContainer>
                        {/* Ajoutez vos liens ici */}
                    </FooterLinksContainer>
                    <SocialMedia>
                        <SocialMediaWrap>
                            <SocialLogo to='/' onClick={toggleHome}>
                                <img src="../../images/RemoteHub.png" height="70" alt="RemoteHub Logo" loading="lazy" />
                            </SocialLogo>
                            <WebsiteRights style={{ marginTop: 55 }}>VOLTWISE SOLUTIONS © {new Date().getFullYear()} </WebsiteRights>
                            <SocialIcons>
                                <SocialIconLink href="/" target="_blank" aria-label="Facebook" style={{ marginTop: 55, color: '#0866ff' }}>
                                    <FaFacebook />
                                </SocialIconLink>
                                <SocialIconLink href="/" target="_blank" aria-label="Instagram" style={{ marginTop: 55, color: '#E1306C' }}>
                                    <FaInstagram />
                                </SocialIconLink>
                                <SocialIconLink href="https://www.linkedin.com/in/voltwise-solutions-499584305/" target="_blank" aria-label="LinkedIn" style={{ marginTop: 55, color: '#0a66c2' }}>
                                    <FaLinkedin />
                                </SocialIconLink>
                                <SocialIconLink href="/" target="_blank" aria-label="Youtube" style={{ marginTop: 55 , color: '#FF0000' }}>
                                    <FaYoutube />
                                </SocialIconLink>
                            </SocialIcons>
                        </SocialMediaWrap>
                    </SocialMedia>
                </FooterWrap>
            </FooterContainer>
        </>
    );
}

export default Footer;
