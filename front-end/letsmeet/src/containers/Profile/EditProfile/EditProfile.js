import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
// import Form from 'react-bootstrap/Form';

import classes from './EditProfile.module.css';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';

import red from '../../../assets/Avatars/redavi.png';
import blue from '../../../assets/Avatars/blueavi.png';
import green from '../../../assets/Avatars/greenavi.png';
import orange from '../../../assets/Avatars/orangeavi.png';
import purple from '../../../assets/Avatars/purpleavi.png';
import yellow from '../../../assets/Avatars/yellowavi.png';

/*
    TODO: comment

    Props:
        This component does not accept any custom props
*/

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
    const [editProfileState, setEditProfileState] = useState({});
    const [avatar, setAvatar] = useState(red);

    useEffect(() => {
        console.log(props.location.state.profileState);
        let profileState = props.location.state.profileState;
        if (profileState.avatar === 'red') {
            setAvatar(red)
        } else if (profileState.avatar === 'orange') {
             setAvatar(orange)
        } else if (profileState.avatar === 'yellow') {
             setAvatar(yellow)
        } else if (profileState.avatar === 'green') {
             setAvatar(green)
        } else if (profileState.avatar === 'blue') {
             setAvatar(blue)
        } else if (profileState.avatar === 'purple') {
             setAvatar(purple)
        }
        setEditProfileState(props.location.state.profileState);
        setLoading(false);
    }, []); // TODO: check warnings about dependencies

    //update state to reflect changes made to the name and/or location fields
    //gotta use callback functions to update objects for state hooks apparently https://reactjs.org/docs/hooks-state.html
    let handleChange = (e) => {
        if (e.target.name === "editCity") {
            setEditProfileState(prevState => ({
                ...prevState,
                city: e.target.value
            }));
        } else if (e.target.name === "editName") {
            setEditProfileState(prevState => ({
                ...prevState,
                name: e.target.value
            }));
        } else if (e.target.name === "editState") {
            setEditProfileState(prevState => ({
                ...prevState,
                state: e.target.value
            }));
        }
    }

    //TODO: handle updating user's information in backend
    let saveProfile = (e) => {
        axios.post("/profile", editProfileState)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        console.log(editProfileState);
        props.history.push({
            pathname: "/profile",
            state: {editState: editProfileState}
        });
    }

    let editAvatar = () => {
        props.history.push({
            pathname: "/editavatar",
            state: {profileState: editProfileState}
        });
    }

    let editProfilePage = <Spinner />;
    if (!loading) {
        let friendsList = editProfileState.friends.map(friend => (
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
                            <a href="" onClick={editAvatar} className={classes.Edit}>Edit</a>
                        </Card.Title>
                        <Card.Img className={classes.CardImg} src={avatar} />
                        <hr />
                        <Card.Title as="h2" >
                            <label htmlFor="editName" className={classes.Label}>Name</label>
                            <textarea name="editName" className={classes.Input} rows={1} cols={10} wrap="soft" defaultValue={editProfileState.name} onChange={handleChange}/>
                        </Card.Title>
                        <div className={classes.Location}>
                            <p className="mr-3">
                            <label htmlFor="editCity" className={classes.Label}>City</label>
                            <textarea name="editCity" rows={1} cols={10} wrap="soft" defaultValue={editProfileState.city} onChange={handleChange}/>
                            </p>
                            <p>
                            <label htmlFor="editState" className={classes.Label}>State</label>
                            <textarea name="editState" rows={1} cols={10} wrap="soft" defaultValue={editProfileState.state} onChange={handleChange}/>
                            </p>
                        </div>
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
