function errorHandler(error, req, res, next) {
  if (error.hasOwnProperty("code")) {
    res.status(error.code).json({ message: error.message });
  } else if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError") {
    res.status(400).json({message: error.errors[0].message});
  } else if (error.name === "InvalidToken" || error.name === "JsonWebTokenError") {
    res.status(401).json({message: "Invalid token"});
  } else {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = errorHandler;


