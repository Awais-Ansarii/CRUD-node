// IMPORTS
const express = require("express"); // Importing Express framework
const cookieParser = require("cookie-parser"); // Importing cookie-parser middleware
const cors = require("cors"); // Importing CORS middleware
const bodyParser = require("body-parser"); // Importing body-parser middleware

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



module.exports = app; // Exporting the Express application as a module
