import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

// import custom files and components
import classes from "./UnverifiedEvent.module.css";
import EventTitle from "../../EventParts/EventTitle/EventTitle";
import EventAttendees from "../../EventParts/EventAttendees/EventAttendees";

/*
  This component displays the Event page for the unverfied user.

  Props:
    - event: contains info about current event
    - state: contains info about current user
    - addUnverified: function that adds an unverified user to event attendees list
*/

const UnverifiedEvent = (props) => {
  return (
    <div>
      <Row className={classes.EventTitle}>
        {props.event.creator !== ""
            ? <EventTitle
            title={props.event.title}
            event={props.event}
            day={props.event.finalDay}
            date={props.event.finalDate}
            time={props.event.finalTime}
            location={props.event.eventLocation}
            creator={props.event.creator}
            showCreator={true}
            />
            : <EventTitle
            title={props.event.title}
            event={props.event}
            day={props.event.finalDay}
            date={props.event.finalDate}
            time={props.event.finalTime}
            location={props.event.eventLocation}
            creator={props.event.creator}
            showCreator={false}
            />
        }
      </Row>
      <hr />
      <br />

      <Row className="justify-content-center">
        <Card className={classes.CardInfo}>
          <Card.Body>
            <Card.Title>Event Details</Card.Title>
            <Card.Text>{props.event.description}</Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <br />
      <hr />
      <br />

      <h5 className="ml-2">Event Attendees</h5>
      <div className={classes.UnverifiedAttendees}>
        <EventAttendees
          event={props.event}
          attendees={props.event.attendees}
          roles={props.event.roles}
          isAuthenticated={props.state.isAuthenticated}
        ></EventAttendees>
      </div>
      <br />

      <Row className="justify-content-center">
        <div className={classes.Div}>
          { props.event.emailMessage 
            ? <div key="idk why this needs a key tf" className={classes.EmailMessage}>{props.event.emailMessage}</div>
            : null
          }
          <InputGroup>
            <FormControl
              ref={props.state.unverifiedInput}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Enter Your Email"
            />
            <Button className="ml-3" onClick={props.addUnverified}>
              Join Event
            </Button>
          </InputGroup>
        </div>
      </Row>
      <br />
      <hr />
      <br />

      <Row className="justify-content-center">
        <Card className={classes.Card}>
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title>Want to unlock all features?</Card.Title>
            <Card.Text>Create an account now!</Card.Text>
            {props.event.unverifiedURL
              ? <Button href={props.event.unverifiedURL} variant="primary">
                  Create Account
                </Button>
              : <Button href='/signup' variant="primary">
                  Create Account
                </Button>
            }
          </Card.Body>
          <Card.Footer className="text-muted"></Card.Footer>
        </Card>
      </Row>
      <br />
    </div>
  );
};

export default UnverifiedEvent;
