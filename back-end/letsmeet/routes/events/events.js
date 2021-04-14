const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Event = require("../../models/Event");

router.get("/", (req, res, next) => {
    const id = req.query.eventid;
    console.log("get request on route /events for event with id " + id);
    
    Event.findById(id)
        .then(event => {
            let thisEvent = JSON.parse(JSON.stringify(event));
            send(res, thisEvent);
        })
        .catch(error => {
            res.status(500).send("ERROR 500: Issue finding event");
            next(error);
        })
});

router.post("/", (req, res, next) => {
    if (req.query.new) {
        console.log(req.body);
        Event.create(req.body, (err, event) => {
            if (err) {
                res.status(500).json({message: "ERROR 500: Issue with creating event"});
            } else {
                res.send({
                    data: "200 OK: Sucessfully created event",
                    newEventURL: event._id
                });
            }
        })
    } else {
        const id = req.body._id;
        console.log("post request on route /events for event with id " + id);

        const query = {_id: id}
        Event.updateOne(query, req.body)
            .then(updatedEvent => {
                res.send("200 OK: Successfully updated event");
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({message: "ERROR 500: Issue updating event"});
            });
    }
    
});

router.delete("/", (req, res, next) => {
    const eventid = req.query.eventid;
    console.log("delete request on route /events with for event with id " + eventid);

    Event.findByIdAndDelete(id)
        .then(deletedEvent => {
            res.send("200 OK: Successfully deleted event");
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: "ERROR 500: Issue deleting event"});
        });
});

module.exports = router;