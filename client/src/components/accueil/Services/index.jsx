import React, { useState } from 'react'
import Icon1 from '../../../images/svg-10.svg';  
import Icon2 from '../../../images/svg-5.svg';  
import Icon3 from '../../../images/svg-8.svg';  
import prec from '../../../images/prec2.png';
import suiv from '../../../images/suiv1.png';
import un from '../../../images/ok.png';
import deux from '../../../images/cercle.png';
import trois from '../../../images/hand.png';
import quatre from '../../../images/okk.png';
import inn from '../../../images/11.png';
import partage from '../../../images/partage.png';
import trans from '../../../images/transp.png';
import Vector from '../../../images/Vector.png';
import tr from '../../../images/tra.png';
import g from '../../../images/gr.png';
import Video from "../../../videos/sectionBg.mp4";




import { ServicesContainer,ServicesCard 
,ServicesH1,ServicesH2,ServicesIcon,ServicesWrapper,ServicesDiv,NavButton,NavigationButtons,ServicesCardVS,ServicesIconVs,
ServicesPVS,ServicesDivVS,
ServicesP,
VideoBg} from './ServicesElement'
const Services = () => {
    
    const [currentCard, setCurrentCard] = useState(0);
    const Vs=[
      {
        icon:un,
        description: `Prise en charge de l'ensemble du processus, de la conception à la production en série`,
      },
      {
        icon:deux,
        description: `Réutilisation responsable`,
      },
      {
        icon:trois,
        description: `Service après-vente disponible et à l'écoute 7/7`,
      },
      {
        icon:quatre,
        description: `Usage intensif et répété`,
      },
    ]
  
    const cards = [
      {
        icon: g,
        title: 'Innovation',
        description: `Promotion de l'innovation technologique à travers le développement et la
         proposition de solutions novatrices répondant aux évolutions du marché de l'énergie électrique.
`,
      },
      {
        icon: Vector,
        title: 'Partage',
        description: `Le partage de l'énergie stockée favorise la collaboration et la solidarité 
        au sein de la communauté en permettant à chacun de recharger ses appareils électroniques.

`,
      },
      {
        icon: tr,
        title: 'Transparence',
        description: `Respect de la politique de transparence envers les utilisateurs 
        concernant la collecte, l'utilisation et le partage de leurs données.



`,
      },
    ];
  
    const handlePrev = () => {
      setCurrentCard((prevCard) => (prevCard === 0 ? cards.length - 1 : prevCard - 1));
    };
  
    const handleNext = () => {
      setCurrentCard((prevCard) => (prevCard === cards.length - 1 ? 0 : prevCard + 1));
    };
  return (
    <ServicesContainer id="valeurs">
   
    <VideoBg autoPlay loop muted src={Video} type="video/mp4" />

    <div >
    <ServicesDiv >
 <ServicesH1 style={{marginTop:'100px' ,marginBottom:'30px',color:"#fff" }}>Nos Valeurs </ServicesH1>
      </ServicesDiv>
    </div>
    <ServicesWrapper>
        <ServicesCard>
        <ServicesIcon src={cards[currentCard].icon}/>

            <ServicesH2 style={{ fontFamily: 'Constantia', fontWeight: 'bold',color:'#fff' }}>{cards[currentCard].title}</ServicesH2>
            <ServicesP style={{ fontFamily: 'Constantia ', fontWeight: 'normal', color: '#fff'}}>
            {cards[currentCard].description}
            </ServicesP>
            <NavigationButtons >
        <NavButton onClick={handlePrev}>
        <img src={prec} alt="prec" /> {/* Utiliser l'image pour le bouton prec */}

          </NavButton>
        <NavButton onClick={handleNext}>    
              <img src={suiv} alt="Suivant" /> {/* Utiliser l'image pour le bouton suivant */}
        </NavButton>
      </NavigationButtons>
              </ServicesCard>
    </ServicesWrapper>

    <div  >
    <ServicesDiv >
      
 <ServicesH1 style={{marginTop:'100px' ,marginBottom:'30px' ,color:"#fff"  }}>Pourquoi Voltwise Solutions ?</ServicesH1>
      </ServicesDiv>
   </div>
   <div>
      <ServicesDivVS>
      {Vs.map((item, index) => (
        <ServicesCardVS key={index}>
          <ServicesIconVs  style={{  fontWeight: 'bold' }} src={item.icon} />
          <ServicesPVS style={{ fontFamily: 'Constantia '}}>{item.description}</ServicesPVS>
        </ServicesCardVS>
      ))}
    </ServicesDivVS>
   
            </div>
           

   </ServicesContainer >
  )
}

export default Services
