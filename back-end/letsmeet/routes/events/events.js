const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req, res, next) => {
    const id = req.query.eventid;
    console.log("get request on route /event for event with id " + id);
    
    axios.get(`${process.env.API_BASE_URL}/event/${id}.json?key=${process.env.API_SECRET_KEY}`)
        .then(response => {
            console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            next(error);
        });
});

router.post("/", (req, res, next) => {
    const id = req.body.id.$oid;
    console.log("post request on route /events for event with id " + id);
    console.log(req.body);
    
    axios.post(`${process.env.API_BASE_URL}/event/${id}.json?key=${process.env.API_SECRET_KEY}&__method=POST`, req.body)
        .then(response => {
            console.log("backend events post request");
            console.log(response.data);
            res.send("200 OK");
        })
        .catch(error => {
            next(error);
        });
});

router.delete("/", (req, res, next) => {
    const eventid = req.query.eventid;
    console.log("delete request on route /events with for event with id " + eventid);

    axios.delete(`${process.env.API_BASE_URL}/event/${eventid}.json?key=${process.env.API_SECRET_KEY}&__method=DELETE`)
        .then(response => {
            // console.log(response.data);
            res.send("200 OK");
        })
        .catch(error => {
            next(error);
        })
});

module.exports = router;