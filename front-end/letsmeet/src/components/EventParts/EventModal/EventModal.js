import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tag } from 'antd';

// import custom files and components
import classes from "./EventModal.module.css";
import EventModalTimes from "../EventModalTimes/EventModalTimes";

/* 
  This component displays the following modals associated with the event page:
    - Withdraw from Event modal
    - Generate Event URL modal
    - Choose Final Time modal
    - Cancel Event modal

  Props: 
    - show: state variable that displays the Withdraw from Event modal when true
    - close: state variable that hides the Withdraw from Event modal when true
    - role: state variable that determines whether current user is attendee or creator
    - type: state variable that determins the specific modal to display
    - delete: function that deletes the event or removes user from event attendee list 
    - url: state variable that contains the current event's url
    - suggestedTimes: state variable that contains the current event's suggested final times
    - onChecked: function that handles when user checks a suggested final time
    - handleFinal: function that update the event's time to the user selected final time
*/

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
            <Row>
            <Col lg="auto">
              <CopyToClipboard text={props.url} className={classes.CopyLink}>
                <Tag className={classes.copyButton}>📋</Tag>
              </CopyToClipboard>
              <input type="text" value={props.url} readOnly className={classes.Input} />
              </Col>
            </Row>
            {/* <InputGroup className="my-3">
              <InputGroup.Prepend onClick={(e) => {handleCopy(e, props.url)}}>
                <InputGroup.Text>📋</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                plaintext
                readOnly
                defaultValue={props.url}
                className="border pl-3"
              />
            </InputGroup> */}
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
            <p className="h6 mb-3">The following are suggested final times from most popular (top) to least popular (bottom). </p>
            <p className="h6">Please select a finalized time:<br/><span className="small text-danger"><em>* Final time can only be chosen once!</em></span></p>
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
