import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, isValid, parseISO } from "date-fns";

const UpdatePub = () => {

  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { email, id } = useParams();

  const [reqBody, setReqBody] = useState({
    espacePublic: [],
    dateDebPub: "",
    dateFinPub: "",
    status: "",
    video: null,
  });
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    const fetchPubliciteDetails = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${appUrl}/publicites/getPubPub/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        });

        if (response.data && response.data.user) {
          setReqBody(response.data);
        } else {
          toast.error("Invalid response format.");
        }
      } catch (error) {
        toast.error("Failed to fetch publicite details.");
      }
    };

    fetchPubliciteDetails();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("status", reqBody.status);
      formData.append("dateDebPub", reqBody.dateDebPub);
      formData.append("dateFinPub", reqBody.dateFinPub);
      
      if (videoFile) {
        formData.append("video", videoFile);
      }

      const token = Cookies.get("token");
      await axios.put(
        `${appUrl}/publicites/updatePub/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: ` ${token}`,
          },
        }
      );

      toast.success("Publicité mise à jour avec succès");
      setTimeout(() => {
        navigate(`/pub/publicitesManagementPub/${window.btoa(email)}`);
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReqBody((prevReqBody) => ({
      ...prevReqBody,
      [name]: value,
    }));
  };

  const handleVideoChange = (event) => {
    setVideoFile(event.target.files[0]);
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
      <div style={{ display: "flex" }}>
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
              {reqBody.espacePublic.map((espace, index) => (
                <li key={index}>
                  <p><strong>Nom de l'espace:</strong> {espace.nomEspace}</p>
                  <p><strong>Type d'espace:</strong> {espace.typeEspace}</p>
                  <p><strong>Gouvernorat:</strong> {espace.gouvernorat}</p>
                  <p><strong>Ville:</strong> {espace.ville}</p>
                </li>
              ))}
            </ul>

            <p><strong>Date début Publicité:</strong> {renderDateRec({ value: reqBody.dateDebPub })}</p>
            <p><strong>Date fin Publicité:</strong> {renderDateRec({ value: reqBody.dateFinPub })}</p>
            <p><strong>Status:</strong> {reqBody.status}</p>
            <br />

            {renderVideo()}
            <br />

            {(reqBody.status === "En attente" || reqBody.status === "Accepté") && (
              <>
                <label>Modifier la vidéo:</label>
                <input type="file" name="video" onChange={handleVideoChange} accept="video/*" className="form-control" />
                <br />
              </>
            )}

            {reqBody.status === "En attente" && (
              <>
                <label>Date de début de publication:</label>
                <input
                  type="date"
                  name="dateDebPub"
                  value={reqBody.dateDebPub}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <label>Date de fin de publication:</label>
                <input
                  type="date"
                  name="dateFinPub"
                  value={reqBody.dateFinPub}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <br />
              </>
            )}

            {(reqBody.status === "En attente" || reqBody.status === "Accepté") && (
              <button
                type="submit"
                className="btn btn-success"
                style={{ marginTop: "2vh", fontWeight: "bold" }}
              >
                Modifier Publicité
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default UpdatePub;
