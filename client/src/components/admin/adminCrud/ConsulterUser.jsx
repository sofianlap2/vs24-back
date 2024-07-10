import React,{ useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../outils/Header";
import Footer from "../outils/Footer";
 import Sidebarrr from "../outils/Sidebar";
 const token = Cookies.get("token");

const User ={
  fullName: String,
  email: String,
  phoneNumber: String,
  image: {
    data: String,
    contentType: String,
  }
}

function ConsulterUser() {
  

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
  const [user, setUser] = React.useState(User | null);

  useEffect(() => {
    fetchUser();
  });

  const fetchUser = async () => {
    if (email)
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
        console.error("Failed to fetch user:", error);
      }
  };
  const deleteUser = async () => {
    try {
      if (email)
        await axios.delete(
          `${appUrl}/users/${window.atob(email)}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
      Cookies.remove("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
   
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    {shouldShowHeader && <Header onSearch={(term) => setSearchTerm(term)} />}
   <div style={{ display: 'flex'}}>
      {shouldShowHeader && <Sidebarrr />} 
      <div  style={{ justifyContent: 'center' }}>
      <div style={{  marginLeft:"40vw",marginTop:"15vh"  }}>
            <h3 style={{fontFamily: 'Constantia',fontWeight:"bold"}}>User information:</h3>
            <br />
            <p style={{fontFamily: 'Constantia'}}>
              <strong >Nom : </strong> {user.fullName}
            </p>
           
            <p style={{fontFamily: 'Constantia'}}>
              <strong>Email : </strong> {user.email}
            </p>
           
            <p >
              <strong style={{fontFamily: 'Constantia'}}>Numéro téléphone:</strong> {user.phoneNumber}
            </p>
            <p style={{fontFamily: 'Constantia'}}>
              <strong >Role:</strong> {user.role}
            </p>

            {user.image && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <label style={{ marginRight: "10px" }} >
                  <strong style={{fontFamily: 'Constantia'}}>Photo de profil:</strong>
                </label>
                <img
                  src={`data:${user.image.contentType};base64,${user.image.data}`}
                  alt="User"
                  style={{ width: "155px", height: "auto",borderRadius:"200px" }}
                />
              </div>
            )}

<button
              className="btn btn-outline-secondary btn-sm"
              style={{ marginRight: "65px" }}
            >
              <Link
                to={`/modifierUser/${window.btoa(user.email)}`}
                style={{ color: "inherit" ,fontFamily: 'Constantia',fontWeight:"bold"}}
              >
                Modifier
              </Link>
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteUser()}style={{fontFamily: 'Constantia',fontWeight:"bold"}}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
      
    </main>
  );
}

export default ConsulterUser;