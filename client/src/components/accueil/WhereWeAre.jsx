import React from 'react';
import './global.css';
import img from '../../../public/images/Map.png'
function WhereWeAre() {
  return (
    <section className="where-we-are" id='map'>
      <h2 className="section-title" >Notre emplacement</h2>
      <img src={img} alt="Map showing our location" className="location-map" />
    </section>
  );
}

export default WhereWeAre;