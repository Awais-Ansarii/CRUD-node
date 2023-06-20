const { cookieParser } = require("../Utilities/cookieParser"); // Importing the cookieParser utility function
const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library
const User = require("../Models/userModel"); // Importing the User model

const Authentication = async (req, res, next) => {
  const cookies = req.headers.cookie || ""; // Extracting the cookies from the request headers

  try {
    const cookieObj = cookieParser(cookies); // Parsing the cookies using the cookieParser utility function
    const token = cookieObj["token"]; // Extracting the token from the parsed cookies

    if (!token)
      throw { name: "Authentication Failed", message: "token not found" }; // Throwing an error if the token is not found

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifying the token using the JWT_SECRET from environment variables
    const user = await User.findById(decoded.id).select("-password"); // Finding the user by their ID from the decoded token, excluding the password field

    if (!user)
      throw { name: "Authentication Failed", message: "User not found" }; // Throwing an error if the user is not found

    req.user = user; // Assigning the user object to the req.user property for accessing it in subsequent middleware or route handlers
    next(); // Calling the next middleware or route handler
  } catch (error) {
    console.log("token error", error);
    res.clearCookie("token"); // Clearing the token cookie
    return res.status(401).send({ name: error.name, message: error.message }); // Sending an unauthorized response with the error details
  }
};

module.exports = Authentication; // Exporting the authentication middleware function
