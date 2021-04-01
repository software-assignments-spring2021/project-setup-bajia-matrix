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
            <Card.Body className={classes.Name}><p>{attendee}</p></Card.Body>
            <Card.Body className={classes.Role}><p>{props.roles[index]}</p></Card.Body>
          </Card>
        </ListGroup.Item>
    );
  } else {
    <ListGroup.Item className={classes.Border}>no attendees</ListGroup.Item>
  }

  return (
    <ListGroup className={classes.Group}>
      {attendeesList}
    </ListGroup>
  );
};

export default eventAttendees;