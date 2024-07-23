import axios from "axios";
import { useState } from "react";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import Header from "../outils/Header";
import Footer from "../outils/Footer";
import Sidebarrr from "../outils/Sidebar";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { IconPassword,IconConfirmPassword,IconPasswordActuel } from "./changePwElement";
let email;
const token = Cookies.get("token");
if (token) {
  const decodedToken = jwtDecode(token);
  email = decodedToken.email;
}

const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


const ChangePassword = () => {
  

  const isRequestResetPasswordPage =
  window.location.pathname === "/requestResetPassword";
const isResetPasswordPage =
  window.location.pathname.includes("/resetPassword/");
const isLoginPage = window.location.pathname === "/signin";

const shouldShowHeader =
  !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
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
      setMessage(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          setMessage(axiosError.response.data.message);
        } else {
          setMessage(
            "Une erreur s'est produite lors de la modification du mot de passe."
          );
        }
      } else {
        setMessage(
          "Une erreur s'est produite lors de la modification du mot de passe."
        );
      }
    }
  };
  

  return (
    <main >
     {shouldShowHeader && <Header onSearch={(term) => setSearchTerm(term)} />}
   <div style={{ display: 'flex'}}>
      {shouldShowHeader && <Sidebarrr />} 
      <div  style={{ justifyContent: 'center' }}>
                <form onSubmit={handleSubmit} style={{marginTop:'15vh',marginLeft:'35vw'}}>
            <h3 style={{fontFamily: 'Constantia',fontWeight:"bold"}}>Changer le mot de passe</h3>
            <br />
              <div className="row mb-3">
                <label style={{fontFamily: 'Constantia'}}
                  className="col-xl-10 col-sm-2 col-form-label"
                  htmlFor="currentPassword"
                >
                  Mot de passe actuel:
                </label>
                <div className="col-sm-10">
                  <input style={{fontFamily: 'Constantia'}}
                    type={ "password"}
                    className="form-control"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                  />
                  
                </div>
              </div>

              <div className="row mb-3" >
                <label style={{fontFamily: 'Constantia'}}
                  className="col-xl-10 col-sm-2 col-form-label"
                  htmlFor="newPassword"
                >
                  Nouveau mot de passe:
                </label>
                <div className="col-sm-10">
                  <input style={{fontFamily: 'Constantia'}}
                    type={ "password"}
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                 
                </div>
              </div>

              <div className="row mb-3">
                <label style={{fontFamily: 'Constantia'}}
                  className="col-xl-10 col-sm-2 col-form-label"
                  htmlFor="confirmPassword"
                >
                  Confirmer le mot de passe:
                </label>
                <div className="col-sm-10">
                  <input style={{fontFamily: 'Constantia'}}
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
                  <button type="submit" className="btn btn-primary" style={{fontFamily: 'Constantia',fontWeight:"bold"}}>
                    Changer le mot de passe
                  </button>
                </div>
              </div>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      
    </main>
  );
};

export default ChangePassword;
