const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({ silent: true }); // save private data in .env file

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const User = require("../../models/User");

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
    user.friends = await Promise.all(promises)
    
    // all async calls done, can send to app now
    res.json(user);  
};

router.get("/", async (req, res, next) => {
    const id = req.query.userid;
    console.log("get request on route /profile with user id " + id);
    
    // find user, replace friends with list of names instead of ObjectIds, and send
    User.findById(id)
        .then(user => {
            let viewedUser = JSON.parse(JSON.stringify(user));
            send(res, viewedUser);
        })
        .catch(error => {
            res.status(500).send("ERROR 500: Issue finding user");
            next(error);
        });
});

router.post("/", (req, res, next) => {
    const id = req.body._id;
    console.log("post request on route /profile with user id " + id);
    
    // update by id
    const query = {_id: id};
    User.updateOne(query, req.body)
        .then(updatedUser => {
            res.send("200 OK: Successfully updated user");
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: "ERROR 500: Issue updating user"});
        });
});

module.exports = router;