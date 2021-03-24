const express = require("express");
const app = express();
const cors = require("cors"); // allow requests between localhost

app.use(cors());

// Import your routes here
app.use("/", require("./routes/home/home"));


module.exports = app;