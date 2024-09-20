import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
        navigate(`/admin/dashboard/${window.btoa(email)}`);
      }, 6500);
    } catch (error) {
      toast.error("Il y a une erreur lors de la mise à jour de l'espace public");
    }
  };

  return (
    <main id="updateEspacePublic" className="updateEspacePublic">
      <div style={{ display: 'flex'}}>
        <div style={{ justifyContent: 'center' }}>
          {reqBody ? (
            <form onSubmit={handleFormSubmit} style={{marginTop:'15vh',marginLeft:'25vw'}}>
              <h3 style={{fontWeight:"bold"}}>Mettre à jour un Espace Public</h3>
              <br />
              <ToastContainer />
              <div>
                <label >Nom Espace:</label>
                <input  type="text" value={reqBody.nomEspace} onChange={(e) => setReqBody({ ...reqBody, nomEspace: e.target.value })} className='form-control'/>
              </div>
              <div>
                <label >Gouvernorat:</label>
                <select className="form-select" value={reqBody.gouvernorat} onChange={(e) => setReqBody({ ...reqBody, gouvernorat: e.target.value })}>
                  <option  value="" disabled selected>Gouvernorat</option>
                  <option  value="Ariana">Ariana</option>
                  <option  value="Béja">Béja</option>
                  <option  value="BenArous">BenArous</option>
                  <option  value="Bizerte">Bizerte</option>
                  <option  value="Gabès">Gabès</option>
                  <option  value="Gafsa">Gafsa</option>
                  <option  value="Jendouba">Jendouba</option>
                  <option  value="Kairouan">Kairouan</option>
                  <option  value="Kasserine">Kasserine</option>
                  <option  value="Kébili">Kébili</option>
                  <option  value="LeKef">Le Kef</option>
                  <option  value="Mahdia">Mahdia</option>
                  <option  value="LaManouba">LA Manouba</option>
                  <option  value="Médenine">Médenine</option>
                  <option  value="Monastir">Monastir</option>
                  <option  value="Nabeul">Nabeul</option>
                  <option  value="Sfax">Sfax</option>
                  <option  value="SidiBouzid">Sidi Bouzid</option>
                  <option  value="Siliana">Siliana</option>
                  <option  value="Sousse">Sousse</option>
                  <option  value="Tataouine">Tataouine</option>
                  <option  value="Tozeur">Tozeur</option>
                  <option  value="Tunis">Tunis</option>
                  <option  value="Zaghouan">Zaghouan</option>
                </select>
              </div>
              <div>
                <label >Ville:</label>
                <select className="form-select" value={reqBody.ville} onChange={(e) => setReqBody({ ...reqBody, ville: e.target.value })}>
                  <option  value="" disabled selected>Select Ville</option>
                  {cities.map(ville => (
                    <option  key={ville} value={ville}>{ville}</option>
                  ))}
                </select>
              </div>
              <div>
                <label >Type Espace:</label>
                <select className="form-select" value={reqBody.typeEspace} onChange={(e) => setReqBody({ ...reqBody, typeEspace: e.target.value })}>
                  <option  value="" disabled selected>Select Type</option>
                  <option  value="MALL">Mall</option>
                  <option  value="HOTEL">Hotel</option>
                  <option  value="SALLESPORT">Salle de sport</option>
                  <option  value="HOPITAL">Hopital</option>
                  <option  value="AUTRE">Autre</option>
                </select>
              </div>
              <div>
                <label >User with Client Role:</label>
                <select className="form-select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                  <option  value="" disabled selected>Select User</option>
                  {usersWithClientRole.map((user) => (
                    <option  key={user._id} value={user._id}>{user.nomEntreprise}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-success" style={{marginTop:'2vh',fontWeight:"bold"}} >Update EspacePublic</button>
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
