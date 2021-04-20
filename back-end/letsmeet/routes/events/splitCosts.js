const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const Event = require("../../models/Event");

router.use(bodyParser.json());

const split = (body) => {
    var total = 0;
    for (var index = 0; index < body.supplies.length; index++) {
      total += body.supplies[index].amount;
    }
    var finalAmount = (total / body.supplies.length);
//positive owed values mean that the person is owed something and doesnt have to pay more
//negative values means that teh person owes an amount
    for (var index = 0; index < body.supplies.length; index++) {
      var owe = body.supplies[index].amount - finalAmount;
      //console.log(suppliesState.supplies[index].owed);
      body.supplies[index].owed = owe.toFixed(2);
    }
    return body;
};
router.post("/", (req, res, next) => {
    console.log("post request on route /splitCosts");
    //console.log(req.body);
    //console.log(req.body._id);
    
    // extract data from the request 
    const costs = req.body;
    // initialize response
    const splits = split(costs)
    const su = splits.supplies
    //console.log(su)
    Event.findOneAndUpdate({_id: req.body._id}, { supplies: su }, (err, event) => {
      if (err) {
          console.log(err);
          res.status(500).send("ERROR 500: Issue updating event");
      } else {
          console.log(event);
          res.json(splits.supplies);
          //res.status(200).send("200 OK: Sucessfully added attendee to event");
      }
  });
    //console.log(splits.supplies);
    res.json(splits.supplies);
});

module.exports = router;