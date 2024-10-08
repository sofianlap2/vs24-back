import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderPub from "../outils/header/headerPub";
import SidebarPub from "../outils/sidebar/sidebarPub";

const UpdateReclamationPub = () => {

  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { email, id } = useParams();
  const tokenValue = Cookies.get("token");
  const [reqBody, setReqBody] = useState(null);
  const [echec, setEchec] = useState('');




  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${appUrl}/reclamations/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
          });
          const reclamation = response.data;
          setReqBody(reclamation);
        } catch (error) {
          toast.error(
            "Erreur lors de la récupération des données de la réclamation."
          );
        }
      };
      fetchData();
    }
  }, [id, appUrl, tokenValue]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = Cookies.get("token");
      await axios.put(
        `${appUrl}/reclamations/updateReclamation/${id}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Réclamation mise à jour avec succès");
      setTimeout(() => {
        navigate(`/pub/reclamationsPub/${window.btoa(email)}`);
      }, 2000);
    } catch (error) {
      toast.error(
        "Il y a une erreur lors de la mise à jour de la réclamation"
      );
    }
  };

  return (
    <main id="updateReclamation" className="updateReclamation">
   
      <div style={{ display: "flex" }}>
    
        <div style={{ justifyContent: "center", display: "flex" }}>
          {reqBody ? (
            <form
              onSubmit={handleFormSubmit}
              style={{ marginTop: "15vh", marginLeft: "25vw", width: "60%" }}
            >
              <h3 style={{ fontFamily: "Constantia", fontWeight: "bold" }}>
                Mettre à jour une réclamation
              </h3>
              <br />
              <ToastContainer />
           
              <div>
                <label >
                  Description:
                </label>
                <textarea
                  style={{ fontFamily: "Constantia", width: "100%", borderColor: "#000" }}
                  value={reqBody.description}
                  onChange={(e) =>
                    setReqBody({ ...reqBody, description: e.target.value })
                  }
                />
              </div>
              <br />
              <div>
                <p >
                  <strong>Status:</strong> {reqBody.status}
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-success"
                style={{
                  marginTop: "2vh",
                    fontWeight: "bold",
                }}
              >
                Modifier
              </button>
            </form>
          ) : (
            <p>Chargement...</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default UpdateReclamationPub;