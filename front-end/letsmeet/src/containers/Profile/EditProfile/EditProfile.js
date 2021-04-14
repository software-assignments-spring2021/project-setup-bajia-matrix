import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';

import classes from './EditProfile.module.css';
import axios from '../../../axios';

import red from '../../../assets/Avatars/redavi.png';
import blue from '../../../assets/Avatars/blueavi.png';
import green from '../../../assets/Avatars/greenavi.png';
import orange from '../../../assets/Avatars/orangeavi.png';
import purple from '../../../assets/Avatars/purpleavi.png';
import yellow from '../../../assets/Avatars/yellowavi.png';

/*
    This component renders the Edit Profile page so that a user can update their user info.

    Props:
        This component does not accept any custom props
*/

const EditProfile = (props) => {
    const [editProfileState, setEditProfileState] = useState({friends: []});
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        const profileState = props.location.state.profileState;
        setEditProfileState(profileState);

        const avi = profileState.avatar;
        switch (avi) {
            case "orange": setAvatar(orange); break;
            case "yellow": setAvatar(yellow); break;
            case "green": setAvatar(green); break;
            case "blue": setAvatar(blue); break;
            case "purple": setAvatar(purple); break;
            default: setAvatar(red);
        }
    }, [props.location.state.profileState]);

    const friendsList = editProfileState.friends.map(friend => (
        <p key={friend.id}>{friend.name}</p>
    ));

    // update state to reflect changes made to the name and/or location fields
    // gotta use callback functions to update objects for state hooks apparently https://reactjs.org/docs/hooks-state.html
    const handleChange = (e) => {
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
    };

    const saveProfile = (e) => {
        axios.post("/profile", editProfileState)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });

        props.history.push({
            pathname: "/profile",
            state: {editProfileState: editProfileState}
        });
    };

    const editAvatar = () => {
        props.history.push({
            pathname: "/editavatar",
            state: {profileState: editProfileState}
        });
    };

    const addFriendsHandler = () => {
        window.location.assign('/editfriends')
    };

    // render
    const editProfilePage = (
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
                            <Button onClick={editAvatar} className={classes.LinkButton}>Edit</Button>
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
                            <Button className={classes.LinkButton} onClick={addFriendsHandler}>Edit</Button>
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
    );

    return (
        <div>
            {editProfilePage}
        </div>
    );
}

export default EditProfile;
