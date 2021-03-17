import React, { useState, useEffect, useReducer } from 'react';
import { Container, Row, Col, Button, Navbar, Card, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './EditSupplies.module.css';
import axios from '../../axios';
import EventTitle from '../../components/EventParts/EventTitle/EventTitle';
import Text from '../../components/UI/Text/Text';

const EditSupplies = (props) => {
    const [suppliesState, setSuppliesState] = useState({
        title: "Study Date",
        day: "Wednesday",
        date: "Feb 17th",
        time: "4:30 - 5:30 pm",
        supplies: [
            {id: 1, supply: "boba tea", name: "Raddy", amount: 30.00},
            {id: 2, supply: "muffins", name: "Micky", amount: 25.99}
        ]
    });

    useEffect(() => {
        // fetch event info to display
        // TODO: fetch event that has selected event id
        axios.get("/events.json?key=fe6891f0")
            .then(response => {
                const list = response.data.events;
                setSuppliesState(list[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const formReducer = (state, event) => {
        return {
            ...state, // keep old formData
            [event.name]: event.value // either addSupply: value or amount: value
        }
    };

    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useReducer(formReducer, {});
    
    let suppliesList = suppliesState.supplies.map(sup => {
        return <li key={sup.id}>{sup.supply} - {sup.name}</li>;
    });

    let inputChangedHandler = (event) => {
        setFormData({
            // this is the "name" and "value" formReducer use to update formData
            name: event.target.name,
            value: event.target.value
        });
        console.log(formData);
    };

    let submitHandler = (event) => {
        // prevents reload so don't fetch from backend again
        // instead will update state and display from there
        // TODO: if supplies list doesn't update with added supply, remove this
        event.preventDefault();

        setSubmitting(true);

        // update supplies list immutably using copy
        const copySupplies = { ...suppliesState};
        const list = copySupplies.supplies;

        // TODO: should change to generate new mongoDB id
        const newId = list[list.length - 1] + 1;

        list.push({
            id: newId,
            supply: formData.addSupply,
            name: "Timmy", // TODO: replace with name of current user
            amount: formData.amount
        })

        setSuppliesState(copySupplies);
        // send to database
        
        axios.post("/events/" + suppliesState.id + ".json?key=fe6891f0", suppliesState)
            .then(response => {
                console.log(response);
                setSubmitting(false);
            });

        // TODO: remove when have real api
        // to simulate sending to database
        setTimeout(() => {
            setSubmitting(false);
        }, 3000);
    };

    return (
        <Container fluid>
            <Row>
                <Col className="md-12">
                    <Navbar>
                        {/* TODO: update link to myevent */}
                        <Link to="/" exact>
                            <Navbar.Text>Cancel</Navbar.Text>
                        </Link>
                        
                        <Navbar.Collapse className="justify-content-center">
                            <Navbar.Brand>
                            <h4>Edit Event Supplies</h4>
                            </Navbar.Brand>
                        </Navbar.Collapse>
                    </Navbar>
                    <hr />
                </Col>
            </Row>

            <Row>
                <div className={classes.EditSupplies}>
                    <EventTitle 
                        title={suppliesState.title}
                        day={suppliesState.day}
                        date={suppliesState.date}
                        time={suppliesState.time} />
                    <h5>Current Supplies</h5>
                    <div className={classes.Supplies}>
                        <Card className={classes.Card} >
                            <Card.Body className={classes.CardBody}>
                                <ul>
                                    {suppliesList}
                                </ul>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Row>

            <Row>
                <div>
                    <form onSubmit={submitHandler}>
                        <h5>Enter new supply and the amount spent on it</h5>
                        <fieldset>
                            <label>
                                <p>Supply</p>
                                <input className={classes.Input} type="text" name="addSupply" required onChange={(event) => inputChangedHandler(event)} />
                            </label>
                            <label>
                                <p>Amount</p>
                                <input className={classes.Input} type="number" name="amount" min="0.00" max="1000.00" step="0.01" required onChange={(event) => inputChangedHandler(event)} />
                            </label>
                        </fieldset>
                        <Button variant="secondary" type="submit">Done</Button>
                        
                        {submitting ? <p>Submitting...</p> : null}
                    </form>
                </div>
            </Row>

        </Container>
    )
}

export default EditSupplies;