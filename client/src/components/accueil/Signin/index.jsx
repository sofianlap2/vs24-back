import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { useMediaQuery, useTheme } from "@mui/material";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router";
import img from '../../../../public/images/Subtract.svg'

const SignIn = ({ onForgotPasswordClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [verification, setVerification] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    localStorage.clear();
  }, []);

  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${appUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      if (data.token) {
        Cookies.set("token", data.token);
        const role = data.role;
        let redirectUrl;

        if (
          role === "SUPERADMIN" ||
          role === "ADMINPUB" ||
          role === "ADMINCLIENT" ||
          role === "ADMINDEMANDE"
        ) {
          redirectUrl = `/admin/dashboard/${window.btoa(email)}`;
        } else if (role === "CLIENT") {
          redirectUrl = `/client/dashboardClient/${window.btoa(email)}`;
        } else if (role === "PUBLICITAIRE") {
          redirectUrl = `/pub/publicitesManagementPub/${window.btoa(email)}`;
        } else {
          throw new Error("Invalid role");
        }

        window.location.href = redirectUrl;
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      setError(error.message);
      setMessage(error.message);
      if (error.message.includes("verify your email")) {
        setVerification(error.message);
        toast.info(error.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const inputFields = [
    {
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: "Password",
      type: "password",
      placeholder: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  const handleBackClick = () => {
    window.history.back(); // Navigate back to the previous page
  };

  return (
    <form className="login-form" onSubmit={handleSignIn}>
      {isMobile && (
        <div className="back-arrow" onClick={handleBackClick}>
          &#8592;
        </div>
      )}
      <div className="triangle"></div>
      <img
        src={img}
        alt="Login logo"
        className="login-logo"
      />
      {inputFields.map((field, index) => (
        <InputField
          key={index}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          value={field.value}
          onChange={field.onChange}
        />
      ))}
      <div className="button-wrapper">
        <button type="submit" className="submit-button">
          Sign In
        </button>
      </div>
      <br />
      {!isMobile ? (
        <a
          onClick={onForgotPasswordClick}
          className="forgot-password-button"
          style={{ textDecoration: "none" }}
        >
          Forgot password?
        </a>
      ) : (
        <ForgotPassword />
      )}
      <br />
      <ToastContainer />
    </form>
  );
};

export default SignIn;
