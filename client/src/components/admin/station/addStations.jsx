import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Button, Stack } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../outils/Header";
import Sidebarrr from "../outils/Sidebar";
import { tokens } from "../../../theme";
import './stationForm.css';

const AddStation = () => {
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { email } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

 

  const isRequestResetPasswordPage = location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";
  const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
  const [selectedEspacePublic, setSelectedEspacePublic] = useState("");
  const [reqBody, setReqBody] = useState({
    numero: "",
    espacePublic: "",
    modelStation: "",
    dateFab: "",
    dateEntretient: "",
    dateFinLoc: "",
    status: "",
  });
  const [espacePublics, setEspacePublics] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTypeEspace, setSelectedTypeEspace] = useState("");
  const [cities, setCities] = useState([]);
  const [typeEspace, setTypeEspace] = useState([]);

  useEffect(() => {
    fetchEspacePublic();
  }, [selectedGovernorate, selectedCity, selectedTypeEspace]);

  const fetchEspacePublic = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `${appUrl}/espacePublic/${email}/espaceFilterForStation`,
        {
          params: {
            gouvernorat: selectedGovernorate,
            ville: selectedCity,
            typeEspace: selectedTypeEspace,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        }
      );
      setEspacePublics(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    const fetchCities = async (gouvernorat) => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${appUrl}/espacePublic/cities/${gouvernorat}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: ` ${token}`,
            },
          }
        );
        setCities(response.data);
      } catch (error) {
        // Handle error if needed
      }
    };

    if (selectedGovernorate) {
      fetchCities(selectedGovernorate);
    }
  }, [selectedGovernorate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = Cookies.get("token");
      const _id = selectedEspacePublic;
      const response = await axios.post(
        `${appUrl}/station/${email}/addStation`,
        {
          ...reqBody,
          espacePublic: _id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        }
      );
      toast.success("Station ajoutée avec succès");
      setTimeout(() => {
        navigate(`/dashboard/${window.btoa(email)}`);
      }, 2000);
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la station");
    }
  };

  return (
    <main id="addStation" className="addStation">
      {shouldShowHeader && <Header onSearch={(term) => setSearchTerm(term)} />}
      <div style={{ display: "flex" }}>
        {shouldShowHeader && <Sidebarrr />}
        <div className="row">
          <div style={{ width: "90vw" }}>
            <form
              className="row g-3 p-3 form-group"
              onSubmit={handleFormSubmit}
              style={{ marginTop: "12vh", marginLeft: "30vw"}}
            >
              <h3 style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Créer une station</h3>
              <br />
              <ToastContainer />
              <div className="col-md-4">
                <label className="form-label" style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Reference:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setReqBody({ ...reqBody, numero: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label className="form-label" style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Governorate:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setSelectedGovernorate(e.target.value)}
                >
                   <option style={{ fontFamily: 'Constantia'}} value="" disabled>
                    Gouvernorat
                  </option>
                   <option style={{ fontFamily: 'Constantia'}}  value="Ariana">Ariana</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Béja">Béja</option>
                   <option style={{ fontFamily: 'Constantia'}} value="BenArous">BenArous</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Bizerte">Bizerte</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Gabès">Gabès</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Gafsa">Gafsa</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Jendouba">Jendouba</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Kairouan">Kairouan</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Kasserine">Kasserine</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Kébili">Kébili</option>
                   <option style={{ fontFamily: 'Constantia'}} value="LeKef">Le Kef</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Mahdia">Mahdia</option>
                   <option style={{ fontFamily: 'Constantia'}} value="LaManouba">La Manouba</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Médenine">Médenine</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Monastir">Monastir</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Nabeul">Nabeul</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Sfax">Sfax</option>
                   <option style={{ fontFamily: 'Constantia'}} value="SidiBouzid">Sidi Bouzid</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Siliana">Siliana</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Sousse">Sousse</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Tataouine">Tataouine</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Tozeur">Tozeur</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Tunis">Tunis</option>
                   <option style={{ fontFamily: 'Constantia'}} value="Zaghouan">Zaghouan</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="ville" className="form-label"style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Ville:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                   <option style={{ fontFamily: 'Constantia'}} value="" disabled>
                    Select Ville
                  </option>
                  {cities.map((ville) => (
                     <option style={{ fontFamily: 'Constantia'}} key={ville} value={ville}>
                      {ville}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label" style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Secteur d'activité:</label>
                <div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setSelectedTypeEspace(e.target.value)}
                  >
                     <option style={{ fontFamily: 'Constantia'}} value="" disabled>
                      Select Type
                    </option>
                     <option style={{ fontFamily: 'Constantia'}} value="MALL">Mall</option>
                     <option style={{ fontFamily: 'Constantia'}} value="HOTEL">Hotel</option>
                     <option style={{ fontFamily: 'Constantia'}} value="SALLESPORT">Salle de sport</option>
                     <option style={{ fontFamily: 'Constantia'}} value="HOPITAL">Hopital</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label" style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Espace Public:</label>
                <div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setSelectedEspacePublic(e.target.value)}
                  >
                     <option style={{ fontFamily: 'Constantia'}} value="" >Select Espace</option>
                    {espacePublics.map((espacePublic) => (
                       <option style={{ fontFamily: 'Constantia'}} key={espacePublic._id} value={espacePublic._id}>
                        {espacePublic.nomEspace}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label" style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Date d'Installation:</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) =>
                    setReqBody({ ...reqBody, dateFab: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label className="form-label" style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Model:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setReqBody({ ...reqBody, modelStation: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label className="form-label"style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Date de l'entretien:</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) =>
                    setReqBody({ ...reqBody, dateEntretient: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label className="form-label"style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Date fin location:</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) =>
                    setReqBody({ ...reqBody, dateFinLoc: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label className="form-label"style={{fontFamily: 'Constantia', fontWeight: 'bold'}}>Status:</label>
                <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setReqBody({ ...reqBody, status: e.target.value })}
                  >
                      <option style={{ fontFamily: 'Constantia'}} value="" disabled>Select Status</option>
                     <option style={{ fontFamily: 'Constantia'}} value="LIBRE">Libre</option>
                     <option style={{ fontFamily: 'Constantia'}} value="LOUE">Loué</option>
                     <option style={{ fontFamily: 'Constantia'}} value="ENMAINTENANCE">En Maintenance</option>
                  </select>
              </div>
              <div className="col-md-12 text-center">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{ marginTop: "1vh",fontFamily: 'Constantia' }}
                >
                  Ajouter
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddStation;
