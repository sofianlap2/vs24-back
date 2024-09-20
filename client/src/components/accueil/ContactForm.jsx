import React, { useState, useEffect } from 'react';
import DemandeClients from '../admin/demande/demandeClients'; // Import the DemandeClients component
import DemandePub from '../admin/demande/demandePub'; // Import the DemandePub component

function ContactForm() {
  const [formType, setFormType] = useState('clients');

  return (
    <section className="contact-form-section" id="join" style={{marginTop:"20vh"}}>
      <div className="form-type-selector">
      <button 
  className={`form-type-button ${formType === 'clients' ? 'active' : ''}`}
  onClick={() => setFormType('clients')}
  style={{ marginRight: '1rem' }} // Add space between buttons
>
  Clients
</button>
<button 
  className={`form-type-button ${formType === 'publicitaire' ? 'active' : ''}`}
  onClick={() => setFormType('publicitaire')}
>
  Publicitaire
</button>

      </div>

      {/* Conditionally render DemandeClients or DemandePub based on the selected form type */}
      {formType === 'clients' ? (
        <DemandeClients />
      ) : (
        <DemandePub />
      )}
    </section>
  );
}

export default ContactForm;
