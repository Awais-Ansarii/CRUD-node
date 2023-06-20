const User = require("../Models/userModel"); // Importing the User model
const signJWT = require("../Utilities/signJwt"); // Importing the signJWT utility function
const { hashPassword, comparePassword } = require("../Utilities/hashPassword"); // Importing the hashPassword and comparePassword utility functions

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .send({ message: "User Already exists with the same email" });

    const hashedPassword = await hashPassword(password); // Hashing the password using the hashPassword utility function

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    }); // Creating a new user document in the database

    return res.status(201).json({ fullName: user.fullName, email: user.email });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Failed To create user", error: error.message });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.query;

  if (email === "" || email.password === "") {
    return res.status(400).send("cannot be empty field");
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).send({ message: "User Not Found" });

    const isCorrectPassword = await comparePassword(password, user.password); // Comparing the provided password with the hashed password using the comparePassword utility function
    if (!isCorrectPassword)
      return res.status(402).send({ message: "Incorrect Password" });

    const token = signJWT(user.id); // Generating a JWT token using the signJWT utility function
    res.cookie(String("token"), token, {
      path: "/",
      maxAge: 24 * 60 * 60 * 100,
      httpOnly: true,
    }); // Setting the token as a cookie in the response

    return res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.userLogout = async (req, res) => {
  try {
    res.cookie(String("token"), "", {
      path: "/",
      maxAge: 1,
      httpOnly: true,
    }); // Clearing the token cookie by setting it to an empty string and a short maxAge

    res.status(200).send({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.verifyAdmin = (req, res) => {
  res.status(202).json(req.user);
};
