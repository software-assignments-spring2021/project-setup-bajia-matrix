import React, { useState, useEffect } from "react";

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

const CreatorEvent = (props) => {
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
                  <a className={classes.Edit} onClick={props.editDescription}>
                    Edit
                  </a>
                </Card.Title>
                <Card.Text>{props.event.description}</Card.Text>
              </div>
            ) : (
              <div>
                <Card.Title>Event Details</Card.Title>
                <Card.Text>
                  <FormB.Group>
                    <FormB.Control
                      as="textarea"
                      rows={3}
                      defaultValue={props.description.description}
                      value={props.description.description}
                      onChange={props.descriptionChange}
                    />
                  </FormB.Group>
                </Card.Text>
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
                            className="ml-3"
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
