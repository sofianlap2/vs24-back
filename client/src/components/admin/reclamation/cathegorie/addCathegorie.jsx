import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import axios from "axios";
import { tokens } from "../../../../theme";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddCathegorie = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { email } = useParams(); // Get email from the URL parameters

  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [name, setName] = useState("");

 
  const theme = useTheme();
  const tokenValue = Cookies.get("token");
  const colors = tokens(theme.palette.mode);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${appUrl}/cathegories/${window.atob(email)}/addCathegorie`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${tokenValue}`,
          },
        }
      );
      toast.success("Catégorie ajoutée avec succès");
      // Clear form fields or show success message
      setTimeout(() => {
        navigate(`/dashboard/${window.btoa(email)}`);
      }, 2000);
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la catégorie");
    }
  };

  return (
    <main className="main">
      <div style={{ display: 'flex' }}>
        <div style={{ justifyContent: 'center' }}>
          <form onSubmit={handleSubmit} style={{ marginTop: '15vh', marginLeft: '15vw' }}>
            <h3 style={{ textAlign: "center",fontWeight:"bold"}}>Créer catégorie de réclamation</h3>
            <br />
            <ToastContainer />
            <div className="row mb-3">
              <label                  className="col-xl-10 col-sm-2 col-form-label"
              >Catégorie:</label>
              <div className="col-sm-10">
                <input  
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

          
            <br />

            <div className="row mb-3">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary"  style={{fontWeight:"bold"}}>
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

export default AddCathegorie;
