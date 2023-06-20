const ErrorHandler = require("../Utilities/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // VALIDATION ERROR
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    err = new ErrorHandler(message, 400);
  }

  // WRONG MONGODB ID ERROR
  if (err.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // MONGOOSE DUPLICATE KEY ERROR
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // WRONG JWT ERROR
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token Is Invalid, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE ERROR
  if (err.name === "TokenExpireError") {
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
