import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Stack, MenuItem, Select, TextField } from '@mui/material';
import HeaderClient from '../outils/header/headerClient';
import SidebarClient from '../outils/sidebar/sidebarClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddReclamation = () => {
  const location = useLocation();
  const isRequestResetPasswordPage = location.pathname === '/requestResetPassword';
  const isResetPasswordPage = location.pathname.includes('/resetPassword/');
  const isLoginPage = location.pathname === '/signin';
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
  const { email } = useParams();
  const [reqBody, setReqBody] = useState({
    description: '',
    cathegorie: ''
  });
  const [echec, setEchec] = useState('');
  const [cathegories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCathegorie = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('Token manquant');
        }

        const response = await axios.get(
          `${appUrl}/cathegories/${window.atob(email)}/cathegorieManagement`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: ` ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setEchec('Erreur lors de la récupération des catégories');
      }
    };

    fetchCathegorie();
  }, [email, appUrl]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('Token manquant');
      }

      const decodedToken = jwtDecode(token); // Decode the token
      const userId = decodedToken.id; // Extract the user ID from the decoded token

      await axios.post(
        `${appUrl}/reclamations/${email}/addReclamation`,
        {userId,
          description: reqBody.description,
          cathegorie: selectedCategorie,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
        }
      );
      toast.success('Réclamation ajoutée avec succès');
      setTimeout(() => {
        navigate(`/reclamationsClient/${window.btoa(email)}`);
      }, 2000);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de la réclamation');
    }
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {shouldShowHeader && (
        <HeaderClient
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
      )}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {shouldShowHeader && (
          <SidebarClient
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
        )}
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <form onSubmit={handleFormSubmit} style={{ maxWidth: '600px', width: '100%' }}>
            <h3 style={{fontFamily: 'Constantia',fontWeight:"bold"}}>Créer une réclamation</h3>
            <br />
            <ToastContainer />
            <div>
              <label style={{fontFamily: 'Constantia'}}>Catégorie:</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={selectedCategorie}
                onChange={(e) => setSelectedCategorie(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
              >
                <option style={{fontFamily: 'Constantia'}}value="">Select Catégorie</option>
                {cathegories.map((cathegorie) => (
                  <option key={cathegorie._id} value={cathegorie._id} style={{fontFamily: 'Constantia'}}>{cathegorie.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{fontFamily: 'Constantia'}}>Description:</label>
              <input style={{fontFamily: 'Constantia',width: '100%', padding: '8px', marginBottom: '16px'}}
                type="text"
                value={reqBody.description}
                onChange={(e) => setReqBody({ ...reqBody, description: e.target.value })}
                
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: '2vh' ,fontFamily: 'Constantia',fontWeight:"bold"}}
            >
              Ajouter Réclamation
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddReclamation;
