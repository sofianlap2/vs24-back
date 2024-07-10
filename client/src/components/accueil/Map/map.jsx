import React, { useState } from 'react';
import { MapContainer, MapWrapper, MapRow, Column1, Column2, ImgWrap, Iframe, Subtitle, MapH1, MapRowP } from './mapElament';
import { Trans } from 'react-i18next';
import { ButtonMap } from './ButtonMap';
import { P } from '../../../assets/vendor/chart.js/chunks/helpers.segment';

const Map = ({ lightBg, id, imgStart, topLine, lightText, darkText, alt, primary, dark, dark2, iframe, label,picture }) => {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const handleClick = (label) => {
    setSelectedLabel(label);
    console.log('Selected Label:', label);
  };

  const selectedIframeSrc = selectedLabel => {
    switch (selectedLabel) {
      case 'Label1':
        return iframe[0].iframeSrc1;
      case 'Label2':
        return iframe[1].iframeSrc2;
      case 'Label3':
        return iframe[2].iframeSrc3;
      case 'Label4':
        return iframe[3].iframeSrc4;
      case 'Label5':
        return iframe[4].iframeSrc5;
      case 'Label6':
        return iframe[5].iframeSrc6;
      default:
        return iframe[0].iframeSrc1;
    }
  };


  

  return (
    < >
      <MapContainer lightBg={lightBg} id={id} >
        <Trans>
          <MapWrapper >
          <MapH1 style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Carte Geographique</MapH1>
            <MapRow imgStart={imgStart} >
              <Column1 style={{ justifyContent: 'center' }}>
                <Subtitle >
                  {label && label.map((item, index) => (
                    <span key={index}>
                      {item[`Label${index + 1}`] && (
                        <ButtonMap
                          lightText={lightText}
                          style={{ fontFamily: 'Constantia', fontWeight: 'bold', color: '#000', marginBottom: '20px'}}
                          onClick={() => handleClick(`Label${index + 1}`)}
                        >
                          {item[`Label${index + 1}`]}
                        </ButtonMap>
                      )}
                    </span>
                  ))}
                </Subtitle>
              </Column1>
              <Column2 style={{ justifyContent: 'center' }}>
                <ImgWrap style={{ justifyContent: 'center' }}>
                  <Iframe
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={selectedIframeSrc(selectedLabel)}
                  />
                </ImgWrap>
              </Column2>
            </MapRow>
            <MapH1 style={{fontFamily: 'Constantia', fontWeight: 'bold',textAlign:'center'}}>Nos Partenaires</MapH1>

              <MapRowP >
<div  style={{ justifyContent: 'center'}}>
    {picture && picture.map((item, index) => (
      <img 
        key={index}
        src={Object.values(item)[0]} // Access the value of the object property
        alt={`Partner ${index}`}
        style={{ marginRight: 'col-px3', width: '100px', height: 'auto' }}
      />
    ))}
  </div>
</MapRowP>
            </MapWrapper>

        </Trans>
      </MapContainer>
    </>
  );
};

export default Map;
