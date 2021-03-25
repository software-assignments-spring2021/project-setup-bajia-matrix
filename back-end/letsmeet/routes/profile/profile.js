const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.json());

router.get("/profile", (req, res, next) => {
    console.log("get request on route /profile");
    
    axios.get(`${process.env.API_BASE_URL}/users.json?key=${process.env.API_SECRET_KEY}`)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            next(error);
        });
});

router.post("/profile", (req, res, next) => {
    console.log("post request on route /profile");
    console.log(req.body);
    const id = req.body.id.$oid;
    axios.post(`${process.env.API_BASE_URL}/users/${id}.json?key=${process.env.API_SECRET_KEY}&__method=POST`, req.body)
        .then(response => {
            // console.log(response.data);
            res.send("200 OK");
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;