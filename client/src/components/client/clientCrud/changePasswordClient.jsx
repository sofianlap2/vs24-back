import axios from "axios";
import { useState } from "react";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { IconPassword,IconConfirmPassword,IconPasswordActuel } from "./changePwElement";
import SidebarClient from "../outils/sidebar/sidebarClient";
import HeaderClient from "../outils/header/headerClient";
import { toast,ToastContainer } from "react-toastify";
let email;
const token = Cookies.get("token");
if (token) {
  const decodedToken = jwtDecode(token);
  email = decodedToken.email;
}

const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


const ChangePasswordClient = () => {
  

  const isRequestResetPasswordPage =
  window.location.pathname === "/requestResetPassword";
const isResetPasswordPage =
  window.location.pathname.includes("/resetPassword/");
const isLoginPage = window.location.pathname === "/signin";
const [isSidebarOpen, setSidebarOpen] = useState(true);
const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          toast.error(axiosError.response.data.message);
        } else {
            toast.error(
            "Une erreur s'est produite lors de la modification du mot de passe."
          );
        }
      } else {
        toast.error(
          "Une erreur s'est produite lors de la modification du mot de passe."
        );
      }
    }
  };
  

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
{      shouldShowHeader &&  <HeaderClient toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
}   
   {shouldShowHeader&& <SidebarClient isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)} />}
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', width: '100%' }}>
            <h3 style={{fontFamily: 'Constantia',fontWeight:"bold"}}>Changer le mot de passe</h3>
            <br />
            <ToastContainer />
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
       
      
    </main>
  );
};

export default ChangePasswordClient;
