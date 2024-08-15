import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../outils/Header";
import Sidebarrr from "../outils/Sidebar";
import { format, isValid, parseISO } from "date-fns";

const DecisionPub = () => {
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { email, pubId } = useParams();
  const [reqBody, setReqBody] = useState({
    user: {},
    espacePublic: [],
    dateDebPub: "",
    dateFinPub: "",
    status: "",
    video: null,
  });

  useEffect(() => {
    const fetchPubliciteDetails = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${appUrl}/publicites/getPub/${pubId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setReqBody(response.data);
          console.log("Fetched Publicite:", response.data);
        } else {
          toast.error("Invalid response format.");
        }
      } catch (error) {
        console.error("Error fetching publicite details:", error);
        toast.error("Failed to fetch publicite details.");
      }
    };

    fetchPubliciteDetails();
  }, [pubId]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = Cookies.get("token");
      console.log("Status to update:", reqBody.status);

      await axios.put(
        `${appUrl}/publicites/updatePub/${pubId}`,
        { status: reqBody.status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Publicité mise à jour avec succès");
      setTimeout(() => {
        navigate(`/dashboard/${window.btoa(email)}`);
      }, 3000);
    } catch (error) {
      console.error("Error updating publicite:", error);
      toast.error("Erreur lors de la mise à jour de la publicité");
    }
  };

  const renderDateRec = (params) => {
    if (!params.value) return "N/A";
    const date = parseISO(params.value);
    if (!isValid(date)) return "Invalid date";
    return format(date, "dd/MM/yyyy");
  };

  const renderVideo = () => {
    if (reqBody.video && reqBody.video.data) {
      const videoSrc = `data:${reqBody.video.contentType};base64,${reqBody.video.data}`;
      return (
        <video
          width="320"
          height="240"
          controls
          onError={(e) => {
            console.error("Error loading video:", e.nativeEvent);
            toast.error("Error loading video. Please check the console for more details.");
          }}
        >
          <source src={videoSrc} type={reqBody.video.contentType} />
          Your browser does not support the video tag.
        </video>
      );
    }
    return null;
  };

  return (
    <main id="updatePublicite" className="updatePublicite">
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebarrr />
        <div style={{ justifyContent: "center", display: "flex" }}>
          <form
            onSubmit={handleFormSubmit}
            style={{ marginTop: "15vh", marginLeft: "25vw", width: "60%" }}
          >
            <h3 style={{ fontFamily: "Constantia", fontWeight: "bold" }}>
              Mettre à jour une publicité
            </h3>
            <br />
            <ToastContainer />
            <ul>
              <li>
                <p style={{ fontFamily: "Constantia" }}>
                  <strong>Nom et Prénom:</strong> {reqBody.user.fullName}
                </p>
                <p style={{ fontFamily: "Constantia" }}>
                  <strong>Email:</strong> {reqBody.user.email}
                </p>
                <p style={{ fontFamily: "Constantia" }}>
                  <strong>Numéro Téléphone:</strong> {reqBody.user.phoneNumber}
                </p>
                <p style={{ fontFamily: "Constantia" }}>
                  <strong>Numéro Téléphone 2:</strong> {reqBody.user.phoneNumber2}
                </p>
              </li>
            </ul>
            <ul>
              {reqBody.espacePublic.map((espace, index) => (
                <li key={index}>
                  <p style={{ fontFamily: "Constantia" }}>
                    <strong>Nom de l'espace:</strong> {espace.nomEspace}
                  </p>
                  <p style={{ fontFamily: "Constantia" }}>
                    <strong>Type d'espace:</strong> {espace.typeEspace}
                  </p>
                  <p style={{ fontFamily: "Constantia" }}>
                    <strong>Gouvernorat:</strong> {espace.gouvernorat}
                  </p>
                  <p style={{ fontFamily: "Constantia" }}>
                    <strong>Ville:</strong> {espace.ville}
                  </p>
                </li>
              ))}
            </ul>
            <p>
              <strong style={{ fontFamily: "Constantia" }}>Date début Publicité:</strong> {renderDateRec({ value: reqBody.dateDebPub })}
            </p>
            <p>
              <strong style={{ fontFamily: "Constantia" }}>Date fin Publicité:</strong> {renderDateRec({ value: reqBody.dateFinPub })}
            </p>
            <br />
            {renderVideo()}
            <br />
            {reqBody.status === "En attente" ? (
              <div>
                <label style={{ fontFamily: "Constantia" }}>Status:</label>
                <select
                  className="form-select"
                  value={reqBody.status}
                  onChange={(e) => setReqBody({ ...reqBody, status: e.target.value })}
                >
                  <option style={{ fontFamily: "Constantia" }} value="" disabled>
                    Status
                  </option>
                  <option style={{ fontFamily: "Constantia" }} value="Accepté">
                    Accepté
                  </option>
                  <option style={{ fontFamily: "Constantia" }} value="Refusé">
                    Refusé
                  </option>
                </select>
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{
                    marginTop: "2vh",
                    fontFamily: "Constantia",
                    fontWeight: "bold",
                  }}
                >
                  Modifier Publicité
                </button>
              </div>
            ) : (
              <p>
                <strong style={{ fontFamily: "Constantia" }}>Status:</strong> {reqBody.status}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default DecisionPub;
