import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "./EventSupplies.module.css";
import axios from '../../../axios';

/*
  TODO: comment about component

  Props:
    event: event state
*/

const EventSupplies = (props) => {
  const [suppliesState, setSuppliesState] = useState({ supplies: [] });
  const [suppliesListName, setSuppliesListName] = useState();
  const [suppliesListPrice, setSuppliesListPrice] = useState();
  const [suppliesListPerson, setSuppliesListPerson] = useState();
  const [suppliesListOwed, setSuppliesListOwed] = useState();

  useEffect(() => {
    setSuppliesState(props.event);
  }, [props.event]);

  const editSuppliesHandler = () => {
      props.history.push({
        pathname: "/editsupplies",
        state: { suppliesState: JSON.stringify(suppliesState) }
      });
  };

  useEffect(() => {
    let suppliesListName;
    let suppliesListPrice;
    let suppliesListPerson;
    let suppliesListOwed;
    if (suppliesState.supplies) {
      suppliesListName = suppliesState.supplies.map((supplies, index) => (
        <>
          <p key={index}>
            {supplies.supply}
          </p>
        </>
      ));
      setSuppliesListName(suppliesListName);
      suppliesListPrice = suppliesState.supplies.map((supplies, index) => (
        <>
          <p key={index}>
            $ {supplies.amount}
          </p>
        </>
      ));
      setSuppliesListPrice(suppliesListPrice);
      suppliesListPerson = suppliesState.supplies.map((supplies, index) => (
        <>
          <p key={index}>
            {supplies.name}
          </p>
        </>
      ));
      setSuppliesListPerson(suppliesListPerson);
      suppliesListOwed = suppliesState.supplies.map((supplies, index) => (
        <>
          <p key={index}>
           $ {supplies.owed} 
          </p>
        </>
      ));
      setSuppliesListOwed(suppliesListOwed);
    }
  }, [suppliesState.supplies])

  const splitCosts = (e) => {
    //TODO: split costs
    const url = '/splitCosts';
    console.log(suppliesState);

        // "/users/" + userID + ".json?key=fe6891f0&__method=POST"
        axios.post(url , suppliesState)
            .then(response => {
                //console.log(response);
                setSuppliesState({supplies: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });;

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
            <div className="table-responsive">
              <Table striped bordered hover size="sm" className="table table-fixed" >
                <thead>
                  <tr>
                    <th>Supply</th>
                    <th>Amount</th>
                    <th>Name</th>
                    <th>Owed</th>
                   </tr>
                  </thead>
                <tbody>
                    <tr>
                      <td>{suppliesListName}</td>
                      <td>{suppliesListPrice}</td>
                      <td>{suppliesListPerson}</td>
                      <td>{suppliesListOwed}</td>
                    </tr>
                  </tbody>
                </Table> 
              </div>
            </Card.Body>
            <Card.Body className={classes.Buttons}>
              <Button
                variant="outline-primary"
                className={classes.Button}
                onClick={editSuppliesHandler}
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

export default withRouter(EventSupplies);
