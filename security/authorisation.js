const User = require("../models/user");
const BlackListToken = require("../models/blackListToken");
const jwt = require("jsonwebtoken");


async function authorisation(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const tokenD = token.split(' ')[1] ? token.split(' ')[1] : token;

  jwt.verify(tokenD, "key", async (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Token invalide" });
    }

    try {
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return res.status(403).json({ message: "Utilisateur non trouvé" });
      }

      req.userEmail = user.email;
      req.userRole = decoded.role; // Set role from token
      req.userVerified = decoded.verified; // Set verified status from token
req.userId=user._id
      next();
    } catch (error) {
      console.error("Erreur lors de la vérification de l'existence du user:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
}


module.exports = authorisation;
