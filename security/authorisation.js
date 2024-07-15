const User = require("../models/user");
const BlacklistedToken = require("../models/blacklistedToken");
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

    req.userEmail = decoded.email; // Storing decoded email on request object
    try {
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return res.status(403).json({ message: "Utilisateur non trouvé" });
      }

      req.userId = user._id; // Add user ID to the request object
      req.userRole = user.role;
      req.userVerified = user.verified;
      const isTokenBlacklisted = await BlacklistedToken.exists({ token });

      if (isTokenBlacklisted) {
        return res.status(401).json({ message: "Token invalide" });
      }

      next();
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'existence du user:",
        error
      );
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
}

module.exports = authorisation;
