const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
require("dotenv").config({ silent: true }); // save private data in .env file

const User = require("../../models/User");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// helper method for get request to update names on friends list and send to client
async function send(res, user) {
    const list = user.friends;

    // need to update names because users can change them
    const promises = list.map(async item => {
        const updatedName = await User.findById(item.id)
            .then(user => {
                return user.name;
            })
            .catch(error => {
                console.log(error);
            });
        const updatedItem = {
            id: item.id,
            name: updatedName,
            email: item.email
        };

        return updatedItem;
    })

    // wait until all promises (search user's by id) are done 
    user.friends = await Promise.all(promises);

    // all async calls done, can send to app now
    res.json(user);
};

router.get("/", async (req, res, next) => {

    // If looking to add a friend
    if (req.query.findUser) {
        const searchEmail = req.query.searchEmail;
        console.log("get request on route /profile to find user with email " + searchEmail);

        User.find({ email: searchEmail })
            .then(newFriend => {
                res.json(newFriend);
            })
            .catch(error => {
                console.log("ERROR: Unable to retrieve user with searched email");
                console.log(error);
                res.status(500).send("ERROR 500: Issue finding user with searched email");
            });
    }
    // Find current user
    else {
        const id = req.query.userid;
        console.log("get request on route /profile with user id " + id);

        // find user, update names on friends list in case friends changed their names, then send to client
        User.findById(id)
            .then(user => {
                const viewedUser = JSON.parse(JSON.stringify(user));
                send(res, viewedUser);
            })
            .catch(error => {
                console.log("ERROR: Unable to retrieve user");
                console.log(error);
                res.status(500).send("ERROR 500: Issue finding user");
            });
    }
});

router.post(
    "/",
    body("name").not().isEmpty().trim().escape(),
    body("city").trim().escape(),
    body("state").trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).send(errors.array()[0]);
        }

        const id = req.body._id;
        console.log("post request on route /profile with user id " + id);

        // update by id
        const query = { _id: id };
        User.updateOne(query, req.body)
            .then(updatedUser => {
                res.send("200 OK: Successfully updated user");
            })
            .catch(error => {
                console.log("ERROR: Unable to update user");
                console.log(error);
                res.status(500).send("ERROR 500: Issue updating user");
            });
    });

// to get all event attendees' avis
router.post("/avis", (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "ERROR 500: Issue getting all users" });
        }
        else {
            const avis = [];
            req.body.attendees.forEach(attendee => {
                const temp = users.filter(user => { if (attendee.id === user.id) return user });
                if (temp[0]) {
                    avis.push(temp[0].avatar);
                }
            });
            res.status(200).json(avis);
        }
    })
})

// to get all event attendees' avis
router.post("/sendmail", (req, res, next) => {
    /**
     * Sends email when invite button is clicked via nodemailer
     */
    const nodemailer = require("nodemailer")
    console.log(process.env.GMAIL_PASSWORD)

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "login",
            user: process.env.GMAIL, 
            pass: process.env.GMAIL_PASSWORD
        }
    })

    console.log(req.query)
    transporter.sendMail({
        from: process.env.GMAIL, 
        to: req.query.searchTerm, // change this for testing
        // to: process.env.GMAIL,
        subject: req.query.name + " Invited You to Join Let\'s Meet", 
        text: "Hello " + req.query.searchTerm, 
        generateTextFromHTML: true,
        html: '<h1 style="color: #5e9ca0;">You can edit <span style="color: #2b2301;">this demo</span> text!</h1> \
        <h2 style="color: #2e6c80;">How to use the editor:</h2> \
        <p>Paste your documents in the visual editor on the left or your HTML code in the source editor in the right. <br />Edit any of the two areas and see the other changing in real time.&nbsp;</p> \
        <p>Click the <span style="background-color: #2b2301; color: #fff; display: inline-block; padding: 3px 10px; font-weight: bold; border-radius: 5px;">Clean</span> button to clean your source code.</p> \
        <h2 style="color: #2e6c80;">Some useful features:</h2> \
        <ol style="list-style: none; font-size: 14px; line-height: 32px; font-weight: bold;"> \
        <li style="clear: both;"><img style="float: left;" src="https://html-online.com/img/01-interactive-connection.png" alt="interactive connection" width="45" /> Interactive source editor</li> \
        <li style="clear: both;"><img style="float: left;" src="https://html-online.com/img/02-html-clean.png" alt="html cleaner" width="45" /> HTML Cleaning</li>',
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("ERROR 550: Issue sending email to " + req.query.searchTerm);
        } else {
            console.log("Email sent");
            res.status(200).send("Email successfully sent");
        }
    })
})

module.exports = router;