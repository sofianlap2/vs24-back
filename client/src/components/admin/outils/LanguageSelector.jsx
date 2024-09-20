// LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import enFlag from '../../../images/UKFlag.png';
import frFlag from '../../../images/franceFlag.png';

const LanguageSelector = ({ lngs }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.location.reload(); // Reload the page
  };

  return (
    <div className='col-lg'>
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          disabled={i18n.resolvedLanguage === lng}
          style={{
            marginBottom:'50px',
            borderRadius: '50%',
            padding: '12px ',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            outline: 'none',
            position: 'relative',
            zIndex: '1',
            '@media screen and (max-width: 768px)': {
              display: 'none',
            }
          }}
        >
          {lngs[lng].nativeName}
          {lng === 'fr' && <img src={frFlag} alt="French flag" style={flagStyle} />}
          {lng === 'en' && <img src={enFlag} alt="English flag" style={flagStyle} />}
        </button>
      ))}
    </div>
  );
};

const flagStyle = {
  position: 'absolute',
  right: '5px',
  top: '150%',
  left: '180px',
  transform: 'translateY(-50%)',
  width: '20px',
  height: 'auto'
};

export default LanguageSelector;
