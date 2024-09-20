import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import Cookies from "js-cookie";
import "react-phone-number-input/style.css";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
const CreateClient = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [demandeData, setDemandeData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    phoneNumber2:"",
    nomEntreprise:"",
    role: " CLIENT",
  });


  const tokenValue = Cookies.get("token");
  const { id } = useParams(); // Get id from the URL parameters

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");

const [nomEntreprise,setNomEntreprise] = useState("");
  useEffect(() => {

    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${appUrl}/demandes/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
          });
          const demande = response.data;
          setEmail(demande.email);
          setFullName(demande.fullName);
          setPhoneNumber(demande.phoneNumber);
          setPhoneNumber2(demande.phoneNumber2);

          setNomEntreprise(demande.nomEntreprise);
        } catch (error) {
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${appUrl}/users/${id}/addClient`,
        { email, fullName, phoneNumber,phoneNumber2,nomEntreprise, role: "CLIENT" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );

      if (response.status === 200) {
        const { password } = response.data; // Extract the generated password from the response
        console.log("Generated password:", password);

        // Perform the deletion operation
        const deleteResponse = await axios.delete(`${appUrl}/demandes/${id}`, {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });

        if (deleteResponse.status === 200) 
        toast.success("Client est ajouté avec succès");
        // Clear form fields or show success message
        setTimeout(() => {
          navigate(`/admin/addEspacePublic/${window.btoa(email)}`);
        }, 6500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de l'ajout du client");
    }
  };

  const handleChangePhoneNumber = (value) => {
    if (value && !isValidPhoneNumber(value)) {
      toast.error("Veuillez entrer un numéro de téléphone valide.");
    } else {
      setPhoneNumber(value); // Set phoneNumber if valid
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
  return (
    <main  className="main">
    <div style={{ display: "flex" }}>
        <div  style={{ justifyContent: 'center' }}>
          
          <form onSubmit={handleSubmit} style={{marginTop:'15vh',marginLeft:'24vw'}}>
             <h3 style={{ textAlign: "center" , fontWeight: 'bold'}}>Créer un compte client</h3>
            <br />
            <ToastContainer />
              <div className="row mb-3">
                <label className="col-xl-10 col-sm-2 col-form-label" >Email:</label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-xl-10 col-sm-2 col-form-label" >
                  Nom et Prénom:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)} 
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-xl-10 col-sm-2 col-form-label" >
                  Nom Entreprise:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={nomEntreprise} 
                    onChange={(e) => setNomEntreprise(e.target.value)}
                    required
                  />
                </div>
              </div>
             

              <div className="row mb-3">
                <label className="col-xl-10 col-sm-2 col-form-label" >
                  Numéro téléphone:
                </label>
                <div className="col-sm-10">
                <PhoneInput
                   placeholder="Votre numéro de téléphone"
                   required
                   defaultCountry="TN"                     className="form-control"

                   value={phoneNumber} 
                   onChange={handleChangePhoneNumber}
                   style={{ marginBottom: "12px" }}
                 />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-xl-10 col-sm-2 col-form-label" >Téléphone 2 (optionnel) :
                </label>
                <div className="col-sm-10">
                <PhoneInput
                   placeholder="Votre numéro de téléphone"
                   defaultCountry="TN"                     className="form-control"

                   value={phoneNumber2} 
                   onChange={handleChangePhoneNumber2}
                   style={{ marginBottom: "12px" }}
                 />
                </div>
              </div>
              <br />

              <div className="row mb-3" >
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary" style={{ fontWeight: 'bold'}}>
                    Ajouter
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      
    </main>
  );
};

export default CreateClient;
