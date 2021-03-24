const express = require("express");
const router = express.Router();
const axios = require("axios");

require("dotenv").config({ silent: true }); // save private data in .env file

router.get("/events", (req, res, next) => {
    console.log("get request on route /events");
    
    axios.get(`${process.env.API_BASE_URL}/events.json?key=${process.env.API_SECRET_KEY}`)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            next(error);
        });
});

router.get("/invites", (req, res, next) => {
    console.log("get request on route /invites");

    axios.get(`${process.env.API_BASE_URL}/invites.json?key=${process.env.API_SECRET_KEY}`)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;