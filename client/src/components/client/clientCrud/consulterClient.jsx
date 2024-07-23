import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderClient from "../outils/header/headerClient";
import SidebarClient from "../outils/sidebar/sidebarClient";

const token = Cookies.get("token");

function ConsulterClient() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isRequestResetPasswordPage =
    window.location.pathname === "/requestResetPassword";
  const isResetPasswordPage =
    window.location.pathname.includes("/resetPassword/");
  const isLoginPage = window.location.pathname === "/signin";
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const shouldShowHeader =
    !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
  const [searchTerm, setSearchTerm] = useState("");
  const { email } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [email]);

  const fetchUser = async () => {
    if (email) {
      try {
        const response = await axios.get(
          `${appUrl}/users/${window.atob(email)}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        const userData = response.data;
        setUser(userData);
      } catch (error) {
      }
    }
  };

  const deleteUser = async () => {
    try {
      if (email) {
        await axios.delete(
          `${appUrl}/users/${window.atob(email)}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
      }
      Cookies.remove("token");
      window.location.href = "/";
    } catch (error) {
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
        <div style={{ marginLeft: "10vw", marginTop: "15vh" }}>
            <h3 style={{fontFamily: 'Constantia',fontWeight:"bold"}}>Client information:</h3>
            <br />
            <p style={{fontFamily: 'Constantia'}}>
              <strong>Nom et Prénom:</strong> {user.fullName}
            </p>
            <p style={{fontFamily: 'Constantia'}}>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong style={{fontFamily: 'Constantia'}}>Numéro téléphone:</strong> {user.phoneNumber}
            </p>
            {user.image && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <label style={{ marginRight: "10px" ,fontFamily: 'Constantia'}}>
                  <strong>Photo de profil :</strong>
                </label>
                <img
                  src={`data:${user.image.contentType};base64,${user.image.data}`}
                  alt="User"
                  style={{ width: "155px", height: "auto" ,borderRadius:"200px"}}
                />
              </div>
            )}
            <button
              className="btn btn-outline-secondary btn-sm"
              style={{ marginRight: "65px" }}
            >
              <Link
                to={`/modifierClient/${window.btoa(user.email)}`}
                style={{ color: "inherit" ,fontFamily: 'Constantia',fontWeight:"bold"}}
              >
                Modifier
              </Link>
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteUser()} style={{fontFamily: 'Constantia',fontWeight:"bold"}}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ConsulterClient;
