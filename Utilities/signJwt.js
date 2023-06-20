const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library

const signJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); // Signing a JWT with the provided ID and JWT_SECRET from environment variables
};

module.exports = signJWT; // Exporting the signJWT function as the module's default export
