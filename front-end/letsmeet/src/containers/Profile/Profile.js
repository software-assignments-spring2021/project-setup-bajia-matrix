import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './Profile.module.css';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';

import red from '../../assets/Avatars/redavi.png';
import blue from '../../assets/Avatars/blueavi.png';
import green from '../../assets/Avatars/greenavi.png';
import orange from '../../assets/Avatars/orangeavi.png';
import purple from '../../assets/Avatars/purpleavi.png';
import yellow from '../../assets/Avatars/yellowavi.png';

/* 
    This component displays the profile page based on the information
    of the user that is signed in. The user can also navigate
    to the edit profile page from here.

    Props:
        This component does not accept any custom props
*/

const Profile = (props) => {
    const [loading, setLoading] = useState(true);
    const [profileState, setProfileState] = useState({ friends: [] });
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        if (props.location.state) {
            const editProfileState = props.location.state.editProfileState;
            setProfileState(editProfileState);

            const avi = editProfileState.avatar;
            switch (avi) {
                case "orange": setAvatar(orange); break;
                case "yellow": setAvatar(yellow); break;
                case "green": setAvatar(green); break;
                case "blue": setAvatar(blue); break;
                case "purple": setAvatar(purple); break;
                default: setAvatar(red);
            }
            
            setLoading(false);
        } 
        else {
            const id = localStorage.getItem("userID");
        
            axios.get("/profile?userid=" + id)
                .then(response => {
                    setProfileState(response.data);

                    const avi = response.data.avatar;
                    switch (avi) {
                        case "orange": setAvatar(orange); break;
                        case "yellow": setAvatar(yellow); break;
                        case "green": setAvatar(green); break;
                        case "blue": setAvatar(blue); break;
                        case "purple": setAvatar(purple); break;
                        default: setAvatar(red);
                    }
                    
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error.response.data);
                    setLoading(false);
                });
        }
    }, [props.location.state]);

    const friendsList = profileState.friends.map(friend => (
        <p key={friend.id}>{friend.name}</p>
    ));

    const editProfileHandler = () => {
        console.log(props)
        props.history.push({
            pathname: "/editprofile",
            state: { profileState: profileState }
        });
    }

    // render
    let profilePage = <Spinner />;
    if (!loading) {
        profilePage = (
            <div className={classes.Profile}>
                <Card className={classes.Card}>
                    <Card.Img className={classes.CardImg} src={avatar} />
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