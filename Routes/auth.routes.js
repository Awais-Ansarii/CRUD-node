const {
  createUser,
  userLogin,
  userLogout,
  verifyAdmin,
} = require("../Controllers/userControllers"); // Importing the user controller functions

const Authentication = require("../Middlewares/project"); // Importing the authentication middleware

const router = require("express").Router(); // Creating an instance of an Express router

router
  .route("/")
  .post(createUser) // Handling HTTP POST requests to create a user account using the createUser controller function
  .get(userLogin) // Handling HTTP GET requests for user login using the userLogin controller function
  .delete(userLogout); // Handling HTTP DELETE requests for user logout using the userLogout controller function

router.route("/verify").get(Authentication, verifyAdmin); // Handling HTTP GET requests for verifying admin status using the Authentication middleware and verifyAdmin controller function

module.exports = router; // Exporting the Express router configuration as a module
