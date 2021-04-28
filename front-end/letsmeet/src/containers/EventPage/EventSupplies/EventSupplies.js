import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// import custom files and components
import classes from "./EventSupplies.module.css";
import axios from "../../../axios";
import EventContext from "../../../store/event-context";

/*
  This component displays the event supplies on the Event page.
  It includes a button that will direct the user to the Edit Supplies page
  and a button to calculate the cost per person of the event supplies.

  Props:
    This component does not accept any custom props.
*/

const EventSupplies = (props) => {
    const [suppliesState, setSuppliesState] = useState({ supplies: [] });
    const { eventContext, setEventContext } = useContext(EventContext);

    useEffect(() => {
        setSuppliesState(eventContext);
    }, [props.event]);

    const editSuppliesHandler = () => {
        props.history.push({
            pathname: "/editsupplies",
            state: { suppliesState: JSON.stringify(suppliesState) }
        });
    };

    const supplies = suppliesState.supplies.map((sup, index) => {
        return (
            <tr key={index}>
                <td>{sup.name}</td>
                <td>{sup.supply}</td>
                <td>${sup.amount}</td>
                {sup.owed === null ? <td></td> : <td>${sup.owed}</td>}
            </tr>
        );
    });

    const splitCosts = () => {
        axios.post("/splitCosts" , suppliesState)
            .then(response => {
                const copySuppliesState = { ...suppliesState };
                copySuppliesState.supplies = response.data;

                setSuppliesState(copySuppliesState);
            })
            .catch(error => {
                console.log(error);
            });
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
                            <p>A positive amount owed is the amount this person is owed. A negative amount owed is the amount this person should give to those who are owed.</p>
                            <table className={classes.students}>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Supply</th>
                                        <th>Cost</th>
                                        <th>Owed</th>
                                    </tr>
                                    {supplies}
                                </tbody>
                            </table>
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
