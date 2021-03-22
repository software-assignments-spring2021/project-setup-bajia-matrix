import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './EditProfile.module.css';
import axios from '../../../axios';
import avi from '../../../assets/Avatars/redavi.png';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const EditProfile = (props) => {
    const [loading, setLoading] = useState(true);

    //hard coded data
    // const [editProfile, setEditProfile] = useState({
    //     avatar: avi,
    //     name: "Angela Tim",
    //     location: "New York City, NY",
    //     friends: [
    //         {id: 1, name: "Alexa Taylor"},
    //         {id: 2, name: "Timothy Sanders"},
    //         {id: 3, name: "Matthew Fishman"},
    //         {id: 4, name: "Matthew Fishman"},
    //         {id: 5, name: "Matthew Fishman"},
    //         {id: 6, name: "Matthew Fishman"},
    //         {id: 7, name: "Matthew Fishman"},
    //         {id: 8, name: "Matthew Fishman"},
    //         {id: 9, name: "Matthew Fishman"},
    //         {id: 10, name: "Matthew Fishman"},
    //         {id: 11, name: "Matthew Fishman"},
    //         {id: 12, name: "Matthew Fishman"},
    //         {id: 13, name: "Matthew Fishman"},
    //         {id: 14, name: "Matthew Fishman"},
    //         {id: 15, name: "Matthew Fishman"},
    //         {id: 16, name: "Matthew Fishman"},
    //         {id: 17, name: "Matthew Fishman"}
    //     ]
    // });

    //set up axios
    const [editProfile, setEditProfile] = useState({});
    useEffect(() => {
        setEditProfile(props.location.state.profileState);
        setLoading(false);
    }, []);

    //update state to reflect changes made to the name and/or location fields
    //gotta use callback functions to update objects for state hooks apparently https://reactjs.org/docs/hooks-state.html
    let handleChange = (e) => {
        if (e.target.name === "editCity") {
            setEditProfile(prevState => ({
                ...prevState,
                city: e.target.value
            }));
        } else if (e.target.name === "editName") {
            setEditProfile(prevState => ({
                ...prevState,
                name: e.target.value
            }));
        } else if (e.target.name === "editState") {
            setEditProfile(prevState => ({
                ...prevState,
                state: e.target.value
            }));
        }
    }

    //TODO: handle updating user's information in backend
    let saveProfile = (e) => {
        props.history.push({
            pathname: "/profile",
            state: {editState: editProfile}
        });
        // axios.post("/users/" + editProfile.id + ".json?key=5942cd70", editProfile)
        // .then(response => {
        //     console.log(response);
        // })
        // .catch(error => {
        //     console.log(error);
        // })
    }

    let editProfilePage = <Spinner />;
    if (!loading) {
        let friendsList = editProfile.friends.map(friend => (
            <p key={friend.id.$oid}>{friend.name}</p>
        ))
        editProfilePage = (
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
                        <Card.Img className={classes.CardImg} src={avi} />
                        <hr />
                        <Card.Title as="h2" >
                            <label for="editName" className={classes.Label}>Name</label>
                            <textarea name="editName" className={classes.Input} rows={1} cols={10} wrap="soft" defaultValue={editProfile.name} onChange={handleChange}/>
                        </Card.Title>
                        <Card.Text className={classes.Location}>
                            <p className="mr-3">
                            <label for="editCity" className={classes.Label}>City</label>
                            <textarea name="editCity" rows={1} cols={10} wrap="soft" defaultValue={editProfile.city} onChange={handleChange}/>
                            </p>
                            <p>
                            <label for="editState" className={classes.Label}>State</label>
                            <textarea name="editState" rows={1} cols={10} wrap="soft" defaultValue={editProfile.state} onChange={handleChange}/>
                            </p>
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

    return (
        <div>
            {editProfilePage}
        </div>
    );
}

export default EditProfile;