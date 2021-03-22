import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './EventInvite.module.css';
import axios from '../../../axios';
import Text from '../../UI/Text/Text';

/*
    This component displays a pending invitation and buttons to accept
    or decline the invite on the home page. Accepting will redirect the user to the acceptInvite
    page. Declining will remove the invite from the user's list in the database.

    Props: 
        - key: the id of the event
        - title: the event title
        - range: the date-and-time range of the event
        - description: a description of the event
        - inviter: the person who sent this invite
*/

const eventInvite = (props) => {
    let acceptEventHandler = () => {
        console.log("accept event");
        // TODO: change route to acceptInvite page
        props.history.push("/user/acceptinvite");
    };

    let declineEventHandler = () => {
        console.log("decline event");
        // TODO: backend: delete a pending invitation from a user's pending invitations list
        // Will this rerender the page? Would like so
        axios.delete("/invites/" + props.key + ".json?key=fe6891f0")
            .then(response => {
                console.log(response);
            })
        // TODO: remove .then(response)
    }

    return (
        <div className={classes.Event}>
            <Card className={classes.Card}>
                <Card.Title className={classes.CardTitle}>{props.title}</Card.Title>
                <Card.Body className={classes.CardBody}>
                    <Text numberOfLines={1} ellipsis={false} text={"When: " + props.range} />
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