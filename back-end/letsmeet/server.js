#!/usr/bin/env node

const server = require("./app");
require("dotenv").config({ silent: true }); // save private data in .env file
const mongoose = require("mongoose");
const port = 4000;

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@letsmeetcluster.bgycl.mongodb.net/LetsMeetDB?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("LetsMeetDB").collection("appData");
//   // perform actions on the collection object
//   client.close();
// });
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(resolved => console.log("success"))
    .catch(err => console.log(err));

const listener = server.listen(port, () => {
    console.log("Server running on port: " + port);
});

const close = () => {
    listener.close();
}

module.exports = {
    close: close
}


