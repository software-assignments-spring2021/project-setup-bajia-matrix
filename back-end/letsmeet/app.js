const express = require("express");
const app = express();

// server logic 
app.get("/", (req, res) => {
    console.log("get request on route /");
    res.send("hello world");
});

module.exports = app;