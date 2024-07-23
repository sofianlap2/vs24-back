const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendEmail = require("../config/sendEmail ");
const BlackListToken = require("../models/blackListToken");
const asyncErrorHandler = require("./asyncErrorHandler");
require('dotenv').config();

const appUrlFront = process.env.CLIENT_URL;

router.post("/reset",asyncErrorHandler( async (req, res) => {
  const { email } = req.body;

  
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const resetToken = jwt.sign({ email }, "your_secret_key", { expiresIn: "1h" });
    const encodedToken = Buffer.from(resetToken).toString("base64");

    const resetUrl = `${appUrlFront}/resetPassword/${encodedToken}`;
    const emailContent = `
      <p>Salut,</p>
      <p>Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe:</p>
      <a href="${resetUrl}">Réinitialiser Le Mot de Passe</a>
      <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet e-mail en toute sécurité.</p>
    `;

    await sendEmail(email, "Demande de Réinitialisation de Mot de Passe", emailContent);

    return res.status(200).json({ message: "Réinitialiser l\'e-mail envoyé avec succès" });
  
}));

router.post("/reset/:token", asyncErrorHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Decode the token
  const decodedToken = Buffer.from(token, "base64").toString("utf-8");

  jwt.verify(decodedToken, "your_secret_key", async (error, decoded) => {
    if (error) {
      return res.status(400).json({ message: "Token invalide ou expiré" });
    }

    const isTokenBlacklisted = await BlackListToken.exists({ token: decodedToken });
    if (isTokenBlacklisted) {
      return res.status(401).json({ message: "token non valide" });
    }
    // const isTokenBlacklisted = await BlacklistedToken.exists({ token: decodedToken });
    // if (isTokenBlacklisted) {
    //   return res.status(401).json({ message: "token non valide" });
    // }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Check if the new password is the same as the current password
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (isPasswordSame) {
      return res.status(400).json({ message: "Le nouveau mot de passe ne peut pas être le même que l'ancien mot de passe" });
    }

    // Hash the new password and save it
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    // Blacklist the token
    const expiresAt = Date.now() + 3600 * 1000;
    const BlackListToken = new BlackListToken({ token: decodedToken, expiresAt: new Date(expiresAt) });
    await BlackListToken.save();
    // const blacklistedToken = new BlacklistedToken({ token: decodedToken, expiresAt: new Date(expiresAt) });
    // await blacklistedToken.save();

    return res.json({ message: "Réinitialisation du mot de passe réussie" });
  });
}));


module.exports = router;
