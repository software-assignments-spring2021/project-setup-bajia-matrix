const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({ silent: true }); // save private data in .env file

const User = require("../../models/User");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    // const user = {
    //     email: "AlexTim0@gmail.com",
    //     name: "Alex Time",
    //     passwordHash: "password",
    //     city: "New York City",
    //     state: "New York",
    //     avatar: "orange",
    //     friends: [mongoose.Types.ObjectId("606fa10098eb9f8d8a7bdb5f")]
    // }
    // User.create(user, (err, user) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log(user);
    //     }
    // })
    const id = req.query.userid;
    console.log("get request on route / with user id " + id);
    
    // TODO: change to fetch events and invites for user id
    axios.get(`${process.env.API_BASE_URL}/events.json?key=${process.env.API_SECRET_KEY}`)
        .then(eventsResponse => {
            // console.log(eventsResponse.data);
            let data = { events: eventsResponse.data.events }
            axios.get(`${process.env.API_BASE_URL}/invites.json?key=${process.env.API_SECRET_KEY}`)
                .then(invitesResponse => {
                    let updateData = { 
                        ...data,
                        invites: invitesResponse.data.invites
                    };

                    res.json(updateData);
                })
                .catch(error => {
                    next(error);
                });
        })
        .catch(error => {
            next(error);
        });
});

router.delete("/", (req, res, next) => {
    const id = req.query.userid;
    const eventid = req.query.eventid;
    console.log("delete request on route / with user id " + id + " and for event with id " + eventid);

    axios.delete(`${process.env.API_BASE_URL}/invites/${eventid}.json?key=${process.env.API_SECRET_KEY}&__method=DELETE`)
        .then(response => {
            // console.log(response.data);
            res.send("200 OK");
        })
        .catch(error => {
            next(error);
        })
});

module.exports = router;