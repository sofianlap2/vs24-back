import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, CircularProgress, Stack } from '@mui/material';
import Cookies from 'js-cookie';

import { format, isValid, parseISO } from "date-fns";
import { toast, ToastContainer } from 'react-toastify';

const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL || 'http://localhost:9090';

const PubliciteDetails = () => {
  const { id ,email} = useParams();
  const navigate = useNavigate();
  const [publicite, setPublicite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reqBody, setReqBody] = useState({
    user: {},
    espacePublic: [],
    dateDebPub: "",
    dateFinPub: "",
    status: "",
    video: null,
  });
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
  useEffect(() => {
    const fetchPublicite = async () => {
        try {
            const token = Cookies.get("token");
            const response = await axios.get(`${appUrl}/publicites/getPub/${id}`, {
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
          }catch (error) {
        setError('Erreur lors de la récupération des détails de la publicité.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicite();
  }, [id]);

  const handleStopPublicite = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.put(`${appUrl}/publicites/stopPub/${id}`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPublicite(response.data.publicite);
      toast.success('Publicité mise à jour à Terminé.');
      setTimeout(() => {
        navigate(`/dashboard/${window.btoa(email)}`);
      }, 2000);    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la publicité:', error);
      toast.error('Erreur lors de la mise à jour du statut de la publicité.');
    }
  };



  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <main id="updatePublicite" className="updatePublicite">
    <div style={{ display: "flex" }}>
      {loading ?  (
        <Stack alignItems="center" justifyContent="center" height="50vh" width="50vw">
          <CircularProgress />
        </Stack>
      ):(<div style={{ justifyContent: "center", display: "flex" }}>
        <ToastContainer/>
          <form
            style={{ marginTop: "15vh", marginLeft: "25vw", width: "60%" }}
          >
            <h3 style={{ fontFamily: "Constantia", fontWeight: "bold" }}>
            Détails de la Publicité
            </h3>
            <br />
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
          
          {/* Display other details of the publicite as needed */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleStopPublicite}
            disabled={reqBody.status === 'Terminé'}
          >
            Stop Publicité
          </Button>
        </form>
        </div>) }
      
      
    </div>
    </main>
  );
};

export default PubliciteDetails;
