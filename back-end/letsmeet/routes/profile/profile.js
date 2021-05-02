const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const path = require("path");
require("dotenv").config({ silent: true }); // save private data in .env file

const User = require("../../models/User");
const { remove } = require("../../models/User");

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

// Use to send email invites
router.post("/sendmail", (req, res, next) => {
    /**
     * Sends email when invite button is clicked via nodemailer
     */
    const nodemailer = require("nodemailer");
    
    console.log("post request to send an email to invitee");

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
        to: req.query.searchTerm, // change this for testing
        // to: process.env.GMAIL,
        subject: req.query.name.split(' ')[0] + " Invites You to Join Let\'s Meet", 
        text: "Hello " + req.query.searchTerm, 
        generateTextFromHTML: true,
        html: '<div style="padding: 10px 25px; border: 3px solid #1d38ed; margin: 20px auto; max-width: 600px;"> \
        <img src="cid:LetsMeetLogo" style="width: 100%; margin: 0 auto;"/> \
        <h1 style="color: #1d38ed;">Hey there!</h1> \
        <p style="font-size: 18px;">You\'ve been invited by ' + req.query.name + ' to join Let\'s Meet! \
        Let\'s Meet is a web application designed to help people like you easily coordinate and plan out events. \
        Join us and start creating, accepting, and scheduling events today!</p> \
        <p style="font-size: 18px;">Sign up using this link: <a style="color: #939cf1;" href="http://159.65.191.151/signup">http://159.65.191.151/signup</a></p> \
        <p style="font-size: 18px;">Love,</p> \
        <p style="font-size: 18px;">The Let\'s Meet Team</p> \
        </div> \
        <p style="font-size: 12px; text-align: center;"><span style="color: #808080;">Want to learn more? Visit us at </span><a style="color: #939cf1;" href="http://159.65.191.151">http://159.65.191.151</a></p>',
        attachments: [{
                filename: 'Logo.png',
                path: imagePath,
                cid: 'LetsMeetLogo' // same cid value as in the html img src
            }]
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(550).send("ERROR 550: Issue sending email to " + req.query.searchTerm);
        } else {
            console.log("Email sent successfully");
            res.status(200).send("200 OK: Email sent successfully");
        }
    })
})

// Remove a friend from friends list of user and friend
router.delete("/removefriend", (req, res, next) => {
    const userAccount = req.query.userAccount
    const friendAccount = req.query.friendAccount

    // Remove friend from current user's friend list
    User.findByIdAndUpdate(userAccount, {$pull: {
        friends : {
            id: friendAccount
        }
    }})
        .then(user => {
            // Remove current user from friend's friend list as well
            User.findByIdAndUpdate(friendAccount, {$pull : {
                friends : {
                    id: userAccount
                }
            }})
                .then(user => {
                    res.send("200 OK: Successfully removed each other from friends list");
                })
                .catch(error => {
                    console.log("ERROR: Unable to retrieve friend");
                    console.log(error);
                    res.status(500).send("ERROR 500: Issue finding friend");
                });
        })
        .catch(error => {
            console.log("ERROR: Unable to retrieve user");
            console.log(error);
            res.status(500).send("ERROR 500: Issue finding user");
        });
})

module.exports = router;