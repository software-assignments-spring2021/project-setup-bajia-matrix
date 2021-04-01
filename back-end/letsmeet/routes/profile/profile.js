const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    const id = req.query.userid;
    console.log("get request on route /profile with user id " + id);
    
    axios.get(`${process.env.API_BASE_URL}/users/${id}.json?key=${process.env.API_SECRET_KEY}`)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            next(error);
        });
});

router.post("/", (req, res, next) => {
    const id = req.body.id.$oid;
    console.log("post request on route /profile with user id " + id);
    // console.log(req.body);
    
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