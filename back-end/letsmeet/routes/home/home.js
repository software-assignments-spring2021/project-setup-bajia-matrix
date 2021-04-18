const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({ silent: true }); // save private data in .env file

const User = require("../../models/User");
const Event = require("../../models/Event");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req, res, next) => {
    const userId = req.query.userid;
    console.log("get request on route / with user id " + userId);

    // find all invites
    Event.find({ "invitees.id" : userId })
        .then(invs => {
            const invites = invs;
            
            // find all myEvents
            Event.find({ creatorID : userId })
                .then(myEvs => {
                    const myEvents = myEvs;

                    // find all upcoming events
                    Event.find({ "attendees.id" : userId})
                        .then(upEvs => {
                            const upcomingEvents = upEvs;

                            // generate response and send to client
                            const allEvents = {
                                invites: invites,
                                myEvents: myEvents,
                                upcomingEvents: upcomingEvents
                            }

                            res.json(allEvents);
                        })
                        .catch(error => {
                            console.log("ERROR: Unable to retrieve upcoming events.");
                            console.log(error);
                            res.status(500).send("ERROR 500: Issue retrieving upcoming events");
                        });
                })
                .catch(error => {
                    console.log("ERROR: Unable to retrieve my events.");
                    console.log(error);
                    res.status(500).send("ERROR 500: Issue retrieving my events");
                });
        })
        .catch(error => {
            console.log("ERROR: Unable to retrieve pending invites.");
            console.log(error);
            res.status(500).send("ERROR 500: Issue retrieving pending invites");
        });
});

module.exports = router;