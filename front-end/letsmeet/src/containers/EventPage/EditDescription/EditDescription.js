import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';

import classes from './EditDescription.module.css';

/* 
    TODO: comment about component

    Props:
        This component does not accept any custom props
*/

// TODO: CURRENTLY NOT BEING USED ANYWHERE

const EditDescription = () => {

    const [descriptionState, setDescriptionState] = useState({
        title: "Lunch Date",
        description: "dATE",
    });

    //update state to reflect changes made to the name and/or location fields
    //gotta use callback functions to update objects for state hooks apparently https://reactjs.org/docs/hooks-state.html
    let handleChange = (e) => {
        if (e.target.name === "description") {
            setDescriptionState(prevState => ({
                ...prevState,
                location: e.target.value
            }));
        } 
    }

    //TODO: handle updating user's information in backend
    let saveDescription = (e) => {
        console.log(descriptionState);
    }

    return (
        <Container fluid>
            <Row>
                <div className={classes.Description}>
                    <Card className={classes.Card} >
                        <Card.Body className={classes.CardBody}>
                            <h1>{descriptionState.title} </h1> 

                            <Card.Title as="h2" >
                                <label for="description" className={classes.Label}>Description</label>
                                <textarea name="description"
                                                        
                                rows={4} cols={30} wrap="soft"
                                defaultValue={descriptionState.description} 
                                onChange={handleChange}/>   
                            </Card.Title>
                            
                            <Button variant="outline-primary" onClick={saveDescription}>Save Description</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </Container>
    )
}

export default EditDescription;