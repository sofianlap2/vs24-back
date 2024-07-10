import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios  from 'axios';
const Logout = () => {
    const navigate = useNavigate();
    const token = Cookies.get("token");
    const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


    const handleLogout = async () => {
        try {
          await axios.post(
            `${appUrl}/logout`,
            {},
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          Cookies.remove("token");
          navigate("/");
        } catch (error) {
          console.error("Erreur lors de la déconnexion :", error);
        }
      };

    return (
        <div>
            <h5 onClick={handleLogout} style={{fontFamily: 'Constantia'}}>Logout</h5>
        </div>
    );
};

export default Logout;
