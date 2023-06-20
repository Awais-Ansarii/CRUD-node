const bcrypt = require("bcrypt"); // Importing the bcrypt library
const saltRounds = 10; // Number of salt rounds for password hashing

exports.hashPassword = async (plainTextPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds); // Generating a salt
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt); // Hashing the plain text password with the generated salt
    return hashedPassword; // Returning the hashed password
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.comparePassword = async (plainTextPassword, hashedPassword) => {
  try {
    return bcrypt.compare(plainTextPassword, hashedPassword); // Comparing the plain text password with the hashed password
  } catch (error) {
    return error;
  }
};
