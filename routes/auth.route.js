import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
const route = express.Router();

//register route -
//post

route.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All the fields are required" });
  }
  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //storing user to the database

    const newUser = new User({ name, email, password: hashPassword });

    await newUser.save();

    return res.status(201).json({ message: "User Registered Sucessfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//login route
route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    //email validation
    const userFromDB = await User.findOne({ email });
    if (!userFromDB) {
      return res.status(404).json({ message: "User not found" });
    }

    const comparedPassword = await bcrypt.compare(
      password,
      userFromDB.password
    );
    if (!comparedPassword) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
export default route;
