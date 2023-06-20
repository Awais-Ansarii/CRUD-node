const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: "Full Name is required",
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      required: "Password is required",
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
