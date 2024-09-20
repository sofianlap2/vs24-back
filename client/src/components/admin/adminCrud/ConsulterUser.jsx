import React,{ useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
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
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


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
   <div style={{ display: 'flex'}}>
      <div  style={{ justifyContent: 'center' }}>
      <div style={{  marginLeft:"25vw",marginTop:"15vh"  }}>
            <h3 style={{fontWeight:"bold"}}>User information:</h3>
            <br />
            <p >
              <strong >Nom : </strong> {user.fullName}
            </p>
           
            <p >
              <strong>Email : </strong> {user.email}
            </p>
           
            <p >
              <strong >Numéro téléphone:</strong> {user.phoneNumber}
            </p>
            <p >
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
                  <strong >Photo de profil:</strong>
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
                to={`/admin/modifierUser/${window.btoa(user.email)}`}
                style={{ color: "inherit" ,fontWeight:"bold"}}
              >
                Modifier
              </Link>
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteUser()}style={{fontWeight:"bold"}}
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