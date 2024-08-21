import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../outils/Header";
import Sidebarrr from "../outils/Sidebar";
import "react-toastify/dist/ReactToastify.css";

const UpdateReclamationStat = () => {
  const isRequestResetPasswordPage =
    location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";

  const shouldShowHeader =
    !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { email, id } = useParams();
  const tokenValue = Cookies.get("token");

  const [reqBody, setReqBody] = useState(null);

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
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = Cookies.get("token");
      await axios.put(
        `${appUrl}/reclamations/updateReclamation/${id}`,
        {
          status: reqBody.status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Réclamation mise à jour avec succès");
      setTimeout(() => {
        navigate(`/dashboard/${window.btoa(email)}`);
      }, 2000);
    } catch (error) {
      toast.error(
        "Il y a une erreur lors de la mise à jour de la réclamation"
      );
    }
  };

  return (
    <main id="updateReclamation" className="updateReclamation">
      {shouldShowHeader && <Header />}
      <div style={{ display: "flex" }}>
        {shouldShowHeader && <Sidebarrr />}
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
              <p style={{ fontFamily: "Constantia" }}>
              <strong >Nom et prénom: </strong>
              {reqBody.user?.fullName}</p>
                
              </div>
              <div>
              <p style={{ fontFamily: "Constantia" }}>
              <strong >Email: </strong>
               {reqBody.user?.email}</p>
              </div>
             
              <div>
              <p style={{ fontFamily: "Constantia" }}>
              <strong >
                  Catégorie: </strong>
                {reqBody.cathegorie?.nomCat}
                </p>
              </div>
            
              <div>
              <p style={{ fontFamily: "Constantia" }}>
              <strong >
                  Description: </strong> {reqBody.description}
                </p>
               
              </div>
             
              <div>
                <label style={{ fontFamily: "Constantia" }}>Statut:</label>
                <select
                  className="form-select"
                  value={reqBody.status}
                  onChange={(e) =>
                    setReqBody({ ...reqBody, status: e.target.value })
                  }
                >
                  <option
                    style={{ fontFamily: "Constantia" }}
                    value="en cours"
                  >
                    En cours
                  </option>
                  <option style={{ fontFamily: "Constantia" }} value="traité">
                    Traité
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

export default UpdateReclamationStat;