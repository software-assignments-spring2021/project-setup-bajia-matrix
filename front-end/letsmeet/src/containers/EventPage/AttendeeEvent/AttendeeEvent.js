import React, { useState, useEffect } from "react";

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

const AttendeeEvent = (props) => {
  return (
    <div>
      <Row className={classes.EventTitle}>
        <EventTitle
          title={props.event.title}
          day={props.event.day}
          date={props.event.date}
          time={props.event.time}
          location={props.event.location}
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
                      isAuthenticated={props.state.isAuthenticated}
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
          <EventSupplies />
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
