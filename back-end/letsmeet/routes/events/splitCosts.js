const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

const split = (body) => {
    var total = 0;
    for (var index = 0; index < body.supplies.length; index++) {
      total += body.supplies[index].price;
    }
    var finalAmount = (total / body.supplies.length);
//negative owed values mean that the person is owed something and doesnt have to pay more
//positive values means that teh person owes an amount
    for (var index = 0; index < body.supplies.length; index++) {
      var owe = finalAmount - body.supplies[index].price;
      //console.log(suppliesState.supplies[index].owed);
      body.supplies[index].owed = owe.toFixed(2);
    }
    return body;
};
router.post("/", (req, res, next) => {
    console.log("post request on route /splitCosts");
    // extract data from the request 
    const costs = req.body;
    console.log(req.body._id);

    // initialize response
    const splits = split(costs)
    //console.log(splits.supplies);
    res.json(splits.supplies);
});

module.exports = router;