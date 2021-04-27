import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

// import custom files and components
import classes from './EventAttendees.module.css';
import red from '../../../assets/Avatars/redavi.png';
import orange from '../../../assets/Avatars/orangeavi.png';
import yellow from '../../../assets/Avatars/yellowavi.png';
import green from '../../../assets/Avatars/greenavi.png';
import blue from '../../../assets/Avatars/blueavi.png';
import purple from '../../../assets/Avatars/purpleavi.png';

/*
    This component displays the event attendees list.
    The list includes the attendee avatars and names.

    Props:
      - name: attendee's name
      - avi: attendee's avatar
*/

const eventAttendees = (props) => {

  let attendeesList;
  if (props.attendees && props.event.avis) {
    attendeesList = props.attendees.map((attendee, index) =>
        <ListGroup.Item key={index} className={classes.Border}>
          <Card className={classes.CardHeader}>
            {props.event.avis[index] === "purple" ? <Card.Img src={purple} className={classes.Avatar} />
              : props.event.avis[index] === "orange" ? <Card.Img src={orange} className={classes.Avatar} />
              : props.event.avis[index] === "yellow" ? <Card.Img src={yellow} className={classes.Avatar} />
              : props.event.avis[index] === "green" ? <Card.Img src={green} className={classes.Avatar} />
              : props.event.avis[index] === "blue" ? <Card.Img src={blue} className={classes.Avatar} />
              : <Card.Img src={red} className={classes.Avatar} />
            }
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

  if ((typeof attendeesList === 'undefined' && typeof attendeesList === 'undefined')) {
    creatorItem = <ListGroup.Item key={'hewwo'} className={classes.Border}>
        <Card className={classes.CardHeader}>
          <Card.Body className={classes.Name}>
            <p className={classes.Role}>No one joined this event yet!</p>
          </Card.Body>
        </Card>
      </ListGroup.Item>
  } else if ((typeof creatorItem === 'undefined' && attendeesList.length === 0)) {
    creatorItem = <ListGroup.Item key={'hewwo'} className={classes.Border}>
        <Card className={classes.CardHeader}>
          <Card.Body className={classes.Name}>
            <p className={classes.Role}>No one joined this event yet!</p>
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