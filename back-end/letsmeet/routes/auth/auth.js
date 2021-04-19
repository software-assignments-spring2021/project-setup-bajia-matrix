const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("../../models/User");
const jwt = require('jsonwebtoken')
require("dotenv").config({ silent: true }); // save private data in .env file
const bcrypt = require("bcryptjs");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/signup", async (req, res, next) => {
  const { firstName, lastName, email, password, verifiedPassword } = req.body;

  try {
    // Check if the email is duplicating
    const email_val = email.value;

    const existingUser = await User.findOne({email: email_val} );
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists."
      });
    }
    const hash =   await bcrypt.hash(verifiedPassword.value, 12);
    const name1 = firstName.value + " " + lastName.value;
    await User.create({
      email: email.value,
      name: name1,
      passwordHash: hash,
      city: "",
      state: "",
      avatar: "red",
      friends: []
    });
    const user = await User.findOne({ email: email_val } );

    return res.status(200).json({
      success: true,
      uid: user.id,
      message: "Signup successful.",
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signup failed."
    });
  }    
});

// Create token and return to user (httpOnly cookies)
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const email_val = email;

  // Make an inquiry of the user through email
  try {
    const user = await User.findOne({ email: email_val } );
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "No member exists.",
      });
    }
    const user_id = user.id;

    // Check password
    const pass = await User.findOne({_id: user_id}).select("+passwordHash");

    const isMatch = await bcrypt.compare(password, pass.passwordHash);
    if (isMatch) {
      // If the password matches,create JWT payload 
      const payload = {
        uid: user.id,
      };

      // JWT token create
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 });

      return res.status(200).json({
        success: true,
        uid: user.id,
        message: "Login Successful",
      });
    } 
    else {
      return res.status(401).json({
        success: false,
        message: "Password's don't match.",
      });
    }
  } 
  catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Login Error",
    });
  }
});

module.exports = router;