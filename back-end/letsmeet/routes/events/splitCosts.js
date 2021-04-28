const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

const Event = require("../../models/Event");

router.use(bodyParser.json());


const SamePerson = (body) =>{
  var dict = [];
  var b2 = [... body];
  var total = 0;
  var count = 0;
  for (var index = 0; index < body.length; index ++){
    total += parseFloat(body[index].amount);
    if (body[index].name in dict){
      var val = parseFloat(dict[body[index].name]) + parseFloat(body[index].amount);
      dict[body[index].name]= val;
    }
    else{
   
    dict[body[index].name] = body[index].amount;
    count ++;
    }


  }
  var average = (total / count).toFixed(2);

  console.log(total)
  console.log(dict);
  for (var index = 0; index < body.length; index ++){
    if (body[index].name in dict){
        b2[index].owed = dict[body[index].name].toFixed(2) - average;
        delete dict[body[index].name];
    }
    else{
      b2[index].owed = null;
    }


    
  }
 //console.log(b2) 4.25  4.7 --- 

 console.log(dict);
 return b2;
}
const sortIt = (array) => {
  return (array.sort((a, b) => {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
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

// const split = (body) => {


  
//     var total = 0;
//     for (var index = 0; index < body.supplies.length; index++) {
//       total += parseFloat(body.supplies[index].amount);
//     }

//     var finalAmount = (total / body.supplies.length);
//     //console.log(total)
// //positive owed values mean that the person is owed something and doesnt have to pay more
// //negative values means that teh person owes an amount
//     for (var index = 0; index < body.supplies.length; index++) {
//       var owe = body.supplies[index].amount - finalAmount;
//       //console.log(suppliesState.supplies[index].owed);
//       body.supplies[index].owed = owe.toFixed(2);
//     }
//     return body;
// };
router.post("/",
    body("supplies").notEmpty(),
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(500).send(errors.array()[0]);
      }
    console.log("post request on route /splitCosts");
    console.log(req.body);
    //console.log(req.body._id);
    
    // extract data from the request 
    const costs = req.body;
    // initialize response
    //const splits = split(costs)
    //console.log(splits)
    const su = sortIt(costs.supplies)
   var x = SamePerson(su)
    //console.log(su)
    Event.findOneAndUpdate({_id: req.body._id}, { supplies: x }, (err, event) => {
      if (err) {
          console.log(err);
          res.status(500).send("ERROR 500: Issue updating event");
      } else {
          //console.log(event);
          res.json(x);
          //res.status(200).send("200 OK: Sucessfully added attendee to event");
      }
  });
    
});

module.exports = router;