import React from 'react';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './Event.module.css';
import Text from '../UI/Text/Text';

/*
    This component displays an event on the home page. Clicking on the event
    will redirect the user to the event page of the event.

    Props: 
        - title: the event title
        - day: the day of the week the event takes place
        - date: the month and day the event takes place
        - time: the time of day the event takes place
        - description: a description of the event
        - attendees: a list of users attending the event
        - myCreatedEvent: whether or not the current user created this event
        - creator: the user who created the event
*/

const event = (props) => {
    let attendeesList = props.attendees ? props.attendees.sort().join(', ') : [];

    // TODO: take to specific event page when clicked on
    let manageEventHandler = () => {
        props.history.push(`/event/${props.id}`);
    };

    return (
        <div className={classes.Event}>
            <Card className={classes.Card} onClick={manageEventHandler}>
                {!props.day ? <Card.Title className={classes.CardTitle}>{props.title}: (date & time TBD)</Card.Title> : <Card.Title className={classes.CardTitle}>{props.title}: {props.day}, {props.date} @ {props.time}</Card.Title> }
                <Card.Body className={classes.CardBody}>
                    <Text numberOfLines={2} ellipsis={true} text={props.description} />
                    <Text numberOfLines={2} ellipsis={true} text={"Friends who are attending: " + attendeesList} />
                    {!props.myCreatedEvent ? <Text numberOfLines={1} ellipses={false} text={"Event created by: " + props.creator} /> : null}
                </Card.Body>
            </Card>
        </div>
    );
};

export default withRouter(event);