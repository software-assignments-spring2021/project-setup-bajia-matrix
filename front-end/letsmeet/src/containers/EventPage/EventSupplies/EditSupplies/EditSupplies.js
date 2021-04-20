import React, { useState, useEffect, useReducer } from 'react';
import { Container, Row, Col, Button, Navbar, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './EditSupplies.module.css';
import axios from '../../../../axios';
import EventTitle from '../../../../components/EventParts/EventTitle/EventTitle';
import Spinner from '../../../../components/UI/Spinner/Spinner';

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
    const [suppliesState, setSuppliesState] = useState({ supplies: [] });
    const [profileState, setProfileState] = useState({});

    useEffect(() => {
        const suppliesState = JSON.parse(props.location.state.suppliesState);
        setSuppliesState(suppliesState);
    
        const id = localStorage.getItem("userID");
        axios.get("/profile?userid=" + id)
            .then(response => {
                setProfileState(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error.response.data);
                setLoading(false);
            });
    }, [props.location.state.suppliesState]);

    const formReducer = (state, e) => {
        return {
            ...state, // keep old formData
            [e.name]: e.value // either addSupply: value, or amount: value
        }
    };

    const [formData, setFormData] = useReducer(formReducer, {});
    
    const suppliesList = suppliesState.supplies.map((sup, index) => {
        return <li key={index}>{sup.supply} (${sup.amount}) - {sup.name}</li>;
    });

    const inputChangedHandler = (e) => {
        setFormData({
            // this is the "name" and "value" formReducer use to update formData
            name: e.target.name,
            value: e.target.value
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        // update supplies list immutably using a copy
        const copySupplies = { ...suppliesState };
        const list = copySupplies.supplies;

        list.push({
            supply: formData.addSupply,
            name: profileState.name,
            amount: formData.amount,
            owed: 0
        })

        setSuppliesState(copySupplies);
    };

    const saveHandler = () => {
       
        // send to database
        axios.post("/events", suppliesState)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response.data);
        });

        props.history.push({
            pathname: "/event/" + suppliesState._id,
            state: {eventState: suppliesState}
        });
    }

    let editSuppliesPage = <Spinner />;
    if (!loading) {
        editSuppliesPage = (
            <Container fluid>
                <Row>
                    <Col className="md-12">
                        <Navbar>
                            <Link to={{ pathname: "/event/" + suppliesState._id }} exact>
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
                            day={suppliesState.finalDay}
                            date={suppliesState.finalDate}
                            time={suppliesState.finalTime}
                            event={suppliesState} />

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
                                <Button className={classes.Button} variant="secondary" onClick={saveHandler}>Save Supplies</Button>
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