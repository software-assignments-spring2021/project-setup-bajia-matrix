const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
// const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
require("dotenv").config({ silent: true }); // save private data in .env file

const User = require("../../models/User");

router.use(bodyParser.json());

router.post("/signup",
  body("firstName").not().isEmpty().trim().escape(),
  body("lastName").not().isEmpty().trim().escape(),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  body("verifiedPassword").isLength({ min: 8 }),
  async (req, res, next) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(500).send(errors.array()[0]);
    }
    
    const { firstName, lastName, email, password, verifiedPassword } = req.body;

    try {
      // Check if the email is duplicating
      const email_val = email.value;

      const existingUser = await User.findOne({email: email_val} );
      
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "ERROR 409: User already exists"
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
      const user = await User.findOne({ email: email_val });

      return res.status(200).json({
        success: true,
        uid: user.id,
        message: "200 OK: Signup successful"
      });
    } 
    catch (error) {
      return res.status(500).json({
        success: false,
        message: "ERROR 500: Signup failed"
      });
    }    
  });

// Create token and return to user (httpOnly cookies)
router.post("/signin",
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(500).send(errors.array()[0]);
      }
  const { email, password } = req.body;
  const email_val = email;

  // Make an inquiry of the user through email
  try {
    const user = await User.findOne({ email: email_val } );
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "ERROR 500: No user exists"
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
        message: "200 OK: Login successful"
      });
    } 
    else {
      return res.status(401).json({
        success: false,
        message: "ERROR 401: Passwords don't match"
      });
    }
  } 
  catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "ERROR 401: Login failed"
    });
  }
});

module.exports = router;