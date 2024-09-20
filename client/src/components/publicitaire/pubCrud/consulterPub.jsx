import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

function ConsulterPublicitaire() {

  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


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
   
      <div style={{ display: 'flex', flexGrow: 1 }}>
      
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <div style={{ marginLeft: "10vw", marginTop: "15vh" }}>
            <h3 style={{fontWeight:"bold"}}>Client information:</h3>
            <br />
            <p >
              <strong>Nom et Prénom:</strong> {user.fullName}
            </p>
            <p >
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong >Numéro téléphone:</strong> {user.phoneNumber}
            </p>
            {user.image && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <label style={{ marginRight: "10px" }}>
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
                to={`/pub/modifierPubliciaire/${window.btoa(user.email)}`}
                style={{ color: "inherit" ,fontWeight:"bold"}}
              >
                Modifier
              </Link>
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteUser()} style={{fontWeight:"bold"}}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ConsulterPublicitaire;
