import axios from "axios";
import  { useState } from "react";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

import { IconPassword,IconConfirmPassword,IconPasswordActuel } from "./changePwElement";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
let email;
const token = Cookies.get("token");
if (token) {
  const decodedToken = jwtDecode(token);
  email = decodedToken.email;
}
const navigate = useNavigate; // Initialize useNavigate hook

const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


const ChangePassword = () => {
  


  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const response = await axios.put(
        `${appUrl}/users/${email}/changePassword`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      toast.success("mot de passe  a changé avec successé");
      // Clear form fields or show success message
      setTimeout(() => {
        navigate(`/admin/dashboard/${window.btoa(email)}`);
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  

  return (
    <main >
   <div style={{ display: 'flex'}}>
      <div  style={{ justifyContent: 'center' }}>
                <form onSubmit={handleSubmit} style={{marginTop:'15vh',marginLeft:'15vw'}}>
            <h3 style={{fontWeight:"bold"}}>Changer le mot de passe</h3>
            <br />
            <ToastContainer />

              <div className="row mb-3">
                <label 
                  className="col-xl-10 col-sm-2 col-form-label"
                  htmlFor="currentPassword"
                >
                  Mot de passe actuel:
                </label>
                <div className="col-sm-10">
                  <input 
                    type={ "password"}
                    className="form-control"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                  />
                  
                </div>
              </div>

              <div className="row mb-3" >
                <label 
                  className="col-xl-10 col-sm-2 col-form-label"
                  htmlFor="newPassword"
                >
                  Nouveau mot de passe:
                </label>
                <div className="col-sm-10">
                  <input 
                    type={ "password"}
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                 
                </div>
              </div>

              <div className="row mb-3">
                <label 
                  className="col-xl-10 col-sm-2 col-form-label"
                  htmlFor="confirmPassword"
                >
                  Confirmer le mot de passe:
                </label>
                <div className="col-sm-10">
                  <input 
                    type={ "password"}
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                 
                </div>
              </div>

              <div className="row mb-3"style={{marginTop: '40px'}}>
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary" style={{fontWeight:"bold"}}>
                    Changer le mot de passe
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      
    </main>
  );
};

export default ChangePassword;
