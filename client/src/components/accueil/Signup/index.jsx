import React, { useState, useEffect } from "react";
import Video from "../../../videos/video.mp4";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import {
  FormInput,
  Container,
  FormWrap,
  Form,
  FormContent,
  FormH1,
  FormLabel,
  Icon,
  FormButton,
  HeroBg,
  VideoBg,
  FormLinks,
  Text,
} from "./SignupElement";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [reqBody, setReqBody] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${appUrl}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (response.ok) {
        const res = await response.json();
        setMsg(res.message);
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed: Server error occurred");
        setMsg("");
      }
    } catch (error) {
      setError("Signup failed: An unexpected error occurred");
      setMsg("");
    }
  };

  useEffect(() => {
    if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
      setPhoneErrorMessage("");
    }
  }, [phoneNumber]);

  const handleChangePhoneNumber = (value) => {
    setPhoneNumber(value);
    if (value && !isValidPhoneNumber(value)) {
      setPhoneErrorMessage("Please enter a valid phone number.");
    } else {
      setPhoneErrorMessage("");
      setReqBody({ ...reqBody, phoneNumber: value });
    }
  };

  return (
    <Container>
      <FormWrap>
        <HeroBg>
          <Icon to="/">
            <img
              src="../../images/RemoteHub.png"
              height="60"
              alt="RemoteHub Logo"
              loading="lazy"
            />
          </Icon>
          <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
        </HeroBg>
        <FormContent>
          <Form onSubmit={handleSignUp}>
            <FormH1>Connectez-vous à votre compte</FormH1>

            <FormLabel htmlFor="fullName">Nom et Prénom</FormLabel>
            <FormInput
              type="text"
              placeholder="Votre nom"
              required
              onChange={(e) =>
                setReqBody({ ...reqBody, fullName: e.target.value })
              }
            />
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              type="email"
              placeholder="Votre Email"
              required
              onChange={(e) =>
                setReqBody({ ...reqBody, email: e.target.value })
              }
            />

            <FormLabel htmlFor="phoneNumber">Numéro Téléphone</FormLabel>
            <PhoneInput
              placeholder="Votre numéro téléphone"
              required
              defaultCountry="TN"
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
              style={{
                marginBottom: "12px",
              }}
            />
            {phoneErrorMessage && (
              <div style={{ color: "red" }}>{phoneErrorMessage}</div>
            )}

            <FormLabel htmlFor="password">Mot de passe</FormLabel>
            <FormInput
              type="password"
              placeholder="Votre mot de passe"
              autoComplete="new-password"
              required
              onChange={(e) =>
                setReqBody({ ...reqBody, password: e.target.value })
              }
            />

            <FormLabel htmlFor="confirmPassword">Confirmez mot de passe</FormLabel>
            <FormInput
              type="password"
              required
              placeholder="Confirmez votre mot de passe"
              autoComplete="new-password"
              onChange={(e) =>
                setReqBody({ ...reqBody, confirmPassword: e.target.value })
              }
            />
            {error && (
              <div style={{ marginTop: "2vh", color: "red" }}>{error}</div>
            )}
            {msg && (
              <div style={{ marginTop: "2vh", color: "green" }}>{msg}</div>
            )}
            <FormButton type="submit">Inscrivez</FormButton>
            <Text>
              Vous avez déjà un compte ?
              <FormLinks to="/signin">Connectez-vous</FormLinks>
            </Text>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default SignUp;
