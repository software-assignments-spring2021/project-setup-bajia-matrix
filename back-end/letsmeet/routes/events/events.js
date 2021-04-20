const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

const bodyParser = require("body-parser");
require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Event = require("../../models/Event");
const User = require("../../models/User");

router.get("/", (req, res, next) => {
    const id = req.query.eventid;
    console.log("get request on route /events for event with id " + id);

    Event.findById(id, (err, event) => {
        if (err || !event) {
            res.status(500).send("ERROR 500: Issue finding event");
        }
        else {
            res.json(event);
        }
    });
});

// for adding a new attendee to event
//JOANNE: created separate post route in order to use express-validator
router.post("/newAttendee", body('name').isEmail(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    Event.findOneAndUpdate({_id: req.body.eventID}, { $push: { attendees: {name: req.body.name} } }, (err, event) => {
        if (err) {
            console.log(err);
            res.status(500).send("ERROR 500: Issue updating event");
        } else {
            console.log(event);
            res.status(200).send("200 OK: Sucessfully added attendee to event");
        }
    });
})

router.post("/", (req, res, next) => {
    const id = req.body._id;
    console.log("post request on route /events for event with id " + id);
    const query = {_id: id}
    
    // for creating new event
    if (req.query.new) {
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
        // for when an unverified user signs up after joining an event as an attendee
        if (req.body.attendee) {
            Event.findById(req.body._id, (err, event) => {
                if (err || !event) {
                    res.status(500).send("ERROR 500: Issue finding event");
                }
                else {
                    let name;
                    let id;
                    User.findOne({email: req.body.email}, (err, user) => {
                        if (err || !user) {
                            res.status(500).send("ERROR 500: Issue finding user");
                        } else {
                            event.attendees.filter((attendee, index) => {
                                if (attendee.name === user.email) {
                                    name = user.name;
                                    id = user._id;
                                }
                            })
                            
                            // https://stackoverflow.com/questions/46190153/update-object-inside-the-array-in-mongodb-using-mongoose
                            Event.findOneAndUpdate({_id: req.body._id, "attendees.name":req.body.email}, {$set: {"attendees.$.name":name, "attendees.$.id":id}})
                                .then(updatedEvent => {
                                    res.send("200 OK: Successfully updated event");
                                })
                                .catch(error => {
                                    console.log(error)
                                    res.status(500).json({message: "ERROR 500: Issue updating event"});
                                });
                        }
                    })
                }
            });
        }
        // for just regular ole event updating 
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
    if (req.query.pending) {
        const userId = req.query.userid;
        const eventId = req.query.eventid;
        console.log("delete request on route /events with user id " + userId + " and for event with id " + eventId);
        
        Event.findOneAndUpdate({ _id: eventId }, {$pull: {
            invitees : { 
                id: userId 
            } 
        }})
        .then(response => {
            res.send("200 OK: Successfully removed user from invitee list");
        })
        .catch(error => {
            console.log("ERROR: Unable to find and delete invitee");
            console.log(error);
            res.status(500).json({message: "ERROR 500: Issue deleting invitee"});
        });
    }
    else {
        const eventid = req.query.eventid;
        console.log("delete request on route /events for event with id " + eventid);

        Event.findByIdAndDelete(eventid)
            .then(deletedEvent => {
                res.send("200 OK: Successfully deleted event");
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({message: "ERROR 500: Issue deleting event"});
            });
    }
});

module.exports = router;
