import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './EditSupplies.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';

const EditSupplies = (props) => {

    const [profileState, setProfileState] = useState({
        title: "Lunch Date",
        description: "dATE",
        supplies: [
            {id: 1, name: "bread"},
            {id: 2, name: "bread"},
            {id: 3, name: "bread"},
            {id: 4, name: "bread"},
            {id: 5, name: "bread"}
           
        ]
        
    });


    //update state to reflect changes made to the name and/or location fields
    //gotta use callback functions to update objects for state hooks apparently https://reactjs.org/docs/hooks-state.html
    let handleChange = (e) => {
        if (e.target.name === "supplies") {
            setProfileState(prevState => ({
                ...prevState,
                location: e.target.value
            }));
        } 
    }
    let suppliesList = profileState.supplies.map(supplies => (
        <p key={supplies.id}>{supplies.name}</p>
    ))

    //TODO: handle updating user's information in backend
    let saveProfile = (e) => {
        console.log(profileState);
    }

    return (
        <Container fluid>

            <Row>
            <div className={classes.Profile}>
               
                
                <Card className={classes.Card}>
                    <Card.Title className={classes.Title}>
                    </Card.Title>
                    <Card.Title className={classes.SuppliesTitle} as="h2">
                        <h1>Edit Supplies</h1>

                        <hr />    
                    </Card.Title>
                    <Card.Body className={classes.SuppliesBody}>{suppliesList}</Card.Body>
                  
                </Card>
                <a href="/editsupplies" className={classes.Edit}>Edit</a>


            </div>
            </Row>
            

        </Container>
    )
}

export default EditSupplies;