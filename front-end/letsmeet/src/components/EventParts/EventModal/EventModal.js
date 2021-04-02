import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./EventModal.module.css";

import EventModalTimes from "../EventModalTimes/EventModalTimes";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const handleCopy = (e, url) => {
  navigator.clipboard.writeText(url);
  e.target.style.backgroundColor = "gray";
}

const EventModal = (props) => {
  if (props.role === "attendee") {
    return (
      <Modal show={props.show} onHide={props.close} className={classes.Modal}>
        <Modal.Header className={classes.Header}>
          <Modal.Title className="pl-4">Withdraw from Event</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pl-5 pt-4">
          Are you sure you want to withdraw from this event? <br /> You can't
          undo this action.
        </Modal.Body>
        <Modal.Footer className={classes.Footer}>
          <Button variant="secondary" onClick={props.close}>
            Go Back
          </Button>
          <Button variant="danger" onClick={props.delete}>
            Withdraw from Event
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else if (props.role === "creator") {
    if (props.type === "url") {
      return (
        <Modal show={props.show} onHide={props.close} className={classes.Modal}>
          <Modal.Header className={classes.Header}>
            <Modal.Title className="pl-4">Generate Event URL</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-5 pt-4">
            Copy and paste the link below to share this event:
            <InputGroup className="my-3">
              <InputGroup.Prepend onClick={(e) => {handleCopy(e, props.url)}}>
                <InputGroup.Text>📋</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                plaintext
                readOnly
                defaultValue={props.url}
                className="border pl-3"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer className={classes.Footer}>
            <Button variant="secondary" onClick={props.close}>
              Go Back
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else if (props.type === "suggestedTimes") {
      return (
        <Modal show={props.show} onHide={props.close} className={classes.Modal}>
          <Modal.Header className={classes.Header}>
            <Modal.Title className="pl-4">Choose Final Event Time</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-5 pt-4">
            The following are the most popular suggested times from most popular (top) to least popular (bottom). <br />
            <p>Please select a finalized time for your event:</p>
            <EventModalTimes
              suggestedTimes={props.suggestedTimes}
              onChecked={props.onChecked}
            />
          </Modal.Body>
          <Modal.Footer className={classes.Footer}>
            <Button variant="secondary" onClick={props.close}>
              Go Back
            </Button>
            <Button variant="primary" onClick={props.handleFinal}>
              Choose Final Time
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return (
        <Modal show={props.show} onHide={props.close} className={classes.Modal}>
          <Modal.Header className={classes.Header}>
            <Modal.Title className="pl-4">Cancel Event</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pl-5 pt-4">
            Are you sure you want to cancel this event? <br /> You can't undo
            this action.
          </Modal.Body>
          <Modal.Footer className={classes.Footer}>
            <Button variant="secondary" onClick={props.close}>
              Go Back
            </Button>
            <Button variant="danger" onClick={props.delete}>
              Cancel Event
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
};

export default EventModal;
