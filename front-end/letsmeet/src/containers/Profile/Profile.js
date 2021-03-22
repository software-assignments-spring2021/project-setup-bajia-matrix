import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './Profile.module.css';
import axios from '../../axios';
import avi from '../../assets/Avatars/redavi.png';
import Spinner from '../../components/UI/Spinner/Spinner';

/* 
    This component displays the profile page based on the information
    of the user that is signed in. The user can also navigate
    to the edit profile page from here.
    Props:
        This component does not accept any custom props
*/

const Profile = (props) => {
    const [loading, setLoading] = useState(true);
    
    // TODO: comment out data when mockaroo request cap resets
    const [profileState, setProfileState] = useState({
        // id: "1",
        // avatar: avi,
        // name: "Angela Tim",
        // city: "New York City",
        // state: "NY",
        // friends: [
        //     {id: 1, name: "Alexa Taylor"},
        //     {id: 2, name: "Timothy Sanders"},
        //     {id: 3, name: "Matthew Fishman"},
        //     {id: 4, name: "Matthew Fishman"},
        //     {id: 5, name: "Matthew Fishman"},
        //     {id: 6, name: "Matthew Fishman"},
        //     {id: 7, name: "Matthew Fishman"},
        //     {id: 8, name: "Matthew Fishman"},
        //     {id: 9, name: "Matthew Fishman"},
        //     {id: 10, name: "Matthew Fishman"},
        //     {id: 11, name: "Matthew Fishman"},
        //     {id: 12, name: "Matthew Fishman"},
        //     {id: 13, name: "Matthew Fishman"},
        //     {id: 14, name: "Matthew Fishman"},
        //     {id: 15, name: "Matthew Fishman"},
        //     {id: 16, name: "Matthew Fishman"},
        //     {id: 17, name: "Matthew Fishman"}
        // ]
        friends: []
    });

    useEffect(() => {
        if (props.location.state) {
           setProfileState(props.location.state.editState);
           setLoading(false);
        } else {
            console.log('bye');
            axios.get('/users.json?key=fe6891f0')
                   .then(response => {
                       setProfileState(response.data);
                       setLoading(false);
                   })
                   .catch(error => {
                       console.log(error);
                       setLoading(false);
                   })
        }
      }, []);

    let friendsList = profileState.friends.map(friend => (
        <p key={friend.id.$oid}>{friend.name}</p>
    ))
    
    let editProfileHandler = () => {
        props.history.push({
            pathname: "/editprofile",
            state: {profileState: profileState}
        });
    }

    // render
    // TODO: logic to check the name of user's avatar and display the image associated with it
    // maybe store avatar as an id
    let profilePage = <Spinner />;
    if (!loading) {
        profilePage = (
            <div className={classes.Profile}>
                <Card className={classes.Card}>
                    {/* TODO: replace src to actual avatar for current user */}
                    <Card.Img className={classes.CardImg} src={avi} />
                    <Card.Body className={classes.CardBody}>
                        <hr />
                        <Card.Title as="h2">{profileState.name}</Card.Title>
                        <Card.Text>{profileState.city}, {profileState.state}</Card.Text>
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
    }

    return (
        <div>
            {profilePage}
        </div>
    );
};

export default Profile;
