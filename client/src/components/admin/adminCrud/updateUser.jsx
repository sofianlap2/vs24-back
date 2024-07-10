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
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const UpdateUser = () => {
  const isRequestResetPasswordPage =
    location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";
  

  const shouldShowHeader =
    !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { email, userId } = useParams();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [reqBody, setReqBody] = useState({
    fullName: "",
    phoneNumber: "",
    phoneNumber2: "",
    email: "",
    nomEntreprise: "",
    role: "",
  });

  useEffect(() => {
    const fetchEspaceDetails = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${appUrl}/users/getUser/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        });
        setReqBody(response.data);
        setPhoneNumber(response.data.phoneNumber);
        setPhoneNumber2(response.data.phoneNumber2);
      } catch (error) {
        toast.error("Failed to fetch user details.");
      }
    };

    fetchEspaceDetails();
  }, [email, userId]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        `${appUrl}/users/updateUser/${userId}`,
        {
          ...reqBody,
          phoneNumber,
          phoneNumber2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        }
      );

      toast.success("Utilisateur est mis à jour avec succès");
      setTimeout(() => {
        navigate(`/dashboard/${window.btoa(email)}`);
      }, 6500);
    } catch (error) {
      toast.error("Il y a une erreur lors de la mise à jour d'utilisateur");
    }
  };

  const handleChangePhoneNumber = (value) => {
    if (value && !isValidPhoneNumber(value)) {
      toast.error("Veuillez entrer un numéro de téléphone valide.");
    } else {
      setPhoneNumber(value); // Set phoneNumber if valid
      setReqBody({ ...reqBody, phoneNumber: value }); // Update reqBody
    }
  };

  const handleChangePhoneNumber2 = (value2) => {
    if (value2 && !isValidPhoneNumber(value2)) {
      toast.error("Veuillez entrer un numéro de téléphone valide pour Téléphone 2.");
      setPhoneNumber2(value2);
      setReqBody({ ...reqBody, phoneNumber2: '' }); // Clear phoneNumber2 in reqBody
    } else {
      setPhoneNumber2(value2);
      setReqBody({ ...reqBody, phoneNumber2: value2 });
    }
  };

  return (
    <main id="updateUser" className="updateUser">
      {shouldShowHeader && <Header  />}
      <div style={{ display: "flex" }}>
      {shouldShowHeader && <Sidebarrr />} 
        <div style={{ justifyContent: "center",display:"flex" }} >
          {reqBody ? (
            <form
              onSubmit={handleFormSubmit}
              style={{ marginTop: "15vh", marginLeft: "25vw" ,width:"60%"}}
            >
              <h3 style={{ fontFamily: "Constantia", fontWeight: "bold" }}>
                Mettre à jour un utilisateur
              </h3>
              <br />
              <ToastContainer />
              <div>
                <label style={{ fontFamily: "Constantia" }}>
                  Nom et prénom:
                </label>
                <input
                  style={{ fontFamily: "Constantia" }}
                  type="text"
                  value={reqBody.fullName}
                  onChange={(e) =>
                    setReqBody({ ...reqBody, fullName: e.target.value })
                  }
                />
              </div>
              <br />
              <div>
                <label style={{ fontFamily: "Constantia" }}>
                  Email:
                </label>
                <input
                  style={{ fontFamily: "Constantia" }}
                  type="text"
                  value={reqBody.email}
                  onChange={(e) =>
                    setReqBody({ ...reqBody, email: e.target.value })
                  }
                />
              </div>
              <br />
              <div>
                <label style={{ fontFamily: "Constantia" }}>
                  Nom d'entreprise:
                </label>
                <input
                  style={{ fontFamily: "Constantia" }}
                  type="text"
                  value={reqBody.nomEntreprise}
                  onChange={(e) =>
                    setReqBody({ ...reqBody, nomEntreprise: e.target.value })
                  }
                />
              </div>
              <br />
              <div className="row mb-3">
                <label className="col-xl-10 col-sm-2 col-form-label" style={{fontFamily: 'Constantia'}}>
                  Numéro téléphone:
                </label>
                <div className="col-sm-10">
                  <PhoneInput
                    placeholder="Votre numéro de téléphone"
                    required
                    defaultCountry="TN"
                    value={phoneNumber} 
                    onChange={handleChangePhoneNumber}
                    style={{ marginBottom: "12px"}}
                  />
                </div>
              </div>
              <br />
              <div className="row mb-3">
                <label className="col-xl-10 col-sm-2 col-form-label" style={{fontFamily: 'Constantia'}}>Téléphone 2 (optionnel) :
                </label>
                <div className="col-sm-10">
                  <PhoneInput
                    placeholder="Votre numéro de téléphone"
                    defaultCountry="TN"
                    value={phoneNumber2} 
                    onChange={handleChangePhoneNumber2}
                    style={{ marginBottom: "12px"}}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: "Constantia" }}>Role:</label>
                <select
                  className="form-select"
                  value={reqBody.role}
                  onChange={(e) =>
                    setReqBody({ ...reqBody, role: e.target.value })
                  }
                >
                  <option style={{ fontFamily: "Constantia" }} value="">
                    Role
                  </option>
                  <option
                    style={{ fontFamily: "Constantia" }}
                    value="SUPERADMIN"
                  >
                    Super Admin
                  </option>
                  <option style={{ fontFamily: "Constantia" }} value="ADMINPUB">
                    Admin Publicité
                  </option>
                  <option
                    style={{ fontFamily: "Constantia" }}
                    value="ADMINCLIENT"
                  >
                    Admin Client
                  </option>
                  <option
                    style={{ fontFamily: "Constantia" }}
                    value="ADMINDEMANDE"
                  >
                    Admin Demande
                  </option>
                  <option style={{ fontFamily: "Constantia" }} value="CLIENT">
                    Client
                  </option>
                  <option
                    style={{ fontFamily: "Constantia" }}
                    value="PUBLICITAIRE"
                  >
                    Publicitaire
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-success"
                style={{
                  marginTop: "2vh",
                  fontFamily: "Constantia",
                  fontWeight: "bold",
                }}
              >
                Update User
              </button>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default UpdateUser;
