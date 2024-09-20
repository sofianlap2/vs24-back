import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = Cookies.get("token");

function ModifierPublicitaire() {
  
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const { email } = useParams();
  const [newEmail, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(File | null);

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (email)
      try {
        const response = await axios.get(`${appUrl}/users/${window.atob(email)}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const user = response.data;
        setEmail(user.email);
        setFullName(user.fullName);
        setPhoneNumber(user.phoneNumber);
      } catch (error) {
      }
  };

  const handleModifierPub = async (event) => {
    event.preventDefault();

    if (email)
      try {
        if (image) {
          const reader = new FileReader();
          reader.readAsDataURL(image);

          reader.onloadend = async () => {
            const base64Image = reader.result;

            await axios.put(
              `${appUrl}/users/${window.atob(email)}`,
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
              window.location.href = "/pub/consulterPubliciaire/" + email;
            } else {
              Cookies.remove("token");
              window.location.href = "/";
            }
          };
        } else {
          await axios.put(
            `${appUrl}/users/${window.atob(email)}`,
            {
              newEmail,
              fullName,
              phoneNumber,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              }
            }
          );

          if (window.atob(email) === newEmail) {
            window.location.href = "/pub/consulterPubliciaire/" + email;
          } else {
            Cookies.remove("token");
            window.location.href = "/";
          }
        }
      } catch (error) {
      }
  };

  const handleChangePhoneNumber = (value) => {
    if (value && !isValidPhoneNumber(value)) {
      toast.error("Veuillez entrer un numéro de téléphone valide.");
      setPhoneNumber(phoneNumber);
    } else {
      setPhoneNumber(value);
    }
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    
      <div style={{ display: 'flex', flexGrow: 1 }}>
     
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <form onSubmit={handleModifierPub} style={{ maxWidth: '600px', width: '100%' }}>
            <h2 style={{ textAlign: "center" ,fontWeight:"bold"}}>Modifier Publicitaire</h2>
            <br />
            <ToastContainer />
            <div className="form-group">
              <label >Email:</label>
              <input style={{marginBottom: '12px'}}
                type="email"
                className="form-control"
                value={newEmail}
                onChange={(e) => setEmail(e.target.value)}
                required
                
              />
            </div>
            <div className="form-group">
              <label >Nom et Prénom:</label>
              <input style={{marginBottom: '12px' }}
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              
              />
            </div>
            <div className="form-group">
              <label >Numéro téléphone:</label>
              <PhoneInput
                placeholder="Votre numéro de téléphone"
                required
                defaultCountry="TN"
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
                style={{ marginBottom: '12px' }}
              />
            </div>
            <div className="form-group">
              <label >Photo de profil:</label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: '12px' }}
              />
            </div>
            <br />
            <div className="form-group">
              <button type="submit" className="btn btn-primary" style={{fontWeight:"bold"}}>
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ModifierPublicitaire;
