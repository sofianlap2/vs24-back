// authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../config/sendEmail ");
const BlackListToken = require("../models/blackListToken");
//const BlacklistedToken = require("../models/blacklistedToken");
require('dotenv').config();
const appUrlFront= process.env.CLIENT_URL;
function generateToken(user) {
  const token = jwt.sign({ email: user.email }, "key", {
    expiresIn: "24h",
  });
  return token;
}

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).collation({ locale: 'fr', strength: 2 });

    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe invalide" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email ou mot de passe invalide" });
    }

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        });
      } else {
        token.token = crypto.randomBytes(32).toString("hex"); // Generate a new token each time
      }
      await token.save();
      
      const verificationUrl = `${appUrlFront}/users/${user.id}/verify/${token.token}`;
      const emailContent = `
        <p>Bonjour ${user.fullName},</p>
        <p>Merci de vous être inscrit !</p>
        <p>Les détails de votre compte sont les suivants :</p>
        <p>Email: ${email}</p>
        <p>Mot de passe: ${password}</p>
        <p>Veuillez vérifier votre email en cliquant sur le lien suivant :</p>
        <a href="${verificationUrl}">Vérifiez l'email</a>
        <p>Cordialement</p>
        <p>L'équipe de votre application</p>
      `;
      await sendEmail(user.email, "Vérifiez l'email", emailContent);
      console.log("E-mail de vérification envoyé à :", user.email);
      
      return res.status(400).json({ message: "Veuillez vérifier votre email pour continuer." });
    }

    // Fetch role from the database
    const role = user.role; // Assuming role is a property of the User model

    // Generate token
    const token = generateToken(user);

    res.json({ token, role });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la connexion" });
  }
});

router.post("/logout", async(req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const expiresAt = Date.now() + 86400 * 1000;
  const blackListToken = new BlackListToken({
    token: token,
    expiresAt: new Date(expiresAt),
  });

  blackListToken
    .save()
    .then(() => {
      res.json({ message: "Déconnexion réussie" });
    })
    .catch((error) => {
      console.error("Erreur lors de la déconnexion :", error);
      res.status(500).json({ message: "Erreur serveur" });
    });
  // const blacklistedToken = new BlacklistedToken({
  //   token: token,
  //   expiresAt: new Date(expiresAt),
  // });

  // blacklistedToken
  //   .save()
  //   .then(() => {
  //     res.json({ message: "Déconnexion réussie" });
  //   })
  //   .catch((error) => {
  //     console.error("Erreur lors de la déconnexion :", error);
  //     res.status(500).json({ message: "Erreur serveur" });
  //   });
});

module.exports = router;