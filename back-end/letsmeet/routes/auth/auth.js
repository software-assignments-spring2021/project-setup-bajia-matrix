const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("/", async (req, res, next) => {
  /*const { email, password, first_name, last_name } = req.body;
  try {
    // Check if the email is duplicating
    let existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      password: hash,
      first_name,
      last_name,
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
  */
    const id = 123;
    console.log("post request on route /auth");

    console.log(req.body);


    axios.post(`${process.env.API_BASE_URL}/users/${id}.json?key=${process.env.API_SECRET_KEY}&__method=POST`, req.body)
        .then(response => {
            console.log(response.data);
                console.log("post request on route /events for event with id " + id);

            res.send("200 OK");
        })
        .catch(error => {

            next(error);
        });
});

// Login
// Create token and return to user (httpOnly cookies)
router.get("/", async (req, res, next) => {
  //const { email, password } = req.body;

  // Make a inquiry of the user through email
  /*try {
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No member exists.",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // If the password matches,create JWT payload 
      const payload = {
        uid: user.id,
      };

      // JWT token create
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: req.app.get("jwt_expiration") });

      // New refresh token and create expiration for it
      let refresh_token = generateRefreshToken(req, user.id);
      let refresh_token_maxage = new Date() + req.app.get("jwt_refresh_expiration");

      // Browswer httpOnly cookie setting
      res.cookie("access_token", token, {
        // secure: true,
        httpOnly: true,
      });
      res.cookie("refresh_token", refresh_token, {
        // secure: true,
        httpOnly: true,
      });

      // Save the account id as key and save in Redis server
      req.client.set(
        user.id,
        JSON.stringify({
          refresh_token: refresh_token,
          expires: refresh_token_maxage,
        }),
        req.client.print
      );

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
  */
    const id = 123;
    axios.get(`${process.env.API_BASE_URL}/users/${id}.json?key=${process.env.API_SECRET_KEY}`)
        .then(response => {
            //console.log("it worked");

            console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;