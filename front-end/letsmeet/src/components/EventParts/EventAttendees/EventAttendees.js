import React from 'react';
// import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './EventAttendees.module.css';
import red from '../../../assets/Avatars/redavi.png';

/*
    This component displays the event attendees list.
    The list includes the attendee avatars and names.

    Props:
      - name: attendee's name
      - avi: attendee's avatar
*/

const eventAttendees = (props) => {

  let attendeesList;
  if(props.attendees) {
    attendeesList = props.attendees.map((attendee, index) =>
        <ListGroup.Item key={index} className={classes.Border}>
          <Card className={classes.CardHeader}>
            <Card.Img src={red} className={classes.Avatar} />
            <Card.Body className={classes.Name}>
              <p>{attendee.name}</p>
              <p className={classes.Role}>Attendee</p>
            </Card.Body>
          </Card>
        </ListGroup.Item>
    );
  }

  let creatorItem;
  if (props.event.creator) {
    creatorItem = <ListGroup.Item key={props.event.creator.id} className={classes.Border}>
        <Card className={classes.CardHeader}>
          <Card.Img src={red} className={classes.Avatar} />
          <Card.Body className={classes.Name}>
            <p>{props.event.creator}</p>
            <p className={classes.Role}>Creator</p>
          </Card.Body>
        </Card>
      </ListGroup.Item>
  }

  return (
    <ListGroup className={classes.Group}>
      {creatorItem}
      {attendeesList}
    </ListGroup>
  );
};

export default eventAttendees;