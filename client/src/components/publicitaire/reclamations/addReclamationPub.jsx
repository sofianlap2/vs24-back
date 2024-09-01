import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderPub from '../outils/header/headerPub';
import SidebarPub from '../outils/sidebar/sidebarPub';

const AddReclamationPub = () => {
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
  });
  const [echec, setEchec] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userId, setUserId] = useState(null);


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('Token manquant');
      }

      await axios.post(
        `${appUrl}/reclamations/${email}/addReclamation`,
        {
          userId, // Use the stored userId
          description: reqBody.description,
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
        navigate(`/ReclamationsPub/${window.btoa(email)}`);
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {shouldShowHeader && (
        <HeaderPub
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
      )}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {shouldShowHeader && (
          <SidebarPub
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
        )}
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <form onSubmit={handleFormSubmit} style={{ maxWidth: '600px', width: '100%' }}>
            <h3 style={{ fontFamily: 'Constantia', fontWeight: "bold" }}>Créer une réclamation</h3>
            <br />
            <ToastContainer />
          
            <div>
              <label style={{ fontFamily: 'Constantia' }}>Description:</label>
              <textarea style={{ fontFamily: 'Constantia', width: '100%', padding: '8px', marginBottom: '16px', borderColor: "#000" }}
                type="text"
                value={reqBody.description}
                onChange={(e) => setReqBody({ ...reqBody, description: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: '2vh', fontFamily: 'Constantia', fontWeight: "bold" }}
            >
              Ajouter Réclamation
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddReclamationPub;
