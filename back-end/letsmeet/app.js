const express = require("express");
const app = express();
// const axios = require("axios");
// require("dotenv").config({ silent: true })
// server logic 
// app.get("/", (req, res) => {
//     console.log("get request on route /");
//     res.send("hello world");
// });

// Import your routes here
// const home = require("./routes/home/home");
app.use("/events", require("./routes/home/home"));

// app.get("/events", (req, res, next) => {
//     console.log("get request on route /events")
//     axios.get(`${process.env.API_BASE_URL}/events.json?key=${process.env.API_SECRET_KEY}`)
//         .then(response => {
//             res.json(response.data);
//         })
//         .catch(error => {
//             next(error);
//         });
// });

module.exports = app;