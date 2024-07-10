const CustomError = require("./CustomError");

module.exports = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorStatus = error.status || "error";

  // Gérer l'erreur de route indéfinie
  if (error.name === "CastError") {
    error = new CustomError(
      `Il n'y a pas d'itinéraire avec cet identifiant ${error.value}`,
      400
    );
  }

  // Gérer la clé dupliquée
  if (error.code === 11000) {
    const keyValue = Object.keys(error.keyValue)[0];
    error = new CustomError(
      `Cette valeur est déjà utilisée dans le champ ${keyValue}`,
      400
    );
  }

  // Gérer la validation d'erreur de mongoose
  if (error.name === "ValidationError") {
    const errorMessage = Object.values(error.errors).map(val => val.message);
    const errorMsgStr = errorMessage.join(', ');
    error = new CustomError(
      `Il y a une erreur de validation sur les champs suivants : ${errorMsgStr}`,
      400
    );
  }

  res.status(statusCode).json({
    status: errorStatus,
    message: error.message,
    errorStack: error.stack,
    error: error,
  });
}
