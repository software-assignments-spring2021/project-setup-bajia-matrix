import React, { useState, useEffect } from "react";
//import axios from '../../../axios';

import EventAttendees from "../../components/EventParts/EventAttendees/EventAttendees";
import EventTitle from "../../components/EventParts/EventTitle/EventTitle";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Event.module.css";

import {
  Alert,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Space,
  TimePicker,
  Tag,
} from "antd";
import {
  CopyOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import FormB from "react-bootstrap/Form";

const Event = (props) => {
  const [event, setEvent] = useState({
    id: "1-i-am-random-event-id",
    title: "Study Dateeeeeeeeeeeeeeeeeeeeee",
    day: "Wed",
    date: "Mar 10",
    time: "5:00 pm",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
    attendees: [
      "Angela Tim",
      "Matthew Fishman",
      "Timothy Sanders",
      "Spike Spiegel",
      "Faye Valentine",
    ],
    myCreatedEvent: true,
    creator: "Angela Tim",
    roles: new Array(),
    suggestedTimes: [
      "Wed, Mar 10 @ 6:00 pm",
      "Wed, Mar 10 @ 7:00 pm",
      "Wed, Mar 10 @ 8:00 pm",
    ],
    finalDay: null,
    finalDate: null,
    finalTime: null,
  });

  /////////////////////////////////////////////////////////
  //for current user name & current user friends
  const [state, setState] = useState({
    textInput: React.createRef(),
    name: "",
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      name: "Angela Tim",
      friends: [
        { value: "friend_first1 friend_last1" },
        { value: "friend_first2 friend_last2" },
        { value: "friend_first3 friend_last3" },
        { value: "friend_first4 friend_last4" },
        { value: "friend_first5 friend_last5" },
      ],
    }));
    // axios.get("/url-to-get-current-user-name")
    //   .then(response => {
    //     setState(prevState => ({
    //       ...prevState,
    //       name: response.name
    //     }));
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, []);

  /////////////////////////////////////////////////////////
  //for event attendees & avis
  useEffect(() => {
    event.attendees.map((attendee) => {
      if (event.creator === attendee) {
        event.roles.push("Creator");
      } else {
        event.roles.push("Attendee");
      }
    });
  }, []);

  let addUnverified = (e) => {
    console.log(e.target.previousElementSibling.inputValue);
    let newAttendee = state.textInput.current.value;
    let newAttendees = [...event.attendees]; //make a shallow copy first
    newAttendees.splice(1, 0, newAttendee);
    let newRoles = [...event.roles];
    newRoles.splice(1, 0, "Attendee");

    setEvent((prevState) => ({
      ...prevState,
      attendees: newAttendees,
      roles: newRoles,
    }));
  };

  /////////////////////////////////////////////////////////
  //for canceling event
  const [show, setShow] = useState(false);
  const handleDelete = () => {
    //delete axios call here
    setShow(false);
    props.history.push("/home");
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /////////////////////////////////////////////////////////
  //for suggested times & final time
  const [chosenTime, setChosenTime] = useState({
    day: "",
    date: "",
    time: "",
    show: true,
  });

  let suggestedTimes = event.suggestedTimes.map((time) => (
    <h5>
      <Badge className="text-wrap" variant="primary">
        {time}
      </Badge>
    </h5>
  ));

  let onChecked = (e) => {
    let chosenTime = e.target.nextElementSibling.children[0].innerText;
    let finalDay = chosenTime.split(",")[0];
    let finalDate = chosenTime.split(",")[1].split("@")[0];
    let finalTime = chosenTime.split(",")[1].split("@")[1];
    setChosenTime((prevState) => ({
      ...prevState,
      day: finalDay,
      date: finalDate,
      time: finalTime,
    }));
  };

  let suggestedModal = event.suggestedTimes.map((time) => (
    <div className="form-check mt-1">
      <input
        className="form-check-input mt-2"
        type="radio"
        name="exampleRadios"
        id="exampleRadios1"
        defaultValue="option1"
        onClick={onChecked}
      />
      <label className="form-check-label" htmlFor="exampleRadios1">
        <h5>
          <Badge className="text-wrap" variant="primary">
            {time}
          </Badge>
        </h5>
      </label>
    </div>
  ));

  const [showSuggested, setShowSuggested] = useState(false);
  const handleShowSuggested = () => setShowSuggested(true);
  const handleCloseSuggested = (e) => setShowSuggested(false);
  const handleFinal = () => {
    setEvent((prevState) => ({
      ...prevState,
      finalDay: chosenTime.day,
      finalDate: chosenTime.date,
      finalTime: chosenTime.time,
    }));
    setShowSuggested(false);
  };

  useEffect(() => {
    if (event.finalDay) {
      console.log("finalDay changed!");
      setEvent((prevState) => ({
        ...prevState,
        day: event.finalDay,
        date: event.finalDate,
        time: event.finalTime,
      }));
      setChosenTime((prevState) => ({
        ...prevState,
        show: false,
      }));
    }
  }, [event.finalDay]);

  /////////////////////////////////////////////////////////
  //for generating event link
  useEffect(() => {
    let eventURL = window.location.origin + "/event/" + event.id;
    setEvent((prevState) => ({
      ...prevState,
      url: eventURL,
    }));
  }, []);

  const [showLink, setShowLink] = useState(false);
  const handleShowLink = () => setShowLink(true);
  const handleCloseLink = () => setShowLink(false);

  /////////////////////////////////////////////////////////
  //for inviting friends
  const { Option } = Select;
  const [invitees, setInvitees] = useState();

  let addVerified = (e) => {
    let attendeesCopy = [...event.attendees]; //make a shallow copy first
    let rolesCopy = [...event.roles];
    for (let i = 0; i < invitees.length; i++) {
      attendeesCopy.splice(1, 0, invitees[i]);
      rolesCopy.splice(1, 0, "Attendee");
    }

    setEvent((prevState) => ({
      ...prevState,
      attendees: attendeesCopy,
      roles: rolesCopy,
    }));

    setInvitees([]);
  };

  if (props.isAuthenticated) {
    if (state.name === event.creator) {
      return (
        <Container fluid className={classes.Container}>
          <Row className={classes.Row}>
            <Button
              variant="outline-primary"
              className={classes.Button}
              onClick={handleShowLink}
            >
              Generate Event Link
            </Button>
          </Row>

          <Row className={classes.EventTitle}>
            <EventTitle
              title={event.title}
              day={event.day}
              date={event.date}
              time={event.time}
            />
          </Row>
          <hr />
          <br />

          <Row className="justify-content-center">
            <Card className={classes.CardInfo}>
              <Card.Body className={classes.CardDetail}>
                <Card.Title>
                  Event Details
                  <a className={classes.Edit}>Edit</a>
                </Card.Title>
                <Card.Text>{event.description}</Card.Text>
              </Card.Body>
              <Card.Body className={classes.CardTime}>
                {chosenTime.show ? (
                  <div>
                    <Card.Title>Suggested Time(s)</Card.Title>
                    <Card.Text className={classes.CardTimes}>
                      {suggestedTimes}
                    </Card.Text>
                    <Button
                      onClick={handleShowSuggested}
                      className={classes.FinalTime}
                    >
                      Choose Final Time
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Card.Title>Final Event Time</Card.Title>
                    <Card.Text className={classes.CardTimes}>
                      <h5>
                        <Badge className="text-wrap" variant="primary">
                          {event.finalDay}, {event.finalDate} @{" "}
                          {event.finalTime}
                        </Badge>
                      </h5>
                    </Card.Text>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Row>
          <br />
          <hr />
          <br />

          <EventAttendees
            attendees={event.attendees}
            roles={event.roles}
            isAuthenticated={state.isAuthenticated}
          ></EventAttendees>
          <br />

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
                  onChange={(value) => setInvitees(value)}
                  value={invitees}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
                <Button
                  className="ml-3"
                  onClick={addVerified}
                  className={classes.AddVerified}
                >
                  Invite Friend
                </Button>
              </Form.Item>
            </div>
          </Row>
          <br />
          <hr />
          <br />

          <Row className="justify-content-center">
            <Button variant="danger" onClick={handleShow}>
              Cancel Event
            </Button>
          </Row>
          <br />

          <Modal
            show={showLink}
            onHide={handleCloseLink}
            className={classes.Modal}
          >
            <Modal.Header className={classes.Header}>
              <Modal.Title className="pl-4">Generate Event URL</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-5 pt-4">
              Copy and paste the link below to share this event:
              <InputGroup className="my-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>📋</InputGroup.Text>
                </InputGroup.Prepend>
                <FormB.Control
                  plaintext
                  readOnly
                  defaultValue={event.url}
                  className="border pl-3"
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer className={classes.Footer}>
              <Button variant="secondary" onClick={handleCloseLink}>
                Go Back
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showSuggested}
            onHide={handleCloseSuggested}
            className={classes.Modal}
          >
            <Modal.Header className={classes.Header}>
              <Modal.Title className="pl-4">
                Choose Final Event Time
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-5 pt-4">
              The following are the most popular suggested times. <br />
              <p>Please select a finalized time for your event:</p>
              {suggestedModal}
            </Modal.Body>
            <Modal.Footer className={classes.Footer}>
              <Button variant="secondary" onClick={handleCloseSuggested}>
                Go Back
              </Button>
              <Button variant="primary" onClick={handleFinal}>
                Choose Final Time
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={show} onHide={handleClose} className={classes.Modal}>
            <Modal.Header className={classes.Header}>
              <Modal.Title className="pl-4">Cancel Event</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pl-5 pt-4">
              Are you sure you want to cancel this event? <br /> You can't undo
              this action.
            </Modal.Body>
            <Modal.Footer className={classes.Footer}>
              <Button variant="secondary" onClick={handleClose}>
                Go Back
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Cancel Event
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      );
    } else {
      return (
        <Container fluid className={classes.Container}>
          <Row className={classes.EventTitle}>
            <EventTitle
              title={event.title}
              day={event.day}
              date={event.date}
              time={event.time}
            />
          </Row>
          <hr />
          <br />

          <Row className="justify-content-center">
            <Card className={classes.CardInfo}>
              <Card.Body>
                <Card.Title>Event Details</Card.Title>
                <Card.Text>{event.description}</Card.Text>
              </Card.Body>
            </Card>
          </Row>
          <br />
          <hr />
          <br />

          <EventAttendees
            attendees={event.attendees}
            roles={event.roles}
            isAuthenticated={state.isAuthenticated}
          ></EventAttendees>
          <br />
          <hr />
          <br />

          <Row className="justify-content-center">
            <Button variant="danger" onClick={handleShow}>
              Withdraw from Event
            </Button>
          </Row>
          <br />

          <Modal show={show} onHide={handleClose} className={classes.Modal}>
            <Modal.Header className={classes.Header}>
              <Modal.Title className="pl-4">Withdraw from Event</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pl-5 pt-4">
              Are you sure you want to withdraw from this event? <br /> You
              can't undo this action.
            </Modal.Body>
            <Modal.Footer className={classes.Footer}>
              <Button variant="secondary" onClick={handleClose}>
                Go Back
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Withdraw from Event
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      );
    }
  } else {
    return (
      <Container className={classes.Container}>
        <Row>
          <EventTitle
            title={event.title}
            day={event.day}
            date={event.date}
            time={event.time}
          />
        </Row>
        <hr />
        <br />

        <Row className="justify-content-center">
          <Card className={classes.CardInfo}>
            <Card.Body>
              <Card.Title>Event Details</Card.Title>
              <Card.Text>{event.description}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <br />
        <hr />
        <br />

        <EventAttendees
          attendees={event.attendees}
          roles={event.roles}
          isAuthenticated={state.isAuthenticated}
        ></EventAttendees>
        <br />

        <Row className="justify-content-center">
          <div className={classes.Div}>
            <InputGroup className={classes.Input}>
              <FormControl
                ref={state.textInput}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Enter Your Name"
              />
              <Button className="ml-3" onClick={addUnverified}>
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
              <Button href="/signup" variant="primary">
                Create Account
              </Button>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
        </Row>
        <br />
      </Container>
    );
  }
};

export default Event;
