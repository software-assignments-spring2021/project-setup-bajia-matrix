const express = require("express");
const router = express.Router();

require("dotenv").config({ silent: true })

router.get("/events", (req, res, next) => {
    console.log("get request on route /events")
    res.send("hello")
    // axios.get(`${process.env.API_BASE_URL}/events.json?key=${process.env.API_SECRET_KEY}`)
    // axios.get("https://my.api.mockaroo.com/events.json?key=fe6891f0")
    //     .then(response => {
    //         res.json(response.data);
    //     })
    //     .catch(error => {
    //         next(error);
    //     });
});

module.exports = router;