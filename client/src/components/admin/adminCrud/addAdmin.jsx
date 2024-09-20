import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
const AddAdmin = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [message, setMessage] = useState("");
  const [echec, setEchec] = useState("");


  const tokenValue = Cookies.get("token");
  const { email: userEmail } = useParams(); // Get id from the URL parameters

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");

  const [selectedRole, setSelectedRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${appUrl}/users/${email}/addAdmin`,
        {
          email,
          fullName,
          phoneNumber,
          phoneNumber2,
          role: selectedRole, // Include the selected role in the request
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${tokenValue}`,
          },
        }
      );
      toast.success("Admin est ajouté avec successé");
      // Clear form fields or show success message
      setTimeout(() => {
        navigate(`/admin/usersManagement/${window.btoa(email)}`);
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleChangePhoneNumber = (value) => {
    if (value && !isValidPhoneNumber(value)) {
      toast.error("Veuillez entrer un numéro de téléphone valide.");
      setPhoneNumber(phoneNumber); // Clear phoneNumber if invalid
    } else {
      setPhoneNumber(value); // Set phoneNumber if valid
    }
  };
  const handleChangePhoneNumber2 = (value2) => {
    if (value2 && !isValidPhoneNumber(value2)) {
      toast.error("Veuillez entrer un numéro de téléphone valide.");
      setPhoneNumber2(phoneNumber2); // Clear phoneNumber if invalid
    } else {
      setPhoneNumber2(value2); // Set phoneNumber if valid
    }
  };
  return (
    <main className="main">
       <div style={{ display: 'flex' }}>
      
         <div style={{ justifyContent: 'center' }}>
           <form onSubmit={handleSubmit} style={{ marginTop: '15vh', marginLeft: '35vw' }}>
             <h3 style={{ textAlign: "center" ,fontWeight:"bold"}}>Créer un compte admin</h3>
             <br />
             <ToastContainer />
             <div className="row mb-3">
               <label  className="col-xl-10 col-sm-2 col-form-label">Email:</label>
               <div className="col-sm-10">
                 <input 
                   type="email"
                   className="form-control"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
               </div>
             </div>

             <div className="row mb-3">
               <label className="col-xl-10 col-sm-2 col-form-label">Nom et Prénom:</label>
               <div className="col-sm-10">
                 <input 
                   type="text"
                   className="form-control"
                   value={fullName}
                   onChange={(e) => setFullName(e.target.value)}
                   required
                 />
               </div>
             </div>

             <div className="row mb-3">
               <label className="col-xl-10 col-sm-2 col-form-label">Numéro téléphone:</label>
               <div className="col-sm-10">
                 <PhoneInput
                   placeholder="Votre numéro de téléphone"
                   required
                   defaultCountry="TN"                    className="form-control"

                   value={phoneNumber}
                   onChange={handleChangePhoneNumber}
                   style={{ marginBottom: "12px" }}
                 />
               </div>
             </div>
             <div className="row mb-3">
               <label className="col-xl-10 col-sm-2 col-form-label">Téléphone 2 (optionnel) :</label>
               <div className="col-sm-10">
                 <PhoneInput
                   placeholder="Votre numéro de téléphone"
                   required
                   defaultCountry="TN"  className="form-control"
                   value={phoneNumber2}
                   onChange={handleChangePhoneNumber2}
                   style={{ marginBottom: "12px" }}
                 />
               </div>
             </div>
             <div className="row mb-3">
               <label className="col-xl-10 col-sm-2 col-form-label">Role:</label>
               <div className="col-sm-10">
                 <select
                   className="form-select"
                   aria-label="Default select example"
                   value={selectedRole}
                   onChange={(e) => setSelectedRole(e.target.value)}
                   required
                 >
                   <option  value="" disabled selected>Role</option>
                   <option  value="ADMINPUB">Admin Publicité</option>
                   <option  value="ADMINCLIENT">Admin Client</option>
                   <option  value="ADMINDEMANDE">Admin Demande</option>
                 </select>
               </div>
             </div>
           
             <br />

             <div className="row mb-3">
               <div className="col-sm-10">
                 <button type="submit" className="btn btn-primary" style={{fontWeight:"bold"}}>
                   Ajouter
                 </button>
               </div>
             </div>
           </form>
         </div>
       </div>
    </main>
  );
};

export default AddAdmin;