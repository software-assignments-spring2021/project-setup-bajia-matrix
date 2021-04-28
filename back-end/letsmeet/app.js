const express = require("express");
const app = express();
const cors = require("cors"); // allow requests between localhost during development

app.use(cors());

// imported routes
app.use("/", require("./routes/home/home"));
app.use("/profile", require("./routes/profile/profile"));
app.use("/events", require("./routes/events/events"));
app.use("/auth", require("./routes/auth/auth"));
app.use("/suggestedTimes", require("./routes/events/suggestedTimes"));
app.use("/splitCosts", require("./routes/events/splitCosts"));

module.exports = app;