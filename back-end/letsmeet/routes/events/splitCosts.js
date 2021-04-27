const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

const Event = require("../../models/Event");

router.use(bodyParser.json());

/*
  This calculates the amount each user owes by finding the average of all costs
  and finding the difference between that average and the amount each person spent.
*/
const calcOwedPerPerson = (supplies) => {
    const dict = [];
    const output = [ ...supplies ];
    let total = 0;
    let count = 0;
    let currName;
    let currVal;
    let updatedVal;

    // initialize dict of {user's name: total amount for that user}
    for (let index = 0; index < supplies.length; index++){
        currName = supplies[index].name;
        currVal = supplies[index].amount;

        if (currName in dict) {
            // if name already in dict, add current value to existing value
            updatedVal = parseFloat(dict[currName]) + parseFloat(currVal);
            dict[currName]= updatedVal;
        }
        else {
            // create new entry in dict and initialize to current value
            dict[currName] = currVal;
            count++;
        }
    
        total += parseFloat(currVal);
    }

    const average = (total / count).toFixed(2);

    // calculate the difference between each user's cost and the average (amount owed)
    for (let index = 0; index < supplies.length; index++) {
        currName = supplies[index].name;
        if (currName in dict) {
            // want the amount owed to show up once for each user
            output[index].owed = dict[currName].toFixed(2) - average;
            delete dict[currName];
        }
        else {
            // amount owed already calculated for this user in a different row, don't include one for this row
            output[index].owed = null;
        }
    }
    return output;
}

// Sort the array of supplies alphabetically by the name of the user who purchased the supply.
const sortByName = (array) => {
    return (array.sort((a, b) => {
        const nameA = a.name.toUpperCase(); 
        const nameB = b.name.toUpperCase(); 
        if (nameA > nameB) {
            return 1;
        }
        else if (nameA < nameB) {
            return -1;
        }
        else {
            return 0;
        }
    }));
};

router.post(
    "/",
    body("supplies").notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).send(errors.array()[0]);
        }

        console.log("post request on route /splitCosts");
      
        // extract data from the request 
        const event = req.body;
      
        const sortedSupplies = sortByName(event.supplies);
        const calculatedSupplies = calcOwedPerPerson(sortedSupplies);
        
        Event.findOneAndUpdate({ _id: req.body._id }, { supplies: calculatedSupplies }, (err, event) => {
            if (err) {
                console.log(err);
                res.status(500).send("ERROR 500: Issue updating event");
            } 
            else {
                res.json(event);
            }
        });
});

module.exports = router;