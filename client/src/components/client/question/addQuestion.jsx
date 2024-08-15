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
const AddQuestion = () => {
    const location = useLocation();
    const isRequestResetPasswordPage = location.pathname === '/requestResetPassword';
    const isResetPasswordPage = location.pathname.includes('/resetPassword/');
    const isLoginPage = location.pathname === '/signin';
    const navigate = useNavigate();
    const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
    const { email } = useParams();
  
    const [reqBody, setReqBody] = useState({
      question: '',
      typeQ: '',
      limitRep: null,
    });
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('Token manquant');
        }
  
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
  
        await axios.post(
          `${appUrl}/questions/${email}/addQuestion`,
          {
            question: reqBody.question,
            typeQ: reqBody.typeQ,
            limitRep: reqBody.limitRep,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        toast.success('Question ajoutée avec succès');
        setTimeout(() => {
          navigate(`/reclamationsClient/${window.btoa(email)}`);
        }, 2000);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erreur lors de l\'ajout de la question');
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
            <h3 style={{fontFamily: 'Constantia',fontWeight:"bold"}}>Créer une question</h3>
            <br />
            <ToastContainer />
           
            <div>
              <label style={{fontFamily: 'Constantia'}}>Question:</label>
              <textarea style={{fontFamily: 'Constantia',width: '100%', padding: '8px', marginBottom: '16px',borderColor:"#000"}}
                type="text"
                value={reqBody.question}
                onChange={(e) => setReqBody({ ...reqBody, question: e.target.value })}
                
              />
            </div>
            <div>
            <label style={{ marginLeft: "0.8vw" }}>
                Type de question:</label>
                <select
                  className="form-select"
                  style={{
                    height: "35px",
                    justifyItems: "center",
                    width: "30%",borderColor:"#000"
                  }}
                  value={reqBody.typeQ}
              onChange={(e) => setReqBody({ ...reqBody, typeQ: e.target.value })}

                >
                  <option value="" disabled selected>
                    Select Type
                  </option>
                  <option value="OUI/NON">OUI/NON</option>
                  <option value="SATISFACTION">SATISFACTION</option>
                  
                </select>
              
            </div>
            <div>
                <label style={{ marginLeft: "0.8vw" }}>
                    Limite de réponse</label>
                    <input type="number" id="typeNumber" class="form-control" style={{borderColor:"#000",
                    width: "30%"}}/>

                
            </div>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: '2vh' ,fontFamily: 'Constantia',fontWeight:"bold"}}
            >
              Ajouter Question
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddQuestion;