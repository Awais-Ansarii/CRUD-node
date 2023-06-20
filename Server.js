const app = require("./App"); // Importing the Express application from "./App"
const connectDatabase = require("./Configs/Database"); // Importing the function to connect to the database

// HANDLING UNCAUGHT EXCEPTION
process.on("uncaughtException", (err) => {
  // Handling uncaught exceptions
  console.log(`Error Name: ${err.name}`);
  console.log(`Error Message: ${err.message}`);
  console.log("UNCAUGHT EXCEPTION!💥 SHUTTING down....");

  process.exit(1); // Exiting the process with a non-zero status code to indicate an error
});

// DOTENV CONFIG
require("dotenv").config({ path: "./Configs/config.env" }); // Loading environment variables from config.env file

// CONNECTING TO DATABASE
connectDatabase(); // Connecting to the database

// SERVER LISTEN
const port = process.env.PORT || 5000; // Getting the port number from environment variables or using 5000 as default
const server = app.listen(port, () => {
  // Starting the server and listening on the specified port
  console.log(`SERVER IS WORKING ON ${port}....`);
});

// UNHANDLED PROMISE REJECTION OF DATABASE
process.on("unhandledRejection", (err) => {
  // Handling unhandled promise rejections
  console.log(`Error Name: ${err.name}`);
  console.log(`Error Message: ${err.message}`);
  console.log("UNHANDLED REJECTION!💥 SHUTTING down....");

  server.close(() => {
    // Closing the server gracefully
    process.exit(1); // Exiting the process with a non-zero status code to indicate an error
  });
});
