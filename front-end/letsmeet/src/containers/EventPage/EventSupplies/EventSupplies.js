import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { WindowsFilled } from "@ant-design/icons";

// import custom files and components
import classes from "./EventSupplies.module.css";
import axios from '../../../axios';

/*
  This component displays the event supplies on the Event page.
  It includes a button that will direct the user to the Edit Supplies page
  and a button to calculate the cost per person of the event supplies.

  Props:
    event: event state
*/

const EventSupplies = (props) => {
    const [suppliesState, setSuppliesState] = useState({ supplies: [] });
    // const [localSupplies, setLocalSupplies] = useState([]);

    useEffect(() => {
        setSuppliesState(props.event);
        // setLocalSupplies(props.event.supplies);
    }, [props.event]);

    const editSuppliesHandler = () => {
        props.history.push({
            pathname: "/editsupplies",
            state: { suppliesState: JSON.stringify(suppliesState) }
        });
    };

  // useEffect(() => {
  //     let suppliesEntry;
  //     console.log("hello")
  //     if (suppliesState.supplies) {
  //         suppliesEntry = suppliesState.supplies.map((sup, index) => {
  //             return (
  //                 <tr key={index}>
  //                     <td>{sup.name}</td>
  //                     <td>{sup.supply}</td>
  //                     <td>${sup.amount}</td>
  //                     <td>${sup.owed}</td>
  //                 </tr>
  //             );
  //         });
  //         setSupplies(suppliesEntry);
  //     }
  // }, [suppliesState]);

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
        console.log(suppliesState)
        // const copySuppliesState = { ...suppliesState };
        // copySuppliesState.supplies = localSupplies;

        axios.post("/splitCosts" , suppliesState)
            .then(response => {
                // setSuppliesState({ supplies: response.data });
                // console.log(response.data);
                // props.location.state.eventState = response.data;
                // console.log(props.location.state)
                // setLocalSupplies(response.data);
                // copySuppliesState.supplies = response.data;
                setSuppliesState({ supplies: response.data });
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
