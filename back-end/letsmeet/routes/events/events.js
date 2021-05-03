const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { body, validationResult } = require('express-validator');
const path = require("path");
require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Event = require("../../models/Event");
const User = require("../../models/User");

async function send(res, event) {
    const attendees = event.attendees;
    const invitees = event.invitees;
    const withdrawns = event.withdrawn;
    const supplies = event.supplies;

    const updatedAttendees = [];
    const updatedInvitees = [];
    const updatedWithdrawns = [];
    const updatedSupplies = [];

    // need to update names because users can change them
    const promises = attendees.map(async attendee => {
        const updatedAttendee = await User.findById(attendee.id)
                                .then(user => {
                                    let userObj;
                                    if (user) {
                                        userObj = {
                                            id: user._id,
                                            name: user.name,
                                            announcement: attendee.announcement
                                        }
                                        return userObj;
                                    }
                                    else {
                                        userObj = {
                                            id: attendee.id,
                                            name: attendee.name,
                                            announcement: attendee.announcement
                                        }
                                        return userObj;
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                });

        updatedAttendees.push(updatedAttendee);
        if(updatedAttendees.length === attendees.length) {
            return updatedAttendees;
        }
    })

    const promises2 = invitees.map(async invitee => {
        const updatedInvitee = await User.findById(invitee.id)
                                .then(user => {
                                    let userObj;
                                    if (user) {
                                        userObj = {
                                            id: user._id,
                                            name: user.name
                                        }
                                        return userObj;
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                });

        updatedInvitees.push(updatedInvitee);
        if(updatedInvitees.length === invitees.length) {
            return updatedInvitees;
        }
    })

    const promises3 = withdrawns.map(async withdrawn => {
        const updatedWithdrawn = await User.findById(withdrawn.id)
                                .then(user => {
                                    let userObj;
                                    if (user) {
                                        userObj = {
                                            id: user._id,
                                            name: user.name
                                        }
                                        return userObj;
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                });

        updatedWithdrawns.push(updatedWithdrawn);
        if(updatedWithdrawns.length === invitees.length) {
            return updatedWithdrawns;
        }
    })

    const promises4 = supplies.map(async supply => {
        const updatedSupply = await User.findById(supply.id)
                                .then(user => {
                                    let supplyObj;
                                    if (user) {
                                        supplyObj = {
                                            id: user._id,
                                            name: user.name,
                                            supply: supply.supply,
                                            amount: supply.amount,
                                            owed: supply.owed
                                        }
                                        return supplyObj;
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                });

        updatedSupplies.push(updatedSupply);
        if(updatedSupplies.length === supplies.length) {
            return updatedSupplies;
        }
    })

    let promiseCreator;
    if (event.creatorID) {
        promiseCreator = await User.findById(event.creatorID)
        .then(user => {
            let updateCreator = {
                name: user.name
            }
            return updateCreator;
        })
        .catch(error => {
            console.log(error);
        });
    }

    // wait until all promises (search user's by id) are done 
    let promiseAttendees = await Promise.all(promises);
    let promiseInvitees = await Promise.all(promises2);
    let promiseWithdrawns = await Promise.all(promises3);
    let promiseSupplies = await Promise.all(promises4);

    if (promiseAttendees.length !== 0) {
        promiseAttendees.forEach(promise => {
            if (promise) {
                event.attendees = promise;
            }
        })
    }
    if (promiseInvitees.length !== 0) {
        promiseInvitees.forEach(promise => {
            if (promise) {
                event.invitees = promise;
            }
        })
    }
    if (promiseWithdrawns.length !== 0) {
        promiseWithdrawns.forEach(promise => {
            if (promise) {
                event.withdrawn = promise;
            }
        })
    }
    if (promiseSupplies.length !== 0) {
        promiseSupplies.forEach(promise => {
            if (promise) {
                event.supplies = promise;
            }
        })
    }
    if (promiseCreator) {
        event.creator = promiseCreator.name;
    }

    Event.findOneAndUpdate({_id: event._id}, event)
        .then(update => {})
        .catch(err => {
            console.log(error);
        })

    // all async calls done, can send to app now
    res.json(event);  
};

router.get("/", (req, res, next) => {
    const id = req.query.eventid;
    console.log("get request on route /events for event with id " + id);

    Event.findById(id, (err, event) => {
        if (err || !event) {
            res.status(500).send("ERROR 500: Issue finding event");
        }
        else {
            send(res, event);
        }
    });
});

// for adding a new attendee to event
// created separate post route in order to use express-validator
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
                    });
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

//send email to invitee when a creator invites a friend
router.post("/emailInvitee", (req, res, next) => {
    /**
     * Sends email when invite button is clicked via nodemailer
     */
    const nodemailer = require("nodemailer")

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "login",
            user: process.env.GMAIL, 
            pass: process.env.GMAIL_PASSWORD
        }
    })

    let imagePath = path.join(__dirname, '/Logo.png');

    req.body.invitees.forEach(invitee => {
        transporter.sendMail({
            from: process.env.GMAIL, 
            to: invitee.email,
            subject: req.body.creator + " wants you at their event!",
            generateTextFromHTML: true,
            html: '<div style="padding: 10px 25px; border: 3px solid #1d38ed; margin: 20px auto; max-width: 600px;"> \
                        <img style="width: 100%; margin: 0 auto;" src="cid:LetsMeetLogo" /> \
                        <h1 style="color: #1d38ed;">Hey ' + invitee.name + ',</h1> \
                        <p style="font-size: 18px;">You\'ve been invited by ' + req.body.creator + ' to their event. <a style="color: #939cf1;" href="http://159.65.191.151/login">Log in</a> now to either accept (or deny) their unrequited invite!</p> \
                        <p style="font-size: 18px;">Love,</p> \
                        <p style="font-size: 18px;">The Let\'s Meet Team</p> \
                    </div>',
            attachments: [{
                    filename: 'Logo.png',
                    path: imagePath,
                    cid: 'LetsMeetLogo'
                }]
        }, (err, data) => {
            if (err) {
                console.log(err);
                res.status(550).send("ERROR 550: Issue sending email to " + invitee.name);
            } else {
                console.log("Email sent to " + invitee.name);
            }
        })
    })
    res.status(200).send("200 OK: Email successfully sent");
})

//send email to creator when an invitee accepts the event
router.post("/emailCreator", (req, res, next) => {
    /**
     * Sends email when submit button is clicked on accept invite page via nodemailer
     */
    const nodemailer = require("nodemailer")


    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "login",
            user: process.env.GMAIL, 
            pass: process.env.GMAIL_PASSWORD
        }
    })

    let imagePath = path.join(__dirname, '/Logo.png');

    transporter.sendMail({
        from: process.env.GMAIL, 
        to: req.body.creatorEmail,
        subject: req.body.invitee.name.split(' ')[0] + " Accepted Your Event Invitation",
        generateTextFromHTML: true,
        html: '<div style="padding: 10px 25px; border: 3px solid #1d38ed; margin: 20px auto; max-width: 600px;"> \
                    <img style="width: 100%; margin: 0 auto;" src="cid:LetsMeetLogo" /> \
                    <h1 style="color: #1d38ed;">Hey ' + req.body.event.creator.split(' ')[0] + ',</h1> \
                    <p style="font-size: 18px;">' + req.body.invitee.name + ' has accepted your event invitation for ' + req.body.event.title + '. \
                    <a style="color: #939cf1;" href="http://159.65.191.151/event/' + req.body.event._id +'">Click here to view your updated attendees list.</p> \
                    <p style="font-size: 18px;">Love,</p> \
                    <p style="font-size: 18px;">The Let\'s Meet Team</p> \
                </div> \
                <p style="font-size: 12px; text-align: center;"><span style="color: #808080;">Log In to see all your events: </span><a style="color: #939cf1;" href="http://159.65.191.151/signin">http://159.65.191.151/signin</a></p>',
        attachments: [{
                filename: 'Logo.png',
                path: imagePath,
                cid: 'LetsMeetLogo'
            }]
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(550).send("ERROR 550: Issue sending email to " + req.body.creatorEmail);
        } else {
            console.log("Email sent to " + req.body.creatorEmail);
        }
    })
    res.status(200).send("200 OK: Email successfully sent");
})

module.exports = router;
