import React,{ useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../outils/Header";
import Footer from "../outils/Footer";
import Sidebarrr from "../outils/Sidebar";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const token = Cookies.get("token");

function ModifierUser() {
  const isRequestResetPasswordPage =
    window.location.pathname === "/requestResetPassword";
  const isResetPasswordPage =
    window.location.pathname.includes("/resetPassword/");
  const isLoginPage = window.location.pathname === "/signin";
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


  const shouldShowHeader =
    !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
  const { email } = useParams();
  const [newEmail, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [image, setImage] = React.useState(File | null);

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if(file){
      setImage(file);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
        const user = response.data;
        setEmail(user.email);
        setFullName(user.fullName);
        setPhoneNumber(user.phoneNumber);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
  };

  const handleModifierUser = async (event) => {
    event.preventDefault();
    
    if (email)
      try {
        if (image) {
          const reader = new FileReader();
          reader.readAsDataURL(image);

          reader.onloadend = async () => {
            const base64Image = reader.result ;

            await axios.put(
              `${appUrl}/users/${window.atob(
                email
              )}`,
              {
                newEmail,
                fullName,
                phoneNumber,
                
                image: {
                  data: base64Image.split(",")[1],
                  contentType: image.type,
                },
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${token}`,
                },
              }
            );

            if (window.atob(email) === newEmail) {
              window.location.href =
                "/consulterUser/" + email;
            } else {
              Cookies.remove("token");
              window.location.href = "/";
            }
          };
        } else {
          await axios.put(
            `${appUrl}/users/${window.atob(
              email
            )}`,
            {
              newEmail,
              fullName,
            
              phoneNumber,
              
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            }
          );

          if (window.atob(email) === newEmail) {
            window.location.href =
              "/consulterUser/" + email;
          } else {
            Cookies.remove("token");
            window.location.href = "/";
          }
        }
      } catch (error) {
        console.error("Failed to modify user:", error);
      }
  };
  const h3 = (value) => {
    if (value && !isValidPhoneNumber(value)) {
      toast.error("Veuillez entrer un numéro de téléphone valide.");
      setPhoneNumber(phoneNumber); // Clear phoneNumber if invalid
    } else {
      setPhoneNumber(value); // Set phoneNumber if valid
    }
  };
  return (
    <main id="main" className="main">
   {shouldShowHeader && <Header onSearch={(term) => setSearchTerm(term)} />}
   <div style={{ display: 'flex'}}>
      {shouldShowHeader && <Sidebarrr />} 
      <div  style={{ justifyContent: 'center' }}>
                <form onSubmit={handleModifierUser} style={{marginLeft:'20vw'}}>
            <h3 style={{textAlign:"center",fontFamily: 'Constantia',fontWeight:"bold"}}>Modifier User</h3>
            <br />
            <ToastContainer />
              <div className="row mb-3">
                <label style={{fontFamily: 'Constantia'}}className="col-sm-2 col-form-label">Email:</label>
                <div className="col-sm-10">
                  <input style={{fontFamily: 'Constantia'}}
                    type="email"
                    className="form-control"
                    value={newEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>


              <div className="row mb-3">
                <label style={{fontFamily: 'Constantia'}}className="col-sm-2 col-form-label">Nom et Prénom:</label>
                <div className="col-sm-10">
                  <input style={{fontFamily: 'Constantia'}}
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                
              </div>
             
              <div className="row mb-3">
                <label style={{fontFamily: 'Constantia'}}className="col-sm-2 col-form-label">Numéro téléphone:</label>
                <div className="col-sm-10">
                <PhoneInput
                   placeholder="Votre numéro de téléphone"
                   required
                   defaultCountry="TN"
                   value={phoneNumber}
                   onChange={h3}
                   style={{ marginBottom: "12px" }}
                 />
                </div>
                
              </div>
              <div className="row mb-3">
                <label style={{fontFamily: 'Constantia'}}className="col-sm-2 col-form-label">Photo de Profil</label>
                <div className="col-sm-10">
                  <input style={{fontFamily: 'Constantia'}}
                    className="form-control"
                    type="file"
                    id="formFile"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <br />

              <div className="row mb-3">
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary" style={{fontFamily: 'Constantia',fontWeight:"bold"}}>
                    Modifier
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      
    </main>
  );
}

export default ModifierUser;