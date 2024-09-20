import React, { useState } from 'react';
import img from '../../../public/images/produit.png';
import ficheTechnique from '../../../public/images/ficheTechnique.jpg'; // Path to the uploaded image

function RecentProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="recent-products" id="products">
      <h2 className="section-title">Nos Produits</h2>
      <div className="product-showcase">
        <img src={img} alt="Featured product" className="product-image" />
        <div className="product-info">
          <h3 className="product-title">VOLTLOCKER</h3>
          <p className="product-description">
            Voltlocker est une station de recharge pour appareils <br />
            électroniques (smartphones, AirPods, smartwatches) dotée <br />
            d'un écran interactif. Vous pouvez y intégrer vos publicités et <br />
            enquêtes pour toucher directement votre audience.<br />
          </p>
          <div className="product-actions">
            <button className="cta-button primary">Demander Un Devis</button>
            <button className="cta-button secondary" onClick={handleOpenModal}>
              Voire fiche Technique
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <img src={ficheTechnique} alt="Fiche Technique" className="fiche-image" />
          </div>
        </div>
      )}
    </section>
  );
}

export default RecentProducts;
