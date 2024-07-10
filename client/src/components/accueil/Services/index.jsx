import React from 'react'
import Icon1 from '../../../images/svg-10.svg';  
import Icon2 from '../../../images/svg-5.svg';  

import Icon3 from '../../../images/svg-8.svg';  
 

import { ServicesContainer,ServicesCard 
,ServicesH1,ServicesH2,ServicesIcon,ServicesWrapper,
ServicesP} from './ServicesElement'
import { Trans } from 'react-i18next';
const Services = () => {
  return (
    <ServicesContainer id="valeurs">
    <Trans>
 <ServicesH1>Nos valeurs</ServicesH1>
    <ServicesWrapper>
        <ServicesCard>
            <ServicesIcon src={Icon1}/>
            <ServicesH2 style={{ fontFamily: 'Constantia', fontWeight: 'bold' }}>INNOVATION</ServicesH2>
            <ServicesP style={{ fontFamily: 'Constantia', fontWeight: 'bold', fontStyle: 'italic' }}>En tant qu'entreprise spécialisée dans les solutions
électriques, "Voltwise Solutions" pourrait valoriser l'innovation
technologique en développant et en proposant des solutions
novatrices pour répondre aux besoins changeants du marché de
l'énergie électrique.</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={Icon2}/>
            <ServicesH2 style={{ fontFamily: 'Constantia', fontWeight: 'bold' }}>LE PARTAGE DES RESSOURCES</ServicesH2>
            <ServicesP style={{ fontFamily: 'Constantia', fontWeight: 'bold', fontStyle: 'italic' }}>Les power banks peuvent être partagées
entre plusieurs utilisateurs, ce qui permet à plusieurs personnes de
bénéficier de l'énergie stockée pour recharger leurs appareils
électroniques. Cela encourage le partage des ressources au sein
de la communauté</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={Icon3}/>
            <ServicesH2 style={{ fontFamily: 'Constantia', fontWeight: 'bold' }}>TRANSPARENCE</ServicesH2>
            <ServicesP style={{ fontFamily: 'Constantia', fontWeight: 'bold', fontStyle: 'italic' }}>Adoptation d’une politique de transparence envers les
utilisateurs concernant la manière dont leurs données sont
collectées, utilisées et partagées.</ServicesP>
        </ServicesCard>
    
       
    </ServicesWrapper>
    </Trans>
   
   

   </ServicesContainer>
  )
}

export default Services
