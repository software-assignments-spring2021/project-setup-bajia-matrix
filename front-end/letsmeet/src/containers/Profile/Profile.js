import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './Profile.module.css';
import avi from '../../assets/Avatars/redavi.png';

/* 
    This component displays the profile page based on the information
    of the user that is signed in. The user can also navigate
    to the edit profile page from here.

    Props:
        This component does not except any custom props
*/

const Profile = (props) => {
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
    
    let editProfileHandler = () => {
        props.history.push("/editprofile");
    }

    return (
        <div className={classes.Profile}>
            <Card className={classes.Card}>
                <Card.Img className={classes.CardImg} src={profileState.avatar} />
                <Card.Body className={classes.CardBody}>
                    <hr />
                    <Card.Title as="h2">{profileState.name}</Card.Title>
                    <Card.Text>{profileState.location}</Card.Text>
                    <Button variant="outline-primary" onClick={editProfileHandler}>Edit Profile</Button>
                </Card.Body>
            </Card>
            <Card className={classes.Card}>
                <Card.Title className={classes.FriendsTitle} as="h2">
                    Your Friends
                    <hr />    
                </Card.Title>
                <Card.Body className={classes.FriendsBody}>{friendsList}</Card.Body>
            </Card>
        </div>
    );
};

export default Profile;
