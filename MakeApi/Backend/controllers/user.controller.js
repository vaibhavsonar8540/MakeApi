const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");

const register = async (req, res) => {
  const { username, email, dob, role, location, password, confirmPassword } = req.body;
  if (password !== confirmPassword) return res.status(400).send("Passwords do not match");

  const hash = await bcrypt.hash(password, 8);
  const user = new User({ username, email, dob, role, location, password: hash });
    console.log(user)
  await user.save();
  res.status(201).send("User Registered");

};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(401).send("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send("Wrong password");

  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // optional: token expiry
  );

  // ✅ Log inside the controller before sending response
  const logEntry = `${new Date().toISOString()} - ${user.username}, Role: ${user.role}\n`;
  fs.appendFile("log.txt", logEntry, (err) => {
    if (err) console.error("Failed to log user:", err);
  });

  // ✅ Set token as a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS in prod
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // ✅ Also return in response body if needed
  res.status(200).send({ message: "Login success", token });
};


const getAllUsers = async (req, res) => {
  const users = await User.find({}, "-password");
  res.send(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id, "-password");
  res.send(user);
};

const updateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.send("User Updated");
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("User Deleted");
};

module.exports = { register, login, getAllUsers, getUserById, updateUser, deleteUser };
