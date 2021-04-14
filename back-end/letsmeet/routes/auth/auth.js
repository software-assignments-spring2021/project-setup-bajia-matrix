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


router.post("/", async (req, res, next) => {
  //console.log("wrong");

  const { firstName, lastName, email, password, verifiedPassword } = req.body;
  //console.log(firstName);

  try {
    // Check if the email is duplicating
    const email_val = email.value;
    console.log(email_val);

    let existingUser = await User.findOne({email: email_val} );
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
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
      avatar: "green",
      friends: []
    });
    return res.status(200).json({
      success: true,
      message: "Signup successful.",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Signup failed.",
    });
  }
  

  // const { firstName, lastName, email, password, verifiedPassword } = req.body;
  // const hash = await bcrypt.hash(password, 12);
  // const name1 = firstName + " " + lastName;

  // const user = {
  //       email: email,
  //       name: name1,
  //       passwordHash: hash,
  //       city: "",
  //       state: "",
  //       avatar: "green",
  //       friends: []
  //   }
    //  try {
    // // Check if the email is duplicating
    // let existingUser = await User.findOne({ where: { email } });
    // if (existingUser) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "User already exists.",
    //   });
    // }
  


    //  User.create(user, (err, user) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log(user);
    //     }
    // })
  

    // const id = req.query.userid;
    // console.log("get request on route / with user id " + id);
    // const id = 123;
    // console.log("post request on route /auth");

    // console.log(req.body);


    // axios.post(`${process.env.API_BASE_URL}/users/${id}.json?key=${process.env.API_SECRET_KEY}&__method=POST`, req.body)
    //     .then(response => {
    //         console.log(response.data);
    //             // what is this? console.log("post request on route /events for event with id " + id);
    //         res.send("200 OK");
    //     })
    //     .catch(error => {
    //         next(error);
    //     });
      
});

// Login
// Create token and return to user (httpOnly cookies)
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const email_val = email;
  //console.log(email_val);

  // Make a inquiry of the user through email
  try {
    const user = await User.findOne({ email: email_val } );
    if (!user) {
      return res.json({
        success: false,
        message: "No member exists.",
      });
    }
    const user_id = user.id;
    console.log(user_id);

    // Check password
    //console.log(User.findOne({_id: {user_id}}).select("+passwordHash"));
    const pass = await User.findOne({_id: user_id}).select("+passwordHash");
    //console.log(pass.passwordHash);

      const isMatch = await bcrypt.compare(password, pass.passwordHash);
      if (isMatch) {
        console.log('GOOD');
      // If the password matches,create JWT payload 
        const payload = {
          uid: user.id,
        };
    //   User.findOne({_id: {user_id}}).select('+passwordHash').exec(function (err, user) {
    //     const isMatch = await bcrypt.compare(password, user.passwordHash);
    //     if (isMatch){
    //         console.log('GOOD');
    //         const payload = {
    //           uid: user.id,
    //         };
    //     }
    // });

      // JWT token create
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 });
      //console.log(token);
      // New refresh token and create expiration for it
      // let refresh_token = generateRefreshToken(req, user.id);
      // let refresh_token_maxage = new Date() + req.app.get("jwt_refresh_expiration");

      // // Browswer httpOnly cookie setting
      // res.cookie("access_token", token, {
      //   // secure: true,
      //   httpOnly: true,
      // });
      // res.cookie("refresh_token", refresh_token, {
      //   // secure: true,
      //   httpOnly: true,
      // });


    //   try {
    //     res.send({ user, token })

    // } catch (error) {
    //     res.status(400).send({ error: error.message })
    // }


      // Save the account id as key and save in Redis server
      // req.client.set(
      //   user.id,
      //   JSON.stringify({
      //     refresh_token: refresh_token,
      //     expires: refresh_token_maxage,
      //   }),
      //   req.client.print
      // );

      return res.json({
        success: true,
        uid: user.id,
        message: "Login Successful",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password's don't match.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Login Error",
    });
  }
  
    // const id = 123;
    // axios.get(`${process.env.API_BASE_URL}/users/${id}.json?key=${process.env.API_SECRET_KEY}`)
    //     .then(response => {
    //         //console.log("it worked");

    //         console.log(response.data);
    //         res.json(response.data);
    //     })
    //     .catch(error => {
    //         next(error);
    //     });
});

module.exports = router;