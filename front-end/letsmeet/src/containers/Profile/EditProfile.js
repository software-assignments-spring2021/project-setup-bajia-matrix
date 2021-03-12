import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './EditProfile.module.css';
import avi from '../../assets/Avatars/redavi.png';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const EditProfile = (props) => {

    const [profileState, setProfileState] = useState({
        avatar: avi,
        name: "Angela Tim",
        location: "New York City, NY",
        friends: [
            {id: 1, name: "Alexa Taylor"},
            {id: 2, name: "Timothy Sanders"},
            {id: 3, name: "Matthew Fishman"},
            {id: 4, name: "Matthew Fishman"},
            {id: 5, name: "Matthew Fishman"},
            {id: 6, name: "Matthew Fishman"},
            {id: 7, name: "Matthew Fishman"},
            {id: 8, name: "Matthew Fishman"},
            {id: 9, name: "Matthew Fishman"},
            {id: 10, name: "Matthew Fishman"},
            {id: 11, name: "Matthew Fishman"},
            {id: 12, name: "Matthew Fishman"},
            {id: 13, name: "Matthew Fishman"},
            {id: 14, name: "Matthew Fishman"},
            {id: 15, name: "Matthew Fishman"},
            {id: 16, name: "Matthew Fishman"},
            {id: 17, name: "Matthew Fishman"}
        ]
    });

    let friendsList = profileState.friends.map(friend => (
        <p key={friend.id}>{friend.name}</p>
    ))

    //https://reactjs.org/docs/hooks-state.html
    let handleChange = (e) => {
        if (e.target.name === "editLocation") {
            setProfileState(prevState => ({
                ...prevState,
                location: e.target.value
            }));
        } else if (e.target.name === "editName") {
            setProfileState(prevState => ({
                ...prevState,
                name: e.target.value
            }));
        }
    }

    //TODO: handle updating user's information in backend
    let saveProfile = (e) => {
        console.log(profileState);
    }

    return (
        <Container fluid>
            <Row>
                <Col className="md-12">
                    <Navbar>
                        <Link to="/profile" exact>
                            <Navbar.Text>Cancel</Navbar.Text>
                        </Link>
                        
                        <Navbar.Collapse className="justify-content-center">
                            <Navbar.Brand>
                            <h4>Edit Profile</h4>
                            </Navbar.Brand>
                        </Navbar.Collapse>
                    </Navbar>
                    <hr />
                </Col>
            </Row>

            <Row>
            <div className={classes.Profile}>
                <Card className={classes.Card} >
                    
                    <Card.Body className={classes.CardBody}>
                        <Card.Title className={classes.Title}>
                            <a href="/editavatar" className={classes.Edit}>Edit</a>
                        </Card.Title>
                        <Card.Img className={classes.CardImg} src={profileState.avatar} />
                        <hr />
                        <Card.Title as="h2" >
                            <label for="editName" className={classes.Label}>Name</label>
                            <input className={classes.Input} placeholder={profileState.name} name="editName" value={profileState.name} onChange={handleChange}/>    
                        </Card.Title>
                        <Card.Text>
                            <label for="editLocation" className={classes.Label}>Location</label>
                            <input className={classes.Input} placeholder={profileState.location} name="editLocation" value={profileState.location} onChange={handleChange} />
                        </Card.Text>
                        <Button variant="outline-primary" onClick={saveProfile}>Save Profile</Button>
                    </Card.Body>
                </Card>
                <Card className={classes.Card}>
                    <Card.Title className={classes.Title}>
                            <a href="/editfriends" className={classes.Edit}>Edit</a>
                    </Card.Title>
                    <Card.Title className={classes.FriendsTitle} as="h2">
                        Your Friends
                        <hr />    
                    </Card.Title>
                    <Card.Body className={classes.FriendsBody}>{friendsList}</Card.Body>
                </Card>
            </div>
            </Row>

        </Container>
    )
}

export default EditProfile;