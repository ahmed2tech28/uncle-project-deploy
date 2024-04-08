import UserModel from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import catchAsyncErrors from "../utils/catchAsyncErrors.js";
import ErrorHandler from "../utils/Errorhandler.js";

import {verificationEmail} from "../helper/SendMail.js";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  // Check if the user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user with the provided email and password
  const newUser = new UserModel({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  // Generate a verification token and set it in the user's record
  newUser.verificationCode = Math.random().toString(36).substring(7);

  // Save the user to the database
  await newUser.save();

  // Send a verification email
  verificationEmail(newUser);

  const token = jwt.sign({ userId: newUser._id }, "your_secret_key");
  return res.status(201).json({
    success: true,
    message: "User registered. Please check your email for verification.",
    token,
  });
});

// Verification of Email
export const verifyEmail = async (req, res) => {
  const { jwtToken } = req.body;
  const { code } = req.params;
  let userId = "";

  jwt.verify(jwtToken, "your_secret_key", async (err, deco) => {
    userId = deco.userId;
  });

  const user = await UserModel.findOne({ _id: userId, verificationCode: code });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid verification token" });
  }

  // Mark the user as verified and remove the verification token
  user.approved = true;
  user.verificationCode = undefined;
  await user.save();

  return res
    .status(200)
    .json({ success: true, message: "Email verified successfully" });
};

// User login
export const loginUser = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid password" });
  }

  // Generate and send a JWT token for authentication
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ success: true, token, user });
});

export const verifyUser = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.cookies)
  const { token } = req.cookies
  jwt.verify(token, "your_secret_key", async (err, deco) => {
    if (err) {
      return res.json({
        success: false,
        message: "User Not Verifed",
      });
    } else {
      const userLogged = await UserModel.findOne({ _id: deco.userId });
      return res.json({
        success: true,
        message: "User Verifed",
        userLogged,
      });
    }
  });
});
