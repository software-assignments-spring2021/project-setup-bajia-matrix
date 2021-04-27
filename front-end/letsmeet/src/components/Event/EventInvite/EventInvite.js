import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import custom files and components
import classes from './EventInvite.module.css';
import axios from '../../../axios';
import Text from '../../UI/Text/Text';

/*
    This component displays a pending invitation and buttons to accept
    or decline the invite on the home page. Accepting will redirect the user to the Accept Invite
    page. Declining will remove the invite from the user's list in the database.

    Props: 
        - id: the id of the event
        - userId: the id of the currently logged in user
        - title: the event title
        - start: the start date to schedule the event
        - description: a description of the event
        - inviter: the person who sent this invite
*/

const eventInvite = (props) => {
    const acceptEventHandler = () => {
        props.history.push({
            pathname: "/user/acceptinvite",
            state: {
                eventId: props.id,
                userId: props.userId
            }
        });
    };

    const declineEventHandler = () => {
        axios.delete("/events?pending=true&userid=" + props.userId + "&eventid=" + props.id)
            .then(response => {
                console.log(response);
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    return (
        <div className={classes.Event}>
            <Card className={classes.Card}>
                <Card.Title className={classes.CardTitle}>{props.title}</Card.Title>
                <Card.Body className={classes.CardBody}>
                    <Text numberOfLines={1} ellipsis={false} text={"When: Week of " + props.start} />
                    <Text numberOfLines={4} ellipsis={true} text={props.description} />
                    <Text numberOfLines={1} ellipsis={false} text={"Invited by: " + props.inviter} />
                    <div>
                        <Button className={classes.Button} variant="outline-dark" onClick={acceptEventHandler}>Accept</Button>
                        <Button className={classes.Button} variant="outline-dark" onClick={declineEventHandler}>Decline</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default withRouter(eventInvite);