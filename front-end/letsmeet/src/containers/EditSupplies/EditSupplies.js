import React, { useState, useEffect, useReducer } from 'react';
import { Container, Row, Col, Button, Navbar, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './EditSupplies.module.css';
import axios from '../../axios';
import EventTitle from '../../components/EventParts/EventTitle/EventTitle';
import Spinner from '../../components/UI/Spinner/Spinner';

/*
    This component renders the EditSupplies page by fetching information
    related to the event from the back-end using the current event id. It
    also allows the current user the option to add to the event's supplies list
    and will send the updated information to the backend. The user can navigate
    to this page from the specific myEvents page.

    Props:
        This component does not accept any custom props
        TODO: in the future, accept props for event id
*/

const EditSupplies = (props) => {
    const [loading, setLoading] = useState(true);

    const [suppliesState, setSuppliesState] = useState({
        // title: "Study Date",
        // day: "Wednesday",
        // date: "Feb 17th",
        // time: "4:30 - 5:30 pm",
        // supplies: [
        //     {id: 1, supply: "boba tea", name: "Raddy", amount: 30.00},
        //     {id: 2, supply: "muffins", name: "Micky", amount: 25.99}
        // ]
        supplies: []
    });

    useEffect(() => {
        // fetch event info to display
        // TODO: fetch event that has selected event id
        axios.get("/events.json?key=fe6891f0")
            .then(response => {
                const list = response.data.events;
                setSuppliesState(list[0]);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const formReducer = (state, event) => {
        return {
            ...state, // keep old formData
            [event.name]: event.value // either addSupply: value, or amount: value
        }
    };

    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useReducer(formReducer, {});
    
    let suppliesList = suppliesState.supplies.map(sup => {
        return <li key={sup.id.$oid}>{sup.supply} (${sup.amount}) - {sup.name}</li>;
    });

    let inputChangedHandler = (event) => {
        setFormData({
            // this is the "name" and "value" formReducer use to update formData
            name: event.target.name,
            value: event.target.value
        });
    };

    let submitHandler = (event) => {
        // prevents reload so don't fetch from backend again
        // instead will update state and display from there
        // TODO: if supplies list doesn't update with added supply, remove this
        event.preventDefault();

        setSubmitting(true);

        // update supplies list immutably using a copy
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
        axios.post("/events/" + suppliesState.id.$oid + ".json?key=fe6891f0", suppliesState)
            .then(response => {
                console.log(response);
                setSubmitting(false);
            });

        // TODO: remove when have real api
        // to simulate sending to database
        // setTimeout(() => {
        //     setSubmitting(false);
        // }, 3000);
    };

    let editSuppliesPage = <Spinner />;
    if (!loading) {
        editSuppliesPage = (
            <Container fluid>
                <Row>
                    <Col className="md-12">
                        <Navbar>
                            {/* TODO: update link to myevent */}
                            <Link to="/event/1" exact>
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

                        <form onSubmit={submitHandler}>
                            <h5>Enter a new supply and the amount spent on it</h5>
                            <div className={classes.Form}>
                                <fieldset>
                                    <input 
                                        className={classes.Input} 
                                        type="text" 
                                        name="addSupply" 
                                        placeholder="Supply" 
                                        required 
                                        onChange={(event) => inputChangedHandler(event)} 
                                    />
                                    <input 
                                        className={classes.Input} 
                                        type="number" 
                                        name="amount" 
                                        placeholder="Amount"
                                        required
                                        min="0.00" 
                                        max="1000.00" 
                                        step="0.01" 
                                        onChange={(event) => inputChangedHandler(event)} 
                                    />
                                </fieldset>
                            </div>
                            <div className={classes.Submit}>
                                <Button className={classes.Button} variant="secondary" type="submit">Add</Button>
                                {submitting ? <p>Adding...</p> : null}
                            </div>
                        </form>
                    </div>
                </Row>
            </Container>
        );
    }

    return (
        <div>
            {editSuppliesPage}
        </div>
    );
};

export default EditSupplies;