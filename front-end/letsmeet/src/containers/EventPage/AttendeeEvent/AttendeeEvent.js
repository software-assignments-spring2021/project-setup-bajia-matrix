import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./AttendeeEvent.module.css";

import EventTitle from "../../../components/EventParts/EventTitle/EventTitle";
import EventAttendees from "../../../components/EventParts/EventAttendees/EventAttendees";
import EventSupplies from "../EventSupplies/EventSupplies";
import EventModal from "../../../components/EventParts/EventModal/EventModal";

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";

/*
  This component displays the event page for the event attendee user.

  Props:
    - event: contains info about current event
    - state: contains info about current user
    - addUnverified: function that adds an unverified user to event attendees list
    - show: state variable that contains only boolean values to determine if the 'Withdraw from Event' confirmation modal is displayed or hidden
    - handleShow: function that displays the 'Withdraw from Event' confirmation modal
    - handleClose: function that closes the 'Withdraw from Event' confirmation modal
    - handleDelete: function that withdraws the user from the event 
*/

const AttendeeEvent = (props) => {

  return (
    <div>
      <Row className={classes.EventTitle}>
        <EventTitle
          title={props.event.title}
          day={props.event.finalDay}
          date={props.event.finalDate}
          time={props.event.finalTime}
          location={props.event.eventLocation}
          creator={props.event.creator}
          event={props.event}
          showCreator={true}
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

      <CardGroup>
        <Card className={classes.CardBorder}>
          <Container fluid>
            <Row>
              <div className={classes.Profile}>
                <Card className={classes.CardAttendee}>
                  <Card.Title className={classes.AttendeeTitle}>
                    <h5>Event Attendees</h5>
                    <hr className={classes.Hr} />
                  </Card.Title>
                  <Card.Body className={classes.AttendeesBody}>
                    <EventAttendees
                      attendees={props.event.attendees}
                      roles={props.event.roles}
                      event={props.event}
                    ></EventAttendees>
                  </Card.Body>
                  <Card.Body>
                    <br />
                  </Card.Body>
                </Card>
              </div>
            </Row>
          </Container>
        </Card>
        <Card className={classes.CardBorder}>
          <EventSupplies event={props.event} />
        </Card>
      </CardGroup>

      <Row className="justify-content-center">
        <Button variant="danger" onClick={props.handleShow}>
          Withdraw from Event
        </Button>
      </Row>
      <br />

      <EventModal
        show={props.show}
        close={props.handleClose}
        delete={props.handleDelete}
        role={props.role}
      />
    </div>
  );
};

export default AttendeeEvent;
