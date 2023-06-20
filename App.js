// IMPORTS
const express = require("express"); // Importing Express framework
const cookieParser = require("cookie-parser"); // Importing cookie-parser middleware
const cors = require("cors"); // Importing CORS middleware
const bodyParser = require("body-parser"); // Importing body-parser middleware
const errorMiddleware = require("./Middlewares/Error"); // Importing custom error middleware

// DOTENV CONFIG
require("dotenv").config({ path: "./Configs/config.env" }); // Loading environment variables from config.env file

//EXPRESS
const app = express(); // Creating an instance of the Express application

// CONFIGS
app.use(express.json()); // Parsing JSON bodies
app.use(cookieParser()); // Parsing cookies
app.use(bodyParser.urlencoded({ extended: true })); // Parsing URL-encoded bodies with extended options

// CORS
app.use(cors()); // Allowing Cross-Origin Resource Sharing

// IMPORT LOCAL REQUIRED FILES
const AuthRoute = require("./Routes/auth.routes"); // Importing authentication routes
const ProductRoute = require("./Routes/product.routes"); // Importing product routes
const Authentication = require("./Middlewares/project"); // Importing custom authentication middleware

// USE LOCAL REQUIRED FILES
app.use("/api/auth", AuthRoute); // Mounting authentication routes at "/api/auth"
app.use("/api/items", Authentication, ProductRoute); // Mounting product routes at "/api/items" with authentication middleware

// ERROR HANDLER
app.use(errorMiddleware); // Custom error handling middleware

module.exports = app; // Exporting the Express application as a module
