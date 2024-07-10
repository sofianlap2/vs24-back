import React, { useState, useEffect } from 'react';
import './DemandeClients.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CloseIcon } from './clientElement';
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
    nomEntreprise:'',
    fullName: '',
    email: '',
    phoneNumber: '',
    phoneNumber2: '',
    gouvernorat:'',
    ville:'',
    messageDemande:'',
    metier:'',
    typeDemande:'CLIENT',
  });

  useEffect(() => {
    const fetchCities = async (gouvernorat) => {
      try {
        const response = await axios.get(`${appUrl}/espacePublic/cities/${gouvernorat}`);
        setCities(response.data);
      } catch (error) {
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
        // Clear form fields after successful submission
        setReqBody({
          nomEntreprise:'',
          fullName: '',
          email: '',
          phoneNumber: '',
          phoneNumber2: '',
          gouvernorat:'',
          ville:'',
          messageDemande:'',
          metier:'',
          typeDemande:'CLIENT',
        });
        setPhoneNumber("");
        setPhoneNumber2("");
        setSelectedGovernorate('');
        setSelectedCity('');
        setTimeout(() => {
          setShowDemandeClients(false);
        }, 6500);
      } else {
        toast.error(responseData.message );
      }
    } catch (error) {
      toast.error("Une erreur inattendue s'est produite.");
    }
  };

  const handleChangePhoneNumber = (value) => {
    setPhoneNumber(value);
    if (value && !isValidPhoneNumber(value)) {
      toast.error("Veuillez entrer un numéro de téléphone valide.");
      setReqBody({ ...reqBody, phoneNumber: '' }); // Clear phoneNumber in reqBody
    } else {
      setReqBody({ ...reqBody, phoneNumber: value });
    }
  };

  const handleChangePhoneNumber2 = (value2) => {
    setPhoneNumber2(value2);
    if (value2 && !isValidPhoneNumber(value2)) {
      toast.error("Veuillez entrer un numéro de téléphone valide pour Téléphone 2.");
      setReqBody({ ...reqBody, phoneNumber2: '' }); // Clear phoneNumber2 in reqBody
    } else {
      setReqBody({ ...reqBody, phoneNumber2: value2 });
    }
  };

  const handleShowDemandeClients = () => {
    setShowDemandeClients(false);
  };

  return (
    <div className='demande-clients'>
      <CloseIcon onClick={handleShowDemandeClients} style={{ justifyContent: 'right' }} />
      <h3 style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Formulaire de devenir client</h3>
      
      <ToastContainer />
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomEntreprise">Nom d'entreprise:</label>
          <input style={{fontFamily: 'Constantia'}}
            type="text"
            placeholder="Nom de l'entreprise"
            required
            value={reqBody.nomEntreprise}
            onChange={(e) => setReqBody({ ...reqBody, nomEntreprise: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="fullName">Nom et Prénom :</label>
          <input style={{fontFamily: 'Constantia'}}
            type="text"
            placeholder="Votre nom et prénom"
            required
            value={reqBody.fullName}
            onChange={(e) => setReqBody({ ...reqBody, fullName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="metier">Métier :</label>
          <input style={{fontFamily: 'Constantia'}}
            type="text"
            placeholder="Votre métier"
            required
            value={reqBody.metier}
            onChange={(e) => setReqBody({ ...reqBody, metier: e.target.value })}
          />
        </div>
        <div>
          <label>
            Governorat:
            <select
              className="form-select"
              style={{ height: "35px", justifyItems: 'center', width: '10vw' }}
              aria-label="Sélectionnez le gouvernorat"
              value={selectedGovernorate}
              onChange={(e) => { setSelectedGovernorate(e.target.value); setReqBody({ ...reqBody, gouvernorat: e.target.value }); }}
            >
              <option value=""disabled>Sélectionnez le gouvernorat</option>
              <option value="Ariana">Ariana</option>
              <option value="Béja">Béja</option>
              <option value="BenArous">BenArous</option>
              <option value="Bizerte">Bizerte</option>
              <option value="Gabès">Gabès</option>
              <option value="Gafsa">Gafsa</option>
              <option value="Jendouba">Jendouba</option>
              <option value="Kairouan">Kairouan</option>
              <option value="Kasserine">Kasserine</option>
              <option value="Kébili">Kébili</option>
              <option value="LeKef">Le Kef</option>
              <option value="Mahdia">Mahdia</option>
              <option value="LaManouba">La Manouba</option>
              <option value="Médenine">Médenine</option>
              <option value="Monastir">Monastir</option>
              <option value="Nabeul">Nabeul</option>
              <option value="Sfax">Sfax</option>
              <option value="SidiBouzid">Sidi Bouzid</option>
              <option value="Siliana">Siliana</option>
              <option value="Sousse">Sousse</option>
              <option value="Tataouine">Tataouine</option>
              <option value="Tozeur">Tozeur</option>
              <option value="Tunis">Tunis</option>
              <option value="Zaghouan">Zaghouan</option>
            </select>
          </label>
          <label style={{ marginLeft: "0.8vw" }}>
            Ville:
            <select
              className="form-select"
              style={{ height: "35px", justifyItems: 'center', width: '10vw' }}
              aria-label="Sélectionnez la ville"
              value={selectedCity}
              onChange={(e) => { setSelectedCity(e.target.value); setReqBody({ ...reqBody, ville: e.target.value }); }}
            >
              <option value=""disabled>Sélectionnez la ville</option>
              {cities.map(ville => (
                <option key={ville} value={ville}>{ville}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label style={{fontFamily: 'Constantia'}} htmlFor="email">Email :</label>
          <input style={{fontFamily: 'Constantia'}}
            type="email"
            placeholder="Votre Email"
            required
            value={reqBody.email}
            onChange={(e) => setReqBody({ ...reqBody, email: e.target.value })}
          />
        </div>
        <div>
          <label style={{fontFamily: 'Constantia'}} htmlFor="phoneNumber">Téléphone :</label>
          <PhoneInput
            placeholder="Votre numéro de téléphone"
            required
            defaultCountry="TN"
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
            style={{ marginBottom: "12px" }}
          />
        </div>
        <div>
          <label style={{fontFamily: 'Constantia'}}htmlFor="phoneNumber2">Téléphone 2 (optionnel) :</label>
          <PhoneInput
            placeholder="Votre numéro de téléphone"
            defaultCountry="TN"
            value={phoneNumber2}
            onChange={handleChangePhoneNumber2}
            style={{ marginBottom: "12px" }}
          />
        </div>
        <div>
          <label htmlFor="messageDemande">Message :</label>
          <textarea
            name="messageDemande"
            rows="10"
            cols="50"
            value={reqBody.messageDemande}
            style={{fontFamily: 'Constantia'}}
            onChange={(e) => setReqBody({ ...reqBody, messageDemande: e.target.value })}
          ></textarea>
        </div>
        <button type="submit" className='btn btn-outline-primary font-circular-semibold color-red rounded-pill me-1'style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Envoyer</button>
      </form>
    </div>
  );
};

export default DemandeClients;
