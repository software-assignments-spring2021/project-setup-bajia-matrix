#!/usr/bin/env node

const server = require("./app");
require("dotenv").config({ silent: true }); // save private data in .env file
const mongoose = require("mongoose");

const port = 4000;

// setup mongodb
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@letsmeetcluster.bgycl.mongodb.net/LetsMeetDB?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(resolved => console.log("Successfully connected with MongoDB"))
    .catch(err => console.log(err));

// setup server
const listener = server.listen(port, () => {
    console.log("Server running on port: " + port);
});

const close = () => {
    listener.close();
}

module.exports = {
    close: close
}


