import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import HeaderClient from "../client/outils/header/headerClient";
import SidebarClient from "../client/outils/sidebar/sidebarClient";
import "./AddPublicite.css";
import { Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const AddPublicite = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const isRequestResetPasswordPage =
    location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";
  const shouldShowHeader =
    !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;

  const [formData, setFormData] = useState({
    dateDebPub: "",
    dateFinPub: "",
    espacePublic: [],
    video: null,
  });
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const tokenValue = Cookies.get("token");

  const [espaces, setEspaces] = useState([]);
  const [selectedEspacePublics, setSelectedEspacePublics] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTypeEspace, setSelectedTypeEspace] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchEspacePublic();
  }, [selectedGovernorate, selectedCity, selectedTypeEspace]);

  const fetchEspacePublic = async () => {
    try {
      const response = await axios.get(
        `${appUrl}/espacePublic/espaceFilterForPublicite`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
          params: {
            gouvernorat: selectedGovernorate,
            ville: selectedCity,
            typeEspace: selectedTypeEspace,
          },
        }
      );
      setEspaces(response.data);
    } catch (error) {
      console.error("Error fetching espaces:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  useEffect(() => {
    const fetchCities = async (gouvernorat) => {
      try {
        const response = await axios.get(
          `${appUrl}/espacePublic/cities/${gouvernorat}`
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error.message);
      }
    };

    if (selectedGovernorate) {
      fetchCities(selectedGovernorate);
    }
  }, [selectedGovernorate]);

  const handleCheckboxChange = (id) => {
    const updatedSelection = selectedEspacePublics.includes(id)
      ? selectedEspacePublics.filter((espaceId) => espaceId !== id)
      : [...selectedEspacePublics, id];
    setSelectedEspacePublics(updatedSelection);
    setFormData({ ...formData, espacePublic: updatedSelection });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.dateFinPub) <= new Date(formData.dateDebPub)) {
      alert("La date de fin doit être supérieure à la date de début.");
      return;
    }

    const form = new FormData();
    form.append("dateDebPub", formData.dateDebPub);
    form.append("dateFinPub", formData.dateFinPub);
    form.append("espacePublic", formData.espacePublic.join(",")); // Assuming the API expects a comma-separated list
    form.append("video", formData.video);

    try {
      const response = await axios.post(`${appUrl}/publicites/addPublicite`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      console.log("Advertisement saved:", response.data);
      toast.success('Demande de publicité est envoyé avec succès');
      // Handle success (e.g., show a success message)
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error );
      } else {
      toast.error('Erreur lors d\'envoie de la demande');
      // Handle error (e.g., show an error message)
    }}
  };

  return (
    <main className="main-container">
      {shouldShowHeader && (
        <HeaderClient
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
      )}
      <div className="content-container">
        {shouldShowHeader && (
          <SidebarClient
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
        )}
        <div className="form-container">
          <ToastContainer/>
          <form onSubmit={handleSubmit} className="form-content">
            <label>Date de début de publication:</label>
            <Form.Control
              type="date"
              name="dateDebPub"
              value={formData.dateDebPub}
              onChange={handleInputChange}
              required
            />
            <br />
            <label>Date de fin de publication:</label>
            <Form.Control
              type="date"
              name="dateFinPub"
              value={formData.dateFinPub}
              onChange={handleInputChange}
              required
            />
            <br />
            <div>
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
                  }}
                >
                  <option value="" disabled selected>
                    Gouvernorat
                  </option>
                  <option value="Ariana">Ariana</option>
                  <option value="Béja">Béja</option>
                  <option value="BenArous">Ben Arous</option>
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
                  }}
                >
                  <option value="" disabled selected>
                    Select Ville
                  </option>
                  {cities.map((ville) => (
                    <option key={ville} value={ville}>
                      {ville}
                    </option>
                  ))}
                </select>
              </label>
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
                  }}
                >
                  <option value="" disabled selected>
                    Select Type
                  </option>
                  <option value="MALL">Mall</option>
                  <option value="HOTEL">Hotel</option>
                  <option value="SALLESPORT">Salle de sport</option>
                  <option value="HOPITAL">Hôpital</option>
                  <option value="AUTRE">Autre</option>
                </select>
              </label>
            </div>
            <br />
            <label>Espace Publics:</label>
            <div className="checkbox-container">
              {espaces.map((espace) => (
                <div key={espace._id} className="checkbox-item">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={espace._id}
                    value={espace._id}
                    checked={selectedEspacePublics.includes(espace._id)}
                    onChange={() => handleCheckboxChange(espace._id)}
                  />
                  <label htmlFor={espace._id}>{espace.nomEspace}</label>
                </div>
              ))}
            </div>
            <br />
            <label>Upload Video (Max 50MB):</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              className="form-control"
              id="formFile"
              onChange={handleFileChange}
              required
            />
            <br />
            <button type="submit">Ajouter</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddPublicite;
