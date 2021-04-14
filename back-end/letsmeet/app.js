const express = require("express");
const app = express();
const cors = require("cors"); // allow requests between localhost

app.use(cors());

// Import your routes here
app.use("/", require("./routes/home/home"));
app.use("/profile", require("./routes/profile/profile"));
app.use("/events", require("./routes/events/events"));
app.use("/auth", require("./routes/auth/auth"));
app.use("/auth/login", require("./routes/auth/auth"));
app.use("/suggestedTimes", require("./routes/events/suggestedTimes"));
app.use("/splitCosts", require("./routes/events/splitCosts"));



module.exports = app;