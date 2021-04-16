import React, { useState, useEffect } from "react";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./UnverifiedEvent.module.css";

import EventTitle from "../../../components/EventParts/EventTitle/EventTitle";
import EventAttendees from "../../../components/EventParts/EventAttendees/EventAttendees";

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

/*
  This component displays the event page for the unverfied user.

  Props:
    - event: contains info about current event
    - state: contains info about current user
    - addUnverified: function that adds an unverified user to event attendees list
*/

const UnverifiedEvent = (props) => {
  return (
    <div>
      <Row className={classes.EventTitle}>
        <EventTitle
          title={props.event.title}
          event={props.event}
          day={props.event.finalDay}
          date={props.event.finalDate}
          time={props.event.finalTime}
          location={props.event.eventLocation}
        />
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
          <InputGroup className={classes.Input}>
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
