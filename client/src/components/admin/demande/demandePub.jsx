import React, { useState, useEffect } from "react";
import "./DemandePub.css";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { CloseIcon } from "./publiciteElement";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        setTimeout(() => {
          setShowDemandePubs(false);
        }, 6500);
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
  return (
    <div className="demande-pub">
      <ToastContainer /> {/* Container for displaying toasts */}
      <CloseIcon
        onClick={handleShowDemandePubs}
        style={{ justifyItems: "right" }}
      />

      <h3 style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Formulaire de devenir publicitaire</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomEntreprise">Nom d'entreprise:</label>
          <input style={{fontFamily: 'Constantia'}}
            type="text"
            placeholder="Nom d'entreprise"
            required
            value={reqBody.nomEntreprise}
            onChange={(e) =>
              setReqBody({ ...reqBody, nomEntreprise: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="fullName">Nom et Prénom :</label>
          <input style={{fontFamily: 'Constantia'}}
            type="text"
            placeholder="Votre nom et prénom"
            required
            value={reqBody.fullName}
            onChange={(e) =>
              setReqBody({ ...reqBody, fullName: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="email">Email :</label>
          <input style={{fontFamily: 'Constantia'}}
            type="email"
            placeholder="Votre Email"
            required
            value={reqBody.email}
            onChange={(e) => setReqBody({ ...reqBody, email: e.target.value })}
          />
        </div>
        <div>
          <label style={{fontFamily: 'Constantia'}}htmlFor="phoneNumber">Téléphone :</label>
          <PhoneInput
            placeholder="Votre numéro téléphone"
            required
            defaultCountry="TN"
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
            style={{
              marginBottom: "12px",
            }}
          />
          {phoneErrorMessage && (
            <div className="error-message">{phoneErrorMessage}</div>
          )}
        </div>
        <div>
          <label style={{fontFamily: 'Constantia'}}htmlFor="phoneNumber2">Téléphone 2 (optionnel) :</label>
          <PhoneInput
            placeholder="Votre numéro téléphone"
            defaultCountry="TN"
            value={phoneNumber2}
            onChange={handleChangePhoneNumber2}
            style={{
              marginBottom: "12px",
            }}
          />
       
        </div>
        <div>
          <tr>
            <th>
              <label>
                Governorate:
                <select
                  className="form-select"
                  style={{
                    height: "35px",
                    justifyItems: "center",
                    width: "10vw",
                  }}
                  value={selectedGovernorate}
                  onChange={(e) => {
                    setSelectedGovernorate(e.target.value);
                    setReqBody({ ...reqBody, gouvernorat: e.target.value });
                  }}
                >
                  <option value=""disabled>Gouvernorat</option>
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
                  <option value="LaManouba">LA Manouba</option>
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
            </th>
            <th style={{ marginLeft: "0.8vw" }}>
              <label htmlFor="ville" style={{ marginLeft: "0.8vw" }}>
                Ville:
                <select
                  className="form-select"
                  style={{
                    height: "35px",
                    justifyItems: "center",
                    width: "10vw",
                  }}
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setReqBody({ ...reqBody, ville: e.target.value });
                  }}
                >
                  <option value=""disabled>Select Ville</option>
                  {cities.map((ville) => (
                    <option key={ville} value={ville}>
                      {ville}
                    </option>
                  ))}
                </select>
              </label>
            </th>
            <th style={{ marginLeft: "0.8vw" }}>
              <label style={{ marginLeft: "0.8vw" }}>
                Secteur d'activité:
                <select
                  className="form-select"
                  style={{
                    height: "35px",
                    justifyItems: "center",
                    width: "10vw",
                  }}
                  value={selectedTypeEspace}
                  onChange={(e) => {
                    setSelectedTypeEspace(e.target.value);
                    setReqBody({ ...reqBody, typeEspace: e.target.value });
                  }}
                >
                  <option value=""disabled>Select Type</option>
                  <option value="MALL">Mall</option>
                  <option value="HOTEL">Hotel</option>
                  <option value="SALLESPORT">Salle de sport</option>
                  <option value="HOPITAL">Hopital</option>
                </select>
              </label>
            </th>
          </tr>
        </div>
        <div>
          <tr>
            <th>
              <label>
                Espace Publics:
                {espacePublics.map((espacePublic) => (
                  <div
                    key={espacePublic._id}
                    style={{ display: "inline-block", marginLeft: "10px" }}
                  >
                    <input style={{fontFamily: 'Constantia'}}
                      type="checkbox"
                      id={espacePublic._id}
                      value={espacePublic._id}
                      checked={selectedEspacePublics.includes(espacePublic._id)}
                      onChange={() => handleCheckboxChange(espacePublic._id)}
                    />
                    <label htmlFor={espacePublic._id}>{espacePublic.nomEspace}</label>
                  </div>
                ))}
              </label>
            </th>
          </tr>
        </div>
        <div>
          <label htmlFor="messageDemande">Message :</label>
          <textarea
            name="messageDemande"
            rows="10"
            cols="50"
            value={reqBody.messageDemande} style={{fontFamily: 'Constantia'}}
            onChange={(e) =>
              setReqBody({ ...reqBody, messageDemande: e.target.value })
            }
          ></textarea>
        </div>
        <button
          type="submit"
          value="Envoyer" style={{fontFamily: 'Constantia', fontWeight: 'bold'}}
          color="red"
          className="btn btn-outline-primary font-circular-semibold color-red rounded-pill me-1"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default DemandePub;
