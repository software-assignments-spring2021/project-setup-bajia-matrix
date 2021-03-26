import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";

import classes from "./EventSupplies.module.css";

/*
  TODO: comment about component

  Props:
    This component does not accept any custom props
*/

const EventSupplies = () => {
  const [suppliesState, setSuppliesState] = useState({
    title: "Lunch Date",
    description: "dATE",
    supplies: [
      { id: 1, name: "supply1", price: 12, person: "attendee1", owed: 0 },
      { id: 2, name: "supply2", price: 5, person: "attendee2", owed: 0 },
      { id: 3, name: "supply3", price: 9, person: "attendee3", owed: 0 },
      { id: 4, name: "supply4", price: 1, person: "attendee4", owed: 0 },
      { id: 5, name: "supply5", price: 0, person: "attendee5", owed: 0 },
    ],
  });

  //update state to reflect changes made to the name and/or location fields
  //gotta use callback functions to update objects for state hooks apparently https://reactjs.org/docs/hooks-state.html
  let handleChange = (e) => {
    if (e.target.name === "supplies") {
      setSuppliesState((prevState) => ({
        ...prevState,
        location: e.target.value,
      }));
    }
  };
  let suppliesList = suppliesState.supplies.map(supplies => (
    <>
      <p key={supplies.id}>
        Supply: {supplies.name}  &nbsp;
        Price: {supplies.price}  &nbsp;
        Person: {supplies.person}  &nbsp;
        Amount Owed: {supplies.owed} 

      </p>
    </>
  ));

  //TODO: handle updating user's information in backend
  let saveSupplies = (e) => {
    console.log(suppliesState);
  };
  let splitCosts = (e) => {
    var total = 0;

    for (var index = 0; index < suppliesState.supplies.length; index++) {
      total += suppliesState.supplies[index].price;
    }

    var finalAmount = (total / suppliesState.supplies.length);

    let suppliesCopy = [...suppliesState.supplies];
//negative owed values mean that the person is owed something and doesnt have to pay more
//positive values means that teh person owes an amount
    for (var index = 0; index < suppliesState.supplies.length; index++) {
      var owe = finalAmount - suppliesState.supplies[index].price;
      console.log(suppliesState.supplies[index].owed);
      suppliesCopy[index].owed = owe.toFixed(2);
    }
    setSuppliesState((prevState) => ({
      ...prevState,
      supplies: suppliesCopy,
    }));

    alert("This is the final split amount: " + finalAmount);
  };

  return (
    <Container fluid>
      <Row>
        <div className={classes.Supplies}>
          <Card className={classes.Card}>
            <Card.Title className={classes.Title}></Card.Title>
            <Card.Title className={classes.SuppliesTitle}>
              <h5>Event Supplies</h5>
              <hr className={classes.Hr}/>
            </Card.Title>
            <Card.Body className={classes.SuppliesBody}>
              {suppliesList}
            </Card.Body>
            <Card.Body className={classes.Buttons}>
              <Button
                variant="outline-primary"
                className={classes.Button}
                href="/editsupplies"
              >
                Edit Supplies
              </Button>
              <Button variant="outline-primary" onClick={splitCosts}>
                Split Costs
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default EventSupplies;