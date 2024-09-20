import React, { useState, useEffect } from 'react';
import './DemandeClients.css'; // Ensure this CSS file is updated with similar styles as ContactForm
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DemandeClients = ({ setShowDemandeClients }) => {
  const navigate = useNavigate();
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [reqBody, setReqBody] = useState({
    nomEntreprise: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    phoneNumber2: '',
    gouvernorat: '',
    ville: '',
    messageDemande: '',
    metier: '',
    typeDemande: 'CLIENT',
  });

  useEffect(() => {
    const fetchCities = async (gouvernorat) => {
      try {
        const response = await axios.get(`${appUrl}/espacePublic/cities/${gouvernorat}`);
        setCities(response.data);
      } catch (error) {
        // Handle error
      }
    };

    if (selectedGovernorate) {
      fetchCities(selectedGovernorate);
    }
  }, [selectedGovernorate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${appUrl}/demandes/demandeClient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody),
      });

      const responseData = await response.json();

      if (response.status === 200 && responseData.status === 'SUCCESS') {
        toast.success("Demande soumise avec succès !");
        setReqBody({
          nomEntreprise: '',
          fullName: '',
          email: '',
          phoneNumber: '',
          phoneNumber2: '',
          gouvernorat: '',
          ville: '',
          messageDemande: '',
          metier: '',
          typeDemande: 'CLIENT',
        });
        setPhoneNumber("");
        setPhoneNumber2("");
        setSelectedGovernorate('');
        setSelectedCity('');
        const isMobile = window.innerWidth <= 975;
        setTimeout(() => {
          if (isMobile) {
            navigate('/');
          } else {
            setShowDemandeClients(false);
          }
        }, 5000);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Une erreur inattendue s'est produite.");
    }
  };

  const handleChangePhoneNumber = (value) => {
    setPhoneNumber(value);
    if (value && !isValidPhoneNumber(value)) {
      toast.error("Veuillez entrer un numéro de téléphone valide.");
      setReqBody({ ...reqBody, phoneNumber: '' });
    } else {
      setReqBody({ ...reqBody, phoneNumber: value });
    }
  };

  const handleChangePhoneNumber2 = (value2) => {
    setPhoneNumber2(value2);
    if (value2 && !isValidPhoneNumber(value2)) {
      toast.error("Veuillez entrer un numéro de téléphone valide pour Téléphone 2.");
      setReqBody({ ...reqBody, phoneNumber2: '' });
    } else {
      setReqBody({ ...reqBody, phoneNumber2: value2 });
    }
  };

  return (
    <section className='contact-form-section demande-clients' id='demandeClient'>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="contact-form">
        <h3 className="form-title">Formulaire d'inscription Client</h3>

        {/* Form Row 1: Full Name and Company Name */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullName">Nom et Prénom :</label>
            <input
              type="text"
              placeholder="Votre nom et prénom"
              required
              value={reqBody.fullName}
              onChange={(e) => setReqBody({ ...reqBody, fullName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nomEntreprise">Nom d'entreprise:</label>
            <input
              type="text"
              placeholder="Nom d'entreprise"
              required
              value={reqBody.nomEntreprise}
              onChange={(e) => setReqBody({ ...reqBody, nomEntreprise: e.target.value })}
            />
          </div>
        </div>

        {/* Form Row 2: Function and Email */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="metier">Fonction :</label>
            <input
              type="text"
              placeholder="Responsable, Chef de projet, etc."
              required
              value={reqBody.metier}
              onChange={(e) => setReqBody({ ...reqBody, metier: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              placeholder="Votre Email"
              required
              value={reqBody.email}
              onChange={(e) => setReqBody({ ...reqBody, email: e.target.value })}
            />
          </div>
        </div>

        {/* Form Row 3: Governorate and City */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gouvernorat">Gouvernorat:</label>
            <select
              value={selectedGovernorate}
              onChange={(e) => {
                setSelectedGovernorate(e.target.value);
                setReqBody({ ...reqBody, gouvernorat: e.target.value });
              }}
            >
              <option value="">Sélectionner le gouvernorat</option>
              {/* Options go here */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ville">Ville:</label>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setReqBody({ ...reqBody, ville: e.target.value });
              }}
              disabled={!selectedGovernorate}
            >
              <option value="">Sélectionner la ville</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Form Row 4: Phone 1 and Phone 2 */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phoneNumber">Téléphone 1:</label>
            <PhoneInput
              placeholder="Téléphone 1"
              value={phoneNumber}
              defaultCountry="TN"
 
              onChange={handleChangePhoneNumber}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber2">Téléphone 2 (optionnel) :</label>
            <PhoneInput
              placeholder="Téléphone 2"
              defaultCountry="TN"
 
              value={phoneNumber2}
              onChange={handleChangePhoneNumber2}
            />
          </div>
        </div>

        {/* Form Row 5: Message */}
        <div className="form-group">
          <label htmlFor="messageDemande">Message :</label>
          <textarea
            rows="4"
            placeholder="Expliquez votre besoin"
            value={reqBody.messageDemande}
            onChange={(e) => setReqBody({ ...reqBody, messageDemande: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button" >Envoyer</button>
        </form>
    </section>
  );
};

export default DemandeClients;
