import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const UpdateUser = () => {
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { email, userId } = useParams();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [reqBody, setReqBody] = useState({
    fullName: "",
    phoneNumber: "",
    phoneNumber2: "",
    email: "",
    nomEntreprise: "",
    role: "",
  });

  useEffect(() => {
    const fetchEspaceDetails = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${appUrl}/users/getUser/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        });
        setReqBody(response.data);
        setPhoneNumber(response.data.phoneNumber);
        setPhoneNumber2(response.data.phoneNumber2);
      } catch (error) {
        toast.error("Failed to fetch user details.");
      }
    };

    fetchEspaceDetails();
  }, [email, userId]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        `${appUrl}/users/updateUser/${userId}`,
        {
          ...reqBody,
          phoneNumber,
          phoneNumber2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        }
      );

      toast.success("Utilisateur est mis à jour avec succès");
      setTimeout(() => {
        navigate(`/dashboard/${window.btoa(email)}`);
      }, 6500);
    } catch (error) {
      toast.error("Il y a une erreur lors de la mise à jour d'utilisateur");
    }
  };

  const handleChangePhoneNumber = (value) => {
    if (value && !isValidPhoneNumber(value)) {
      toast.error("Veuillez entrer un numéro de téléphone valide.");
    } else {
      setPhoneNumber(value); // Set phoneNumber if valid
      setReqBody({ ...reqBody, phoneNumber: value }); // Update reqBody
    }
  };

  const handleChangePhoneNumber2 = (value2) => {
    if (value2 && !isValidPhoneNumber(value2)) {
      toast.error(
        "Veuillez entrer un numéro de téléphone valide pour Téléphone 2."
      );
      setPhoneNumber2(value2);
      setReqBody({ ...reqBody, phoneNumber2: "" }); // Clear phoneNumber2 in reqBody
    } else {
      setPhoneNumber2(value2);
      setReqBody({ ...reqBody, phoneNumber2: value2 });
    }
  };

  return (
    <main id="updateUser" className="updateUser">
      <div style={{ display: "flex" }}>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <form
            onSubmit={handleFormSubmit}
            style={{ marginTop: "15vh", width: "60%", marginLeft: "25vw" }}
          >
            <h3 style={{ fontFamily: "Constantia", fontWeight: "bold" }}>
              Mettre à jour un utilisateur
            </h3>
            <br />
            <ToastContainer />
            <div>
              <label >Nom et prénom:</label>
              <input
                    className="form-control"
                type="text"
                value={reqBody.fullName}
                onChange={(e) =>
                  setReqBody({ ...reqBody, fullName: e.target.value })
                }
              />
            </div>
            <br />
            <div>
              <label >Email:</label>
              <input
                    className="form-control"
                type="text"
                value={reqBody.email}
                onChange={(e) =>
                  setReqBody({ ...reqBody, email: e.target.value })
                }
              />
            </div>
            <br />
            <div>
              <label >
                Nom d'entreprise:
              </label>
              <input
                    className="form-control"
                type="text"
                value={reqBody.nomEntreprise}
                onChange={(e) =>
                  setReqBody({ ...reqBody, nomEntreprise: e.target.value })
                }
              />
            </div>
            <br />
            <div className="row mb-3">
              <label
                className="col-xl-10 col-sm-2 col-form-label"
                  >
                Numéro téléphone:
              </label>
              <div className="col-sm-10">
                <PhoneInput
                  placeholder="Votre numéro de téléphone"
                  className="form-control"
                  required
                  defaultCountry="TN"
                  value={phoneNumber}
                  onChange={handleChangePhoneNumber}
                  style={{ marginBottom: "12px" }}
                />
              </div>
            </div>
            <br />
            <div className="row mb-3">
              <label
                className="col-xl-10 col-sm-2 col-form-label"
                  >
                Téléphone 2 (optionnel) :
              </label>
              <div className="col-sm-10">
                <PhoneInput
                  placeholder="Votre numéro de téléphone"
                  className="form-control"
                  defaultCountry="TN"
                  value={phoneNumber2}
                  onChange={handleChangePhoneNumber2}
                  style={{ marginBottom: "12px" }}
                />
              </div>
            </div>
            <div>
              <label >Role:</label>
              <select
                className="form-select"
                value={reqBody.role}
                onChange={(e) =>
                  setReqBody({ ...reqBody, role: e.target.value })
                }
              >
                <option
                        value=""
                  disabled
                  selected
                >
                  Role
                </option>
                <option  value="SUPERADMIN">
                  Super Admin
                </option>
                <option  value="ADMINPUB">
                  Admin Publicité
                </option>
                <option
                        value="ADMINCLIENT"
                >
                  Admin Client
                </option>
                <option
                        value="ADMINDEMANDE"
                >
                  Admin Demande
                </option>
                <option  value="CLIENT">
                  Client
                </option>
                <option
                        value="PUBLICITAIRE"
                >
                  Publicitaire
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-success"
              style={{
                marginTop: "2vh",
                fontWeight: "bold",
              }}
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UpdateUser;
