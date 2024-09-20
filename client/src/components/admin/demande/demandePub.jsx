import React, { useState, useEffect } from "react";
import "./DemandePub.css";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { CloseIcon,Icon } from "./publiciteElement";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackgroundVideo from "../../../videos/Bochra.mp4";
 
// Load dotenv to access environment variables
 
const DemandePub = ({ setShowDemandePubs }) => {
  const navigate = useNavigate();
  const [espacePublics, setEspacePublics] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTypeEspace, setSelectedTypeEspace] = useState("");
  const [selectedEspacePublics, setSelectedEspacePublics] = useState([]);
  const [cities, setCities] = useState([]);
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
 
  // Access APP_URL from environment variables
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
 
  // State for form data
  const [reqBody, setReqBody] = useState({
    nomEntreprise: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    phoneNumber2: "",
    messageDemande: "",
    gouvernorat: "",
    ville: "",
    typeEspace: "",
    typeDemande: "PUBLICITAIRE",
    espacePublic: selectedEspacePublics,
  });
 
  // State for phone number validation error messages
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [phoneErrorMessage2, setPhoneErrorMessage2] = useState("");
 
  // Fetch espace public based on selected filters
  useEffect(() => {
    fetchEspacePublic();
  }, [selectedGovernorate, selectedCity, selectedTypeEspace]);
 
  const fetchEspacePublic = async () => {
    try {
      const response = await axios.get(
        `${appUrl}/espacePublic/espaceFilterFordemandePub`,
        {
          params: {
            gouvernorat: selectedGovernorate,
            ville: selectedCity,
            typeEspace: selectedTypeEspace,
          },
        }
      );
 
      setEspacePublics(response.data);
    } catch (error) {
      console.error(error);
    }
  };
 
  // Fetch cities based on selected governorate
  useEffect(() => {
    const fetchCities = async (gouvernorat) => {
      try {
        const response = await axios.get(
          `${appUrl}/espacePublic/cities/${gouvernorat}`
        );
        setCities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
 
    if (selectedGovernorate) {
      fetchCities(selectedGovernorate);
    }
  }, [selectedGovernorate]);
 
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${appUrl}/demandes/demandePub`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...reqBody, espacePublic: selectedEspacePublics, typeEspace: selectedTypeEspace }),
        }
      );
 
      if (response.status === 200) {
        toast.success("Demande soumise avec succès !");
        // Clear form fields after successful submission
        setReqBody({
          nomEntreprise: '',
          fullName: '',
          email: '',
          phoneNumber: '',
          phoneNumber2: '',
          gouvernorat: '',
          ville: '',
          messageDemande: '',
          typeDemande: 'PUBLICITAIRE',
          espacePublic: [],
          typeEspace: '',
        });
        setPhoneNumber("");
        setPhoneNumber2("");
        setSelectedGovernorate('');
        setSelectedCity('');
        setSelectedTypeEspace('');
        setSelectedEspacePublics([]);
        const isMobile = window.innerWidth <= 975;
        setTimeout(() => {
          if (isMobile) {
            navigate(`/`);
          } else {
            setShowDemandePubs(false);
          }
        }, 5000);
      } else {
        const errorData = await response.json();
        toast.error("Failed to submit demande. " + errorData.message); // Display backend error message
      }
    } catch (error) {
      toast.error("Error during demande submission. " + error.message); // Display generic error
    }
  };
 
  // Validate phone number format and update state
  const handleChangePhoneNumber = (value) => {
    setPhoneNumber(value);
    if (value && !isValidPhoneNumber(value)) {
      setPhoneErrorMessage("Please enter a valid phone number.");
      toast.error("Please enter a valid phone number.");
    } else {
      setPhoneErrorMessage("");
      setReqBody({ ...reqBody, phoneNumber: value });
    }
  };
 
  // Validate phone number 2 format and update state
  const handleChangePhoneNumber2 = (value2) => {
    setPhoneNumber2(value2);
    if (value2 && !isValidPhoneNumber(value2)) {
      setPhoneErrorMessage2("Please enter a valid phone number.");
      toast.error("Please enter a valid phone number.");
    } else {
      setPhoneErrorMessage2("");
      setReqBody({ ...reqBody, phoneNumber2: value2 });
    }
  };
 
  // Handle closing the demande pub form
  const handleShowDemandePubs = () => {
    setShowDemandePubs(false);
  };
 
  const handleCheckboxChange = (espacePublicId) => {
    setSelectedEspacePublics((prevEspacePublics) => {
      if (prevEspacePublics.includes(espacePublicId)) {
        return prevEspacePublics.filter((id) => id !== espacePublicId);
      } else {
        return [...prevEspacePublics, espacePublicId];
      }
    });
  };
 
  const isMobile = window.innerWidth <= 975;
 
  return (
   
      <div className="contact-form-section demande-pub" id="demandePub">

        <ToastContainer /> {/* Container for displaying toasts */}
      
      <form onSubmit={handleSubmit}className="contact-form">
      <h3 className="form-title">Formulaire d' inscription Annonceur</h3>
 
      <div className="form-row">
         <div className="form-group">
        <label htmlFor="fullName">Nom et Prénom :</label>
          <input 
            type="text"
            placeholder="Votre nom et prénom"
            required
            value={reqBody.fullName}
            onChange={(e) =>
              setReqBody({ ...reqBody, fullName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="nomEntreprise">Nom d'entreprise:</label>
          <input 
            type="text"
            placeholder="Nom d'entreprise"
            required
            value={reqBody.nomEntreprise}
            onChange={(e) =>
              setReqBody({ ...reqBody, nomEntreprise: e.target.value })
            }
          />
        </div>
      </div>
       <div className="form-row">
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
        <div className="form-group">
        <label htmlFor="phoneNumber">Téléphone :</label>
          <PhoneInput
            placeholder="Votre numéro téléphone"
            required
            defaultCountry="TN"
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
            style={{
              marginBottom: "12px"
            }}
          />
          {phoneErrorMessage && (
            <div className="error-message">{phoneErrorMessage}</div>
          )}
        </div></div>
        <div className="form-row">
        <div className="form-group">
          <label htmlFor="phoneNumber2">Téléphone 2 (optionnel) :</label>
          <PhoneInput
            placeholder="Votre numéro téléphone"
            defaultCountry="TN"
            value={phoneNumber2}
            onChange={handleChangePhoneNumber2}
            style={{
              marginBottom: "12px"
            }}
          />
        </div>
 
        <div className="form-group" >
    <label htmlFor="gouvernorat">   Gouvernorat:    </label>
 
      <select
             style={{ flex: '1' }}
 
        value={selectedGovernorate}
        onChange={(e) => {
          setSelectedGovernorate(e.target.value);
          setReqBody({ ...reqBody, gouvernorat: e.target.value });
        }}
       
      >
       
       <option value="" disabled selected>Sélectionnez le gouvernorat</option>
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
  </div></div>
  <div className="form-row">
  <div className="form-group">
  <label htmlFor="ville">  Ville:    </label>
 
      <select
        style={{ flex: '1' }}
 
        value={selectedCity}
        onChange={(e) => {
          setSelectedCity(e.target.value);
          setReqBody({ ...reqBody, ville: e.target.value });
        }}
      >
        <option value="" disabled selected>Select Ville</option>
        {cities.map((ville) => (
                    <option key={ville} value={ville}>
                      {ville}
                    </option>
                  ))}
                      </select>
  </div>
  <div className="form-group" >
  <label htmlFor="secteurActivite">Secteur d'activité:    </label>
 
      <select
        style={{ flex: '1' }}
 
        value={selectedTypeEspace}
        onChange={(e) => {
          setSelectedTypeEspace(e.target.value);
          setReqBody({ ...reqBody, typeEspace: e.target.value });
        }}
      >
        <option style={{ fontFamily: 'Constantia' }} value="" disabled selected>Select Type</option>
        <option style={{ fontFamily: 'Constantia' }} value="MALL">Mall</option>
        <option style={{ fontFamily: 'Constantia' }} value="HOTEL">Hotel</option>
        <option style={{ fontFamily: 'Constantia' }} value="SALLESPORT">Salle de sport</option>
        <option style={{ fontFamily: 'Constantia' }} value="HOPITAL">Hopital</option>
        <option style={{ fontFamily: 'Constantia' }} value="AUTRE">Autre</option>
      </select>
  </div>
 </div>
 <div className="form-group">
  <label>Espaces Publics Disponibles</label>
  <div className="espace-public-container">
    {espacePublics.map((espacePublic) => (
      <div key={espacePublic.id} className="espace-public-item">
       <input 
                      type="checkbox"
                      id={espacePublic._id}
                      value={espacePublic._id}
                      checked={selectedEspacePublics.includes(espacePublic._id)}
                      onChange={() => handleCheckboxChange(espacePublic._id)}
                    />
        <label htmlFor={`espacePublic-${espacePublic.id}`}>
          {espacePublic.nomEspace}
        </label>
      </div>
    ))}
  </div>
</div>

        <div className="form-group">
          <label htmlFor="messageDemande">Message :</label>
          <textarea
            name="messageDemande"
            rows="4"            cols="50"
            value={reqBody.messageDemande} 
            onChange={(e) =>
              setReqBody({ ...reqBody, messageDemande: e.target.value })
            }
          ></textarea>
        </div>
        <div style={{ textAlign: 'right' }}>
 
        <button type="submit" className="submit-button">Envoyer</button>

        </div>
      </form>
    </div>
  );
};
 
export default DemandePub;