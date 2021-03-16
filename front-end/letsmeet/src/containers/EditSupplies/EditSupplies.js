import React, { useState } from 'react';
import { Container, Row, Col, Button, Navbar, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './EditSupplies.module.css';
import EventTitle from '../../components/EventParts/EventTitle/EventTitle';

const EditSupplies = (props) => {
    const [state, setState] = useState({
        title: "Study Date",
        day: "Wednesday",
        date: "Feb 17th",
        time: "4:30 - 5:30 pm",
        supplies: [
            "boba tea",
            "muffins"
        ],
        amount: 30
    });

    
    // let handleChange = (e) => {
    //     if (e.target.name === "editLocation") {
    //         setProfileState(prevState => ({
    //             ...prevState,
    //             location: e.target.value
    //         }));
    //     } else if (e.target.name === "editName") {
    //         setProfileState(prevState => ({
    //             ...prevState,
    //             name: e.target.value
    //         }));
    //     }
    // }

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
                    title={state.title}
                    day={state.day}
                    date={state.date}
                    time={state.time} />
                <h5>Select the supply you purchased</h5>
                <div className={classes.Supplies}>
                    <Card className={classes.Card} >
                        <Card.Body className={classes.CardBody}>
                            {state.supplies}
                        </Card.Body>
                    </Card>
                </div>
                <h5>Enter the amount you spent on the selected supply</h5>
                <p>{state.amount}</p>
                <Button>Done</Button>
            </div>
            </Row>

        </Container>
    )
}

export default EditSupplies;