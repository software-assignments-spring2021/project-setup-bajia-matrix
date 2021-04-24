import React, { useState, useEffect, useReducer } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Input, InputNumber } from 'antd';
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
        return <li key={index} id={index} onClick={(e) => removeHandler(e)}>{sup.supply} (${sup.amount}) - {sup.name}</li>;
    });

    const removeHandler = (e) => {
        const deleteIndex = e.target.getAttribute("id");

        // delete the selected list item from the array and save it to suppliesState
        const copySupplies = { ...suppliesState };
        const list = copySupplies.supplies;
        
        list.splice(deleteIndex, 1);

        setSuppliesState(copySupplies);
    }

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

        props.history.push("/event/" + suppliesState._id)
    }

    let editSuppliesPage = <Spinner />;
    if (!loading) {
        editSuppliesPage = (
            <Container fluid>
                <Row>
                    <Col className={classes.Header}>
                        <div className="d-flex align-items-center justify-content-between">
                        <div className="align-self-baseline">
                            <a href={"/event/" + suppliesState._id}>Cancel</a>
                        </div>
                        <div className="align-self-baseline">
                            <h6>Edit Supplies</h6>
                        </div>
                        <div className={classes.FlexPadding}>Cancel</div>
                        {/* This is invisible text to center the header */}
                    </div>
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
                        <h6>(You can always <b>click</b> on a supply to remove it)</h6>
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
                            <h5 className={classes.H5}>Enter a new supply and the amount spent on it</h5>
                            <div className={classes.Form}>
                                <fieldset>
                                    <input 
                                        className={classes.Input} 
                                        type="text" 
                                        name="addSupply" 
                                        placeholder="Supply" 
                                        maxLength="50"
                                        autoFocus
                                        required 
                                        onChange={(event) => inputChangedHandler(event)} 
                                    />
                                    {/* <Input.TextArea 
                                        className={classes.Input}
                                        type="text" 
                                        name="addSupply" 
                                        placeholder="Supply" 
                                        showCount 
                                        maxLength={20} 
                                        autoFocus
                                        required 
                                        onChange={(event) => inputChangedHandler(event)} />
                                    <InputNumber 
                                        className={classes.Input}
                                        type="number"
                                        name="amount"
                                        placeholder="amount"
                                        required
                                        min={0.00} 
                                        max={1000.00} 
                                        step={0.01}
                                        defaultValue={1.00} 
                                        onChange={(event) => inputChangedHandler(event)} /> */}
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
                                    {/* <input className={classes.Reset} type="reset" defaultValue="Reset" /> */}
                                </fieldset>
                            </div>
                            <div className={classes.Submit}>
                                <Button className={classes.Button} variant="secondary" type="submit">Add</Button>
                                <Button className={classes.Button} variant="secondary" onClick={saveHandler}>Save Changes</Button>
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