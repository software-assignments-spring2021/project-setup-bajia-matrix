import React from "react";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./CreatorEvent.module.css";

import EventTitle from "../../../components/EventParts/EventTitle/EventTitle";
import EventAttendees from "../../../components/EventParts/EventAttendees/EventAttendees";
import EventSupplies from "../EventSupplies/EventSupplies";
import EventModal from "../../../components/EventParts/EventModal/EventModal";

import { Form, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";
import FormB from "react-bootstrap/Form";

const { Option } = Select;

/*
  This component displays the event page for the event creator user.

  Props:
    - event: contains info about current event
    - state: contains info about current user
    - role: specifies role of current user (in this case creator)
    - description: state variable to keep track of description state
    - editDescription: function that displays edit description panel
    - descriptionChange: function that changes the description and updates the description state
    - cancelDescription: function that closes edit description panel
    - setInvitees: function that sets the invitees state variable which contains all the user's friends that can be invited
    - addVerified: function that adds a friend to the event
    - showLink: state variable that contains only boolean values to determine if the 'Generate Event Link' modal is displayed or hidden
    - handleCloseLink: function that hides the 'Generate Event Link' modal
    - handleShowLink: function that displays the 'Generate Event Link' modal
    - showSuggested: state variable that contains only boolean values to determine if the 'Choose Final Time' modal is displayed or hidden
    - handleCLoseSuggested: function that hides the 'Choose Final Time' modal
    - handleShowSuggested: funcion that displays the 'Choose Final Time' modal
    - onChecked: function that captures the specific final time the user selects 
    - handleFinal: function that updates the event state's final time 
    - show: state variable that contains only boolean values to determine if the 'Delete Event' confirmation modal is displayed or hidden
    - handleShow: function that displays the 'Delete Event' confirmation modal
    - handleClose: function that hides the 'Delete Event' confirmation modal
    - handleDelete: function that deletes the event
*/

const CreatorEvent = (props) => {
  return (
    <div>
      <Row className={classes.EventTitle}>
        <EventTitle
          title={props.event.title}
          day={props.event.day}
          date={props.event.date}
          time={props.event.time}
          location={props.event.eventLocation}
        />
      </Row>

      <Row className={classes.Row}>
        <Button
          variant="outline-primary"
          className={classes.LinkBtn}
          onClick={props.handleShowLink}
        >
          Generate Event Link
        </Button>
        <Button
          variant="outline-primary"
          className={classes.SuggestedBtn}
          onClick={props.handleShowSuggested}
        >
          Choose Final Time
        </Button>
      </Row>
      <hr />
      <br />

      {/* TODO: check warnings about href */}
      <Row className="justify-content-center">
        <Card className={classes.CardInfo}>
          <Card.Body className={classes.CardDetail}>
            {props.description.edit === false ? (
              <div>
                <Card.Title>
                  Event Details
                  <Button variant="link" className={classes.Edit} onClick={props.editDescription}>
                    Edit
                  </Button>
                </Card.Title>
                <Card.Text>{props.event.description}</Card.Text>
              </div>
            ) : (
              <div>
                <Card.Title>Event Details</Card.Title>
                <FormB.Group>
                  <FormB.Control
                    as="textarea"
                    rows={3}
                    placeholder={props.description.description}
                    value={props.description.description}
                    onChange={props.descriptionChange}
                  />
                </FormB.Group>
                <Row className="justify-content-end pr-3">
                  <Button variant="danger" onClick={props.cancelDescription}>
                    Cancel
                  </Button>
                  <Button className="ml-2" onClick={props.handleDescription}>
                    Save Changes
                  </Button>
                </Row>
              </div>
            )}
          </Card.Body>
        </Card>
      </Row>
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
                    <Row className="justify-content-center">
                      <div className={classes.Div}>
                        <Form.Item
                          label="Invite Friends"
                          tooltip={{
                            title:
                              "Invite people from your friends list. You can add more friends later.",
                            icon: <InfoCircleOutlined />,
                          }}
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select from Friends List"
                            className={classes.dropdown}
                            onChange={(value) => props.setInvitees(value)}
                            value={props.event.invitees}
                          >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                          </Select>
                          <Button
                            onClick={props.addVerified}
                            className={classes.AddVerified}
                          >
                            Invite Friend
                          </Button>
                        </Form.Item>
                      </div>
                    </Row>
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
      <hr />
      <Row className="justify-content-center mt-3">
        <Button variant="danger" onClick={props.handleShow}>
          Cancel Event
        </Button>
      </Row>
      <br />

      <EventModal
        show={props.showLink}
        close={props.handleCloseLink}
        url={props.event.url}
        role={props.role}
        type="url"
      />

      <EventModal
        show={props.showSuggested}
        close={props.handleCloseSuggested}
        suggestedTimes={props.event.suggestedTimes}
        onChecked={props.onChecked}
        handleFinal={props.handleFinal}
        role={props.role}
        type="suggestedTimes"
      />

      <EventModal
        show={props.show}
        close={props.handleClose}
        delete={props.handleDelete}
        role={props.role}
        type="delete"
      />
    </div>
  );
};

export default CreatorEvent;
