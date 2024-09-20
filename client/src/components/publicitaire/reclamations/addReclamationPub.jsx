import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddReclamationPub = () => {
 
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { email } = useParams();
  
  const [reqBody, setReqBody] = useState({
    description: '',
  });
  const [echec, setEchec] = useState('');
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
        navigate(`/pub/reclamationsPub/${window.btoa(email)}`);
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    
      <div style={{ display: 'flex', flexGrow: 1 }}>
     
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <form onSubmit={handleFormSubmit} style={{ maxWidth: '600px', width: '100%' }}>
            <h3 style={{  fontWeight: "bold" }}>Créer une réclamation</h3>
            <br />
            <ToastContainer />
          
            <div>
              <label style={{ fontFamily: 'Constantia' }}>Description:</label>
              <textarea style={{  width: '100%', padding: '8px', marginBottom: '16px', borderColor: "#000" }}
                type="text"
                value={reqBody.description}
                onChange={(e) => setReqBody({ ...reqBody, description: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: '2vh',  fontWeight: "bold" }}
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
