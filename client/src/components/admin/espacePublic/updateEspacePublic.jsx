import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Button, Stack } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../outils/Header";
import Sidebarrr from "../outils/Sidebar";
import { tokens } from "../../../theme";

const UpdateEspacePublic = () => {
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { email, espaceId } = useParams();
  const [reqBody, setReqBody] = useState({
    nomEspace: '',
    adress: '',
    typeEspace: '',
    user: '',
    gouvernorat: '',
    ville: '',
  });
  const [cities, setCities] = useState([]);
  const [usersWithClientRole, setUsersWithClientRole] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchEspaceDetails = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`${appUrl}/espacePublic/getEspacePublic/${espaceId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
        });
        setReqBody(response.data);
        setSelectedUser(response.data.user);
      } catch (error) {
      }
    };
  
    fetchEspaceDetails();
  }, [email, espaceId]);
  

  useEffect(() => {
    const fetchUsersWithClientRole = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`${appUrl}/users/${email}/clientRole`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
        });
        setUsersWithClientRole(response.data);
      } catch (error) {
      }
    };

    fetchUsersWithClientRole();
  }, [email]);

  useEffect(() => {
    const fetchCities = async (gouvernorat) => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`${appUrl}/espacePublic/cities/${gouvernorat}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
        });
        setCities(response.data);
      } catch (error) {
      }
    };

    if (reqBody.gouvernorat) {
      fetchCities(reqBody.gouvernorat);
    }
  }, [reqBody.gouvernorat]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = Cookies.get('token');
      const _id = selectedUser;
      const response = await axios.put(
        `${appUrl}/espacePublic/updateEspacePublic/${espaceId}`,
        {
          ...reqBody,
          user: _id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
        }
      );

      toast.success("EspacePublic est mis à jour avec succès");
      setTimeout(() => {
        navigate(`/dashboard/${window.btoa(email)}`);
      }, 6500);
    } catch (error) {
      toast.error("Il y a une erreur lors de la mise à jour de l'espace public");
    }
  };

  return (
    <main id="updateEspacePublic" className="updateEspacePublic">
      <Header />
      <div style={{ display: 'flex'}}>
        <Sidebarrr /> 
        <div style={{ justifyContent: 'center' }}>
          {reqBody ? (
            <form onSubmit={handleFormSubmit} style={{marginTop:'15vh',marginLeft:'25vw'}}>
              <h3 style={{fontFamily: 'Constantia',fontWeight:"bold"}}>Mettre à jour un Espace Public</h3>
              <br />
              <ToastContainer />
              <div>
                <label style={{fontFamily: 'Constantia'}}>Nom Espace:</label>
                <input style={{fontFamily: 'Constantia'}} type="text" value={reqBody.nomEspace} onChange={(e) => setReqBody({ ...reqBody, nomEspace: e.target.value })} />
              </div>
              <div>
                <label style={{fontFamily: 'Constantia'}}>Gouvernorat:</label>
                <select className="form-select" value={reqBody.gouvernorat} onChange={(e) => setReqBody({ ...reqBody, gouvernorat: e.target.value })}>
                  <option style={{fontFamily: 'Constantia'}} value="" disabled>Gouvernorat</option>
                  <option style={{fontFamily: 'Constantia'}} value="Ariana">Ariana</option>
                  <option style={{fontFamily: 'Constantia'}} value="Béja">Béja</option>
                  <option style={{fontFamily: 'Constantia'}} value="BenArous">BenArous</option>
                  <option style={{fontFamily: 'Constantia'}} value="Bizerte">Bizerte</option>
                  <option style={{fontFamily: 'Constantia'}} value="Gabès">Gabès</option>
                  <option style={{fontFamily: 'Constantia'}} value="Gafsa">Gafsa</option>
                  <option style={{fontFamily: 'Constantia'}} value="Jendouba">Jendouba</option>
                  <option style={{fontFamily: 'Constantia'}} value="Kairouan">Kairouan</option>
                  <option style={{fontFamily: 'Constantia'}} value="Kasserine">Kasserine</option>
                  <option style={{fontFamily: 'Constantia'}} value="Kébili">Kébili</option>
                  <option style={{fontFamily: 'Constantia'}} value="LeKef">Le Kef</option>
                  <option style={{fontFamily: 'Constantia'}} value="Mahdia">Mahdia</option>
                  <option style={{fontFamily: 'Constantia'}} value="LaManouba">LA Manouba</option>
                  <option style={{fontFamily: 'Constantia'}} value="Médenine">Médenine</option>
                  <option style={{fontFamily: 'Constantia'}} value="Monastir">Monastir</option>
                  <option style={{fontFamily: 'Constantia'}} value="Nabeul">Nabeul</option>
                  <option style={{fontFamily: 'Constantia'}} value="Sfax">Sfax</option>
                  <option style={{fontFamily: 'Constantia'}} value="SidiBouzid">Sidi Bouzid</option>
                  <option style={{fontFamily: 'Constantia'}} value="Siliana">Siliana</option>
                  <option style={{fontFamily: 'Constantia'}} value="Sousse">Sousse</option>
                  <option style={{fontFamily: 'Constantia'}} value="Tataouine">Tataouine</option>
                  <option style={{fontFamily: 'Constantia'}} value="Tozeur">Tozeur</option>
                  <option style={{fontFamily: 'Constantia'}} value="Tunis">Tunis</option>
                  <option style={{fontFamily: 'Constantia'}} value="Zaghouan">Zaghouan</option>
                </select>
              </div>
              <div>
                <label style={{fontFamily: 'Constantia'}}>Ville:</label>
                <select className="form-select" value={reqBody.ville} onChange={(e) => setReqBody({ ...reqBody, ville: e.target.value })}>
                  <option style={{fontFamily: 'Constantia'}} value="" disabled>Select Ville</option>
                  {cities.map(ville => (
                    <option style={{fontFamily: 'Constantia'}} key={ville} value={ville}>{ville}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{fontFamily: 'Constantia'}}>Type Espace:</label>
                <select className="form-select" value={reqBody.typeEspace} onChange={(e) => setReqBody({ ...reqBody, typeEspace: e.target.value })}>
                  <option style={{fontFamily: 'Constantia'}} value="" disabled>Select Type</option>
                  <option style={{fontFamily: 'Constantia'}} value="MALL">Mall</option>
                  <option style={{fontFamily: 'Constantia'}} value="HOTEL">Hotel</option>
                  <option style={{fontFamily: 'Constantia'}} value="SALLESPORT">Salle de sport</option>
                  <option style={{fontFamily: 'Constantia'}} value="HOPITAL">Hopital</option>
                </select>
              </div>
              <div>
                <label style={{fontFamily: 'Constantia'}}>User with Client Role:</label>
                <select className="form-select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                  <option style={{fontFamily: 'Constantia'}} value="" disabled>Select User</option>
                  {usersWithClientRole.map((user) => (
                    <option style={{fontFamily: 'Constantia'}} key={user._id} value={user._id}>{user.nomEntreprise}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-success" style={{marginTop:'2vh',fontFamily: 'Constantia',fontWeight:"bold"}} >Update EspacePublic</button>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </main>
  );
  
};

export default UpdateEspacePublic;
