import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Form, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
// import Badge from "react-bootstrap/Badge";
import FormB from "react-bootstrap/Form";
import { CardGroup } from "react-bootstrap";

import classes from "./EventPage.module.css";
import axios from "../../axios";

import EventAttendees from "../../components/EventParts/EventAttendees/EventAttendees";
import EventTitle from "../../components/EventParts/EventTitle/EventTitle";
import EventModalTimes from "../../components/EventParts/EventModalTimes/EventModalTimes";
import Spinner from "../../components/UI/Spinner/Spinner";
// import EventInvitees from "../../components/EventParts/EventInvitees/EventInvitees";
import EventSupplies from "./EventSupplies/EventSupplies";

/*
  TODO: comment

  Props:
    This component does not accept any custom props
*/

const EventPage = () => {
  const key = "57a7ac80";

  const [loading, setLoading] = useState({
    event: true,
    user: true,
  });

  //for event
  const [event, setEvent] = useState({
    // id: "1-i-am-random-event-id",
    // title: "Study Dateeeeeeeeeeeeeeeeeeeeee",
    // day: "Wed",
    // date: "Mar 10",
    // time: "5:00 pm",
    // location: "New York, NY",
    // description:
    //   "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
    // attendees: [
    //   "Angela Tim",
    //   "Matthew Fishman",
    //   "Timothy Sanders",
    //   "Spike Spiegel",
    //   "Faye Valentine",
    // ],
    // creator: "Angela Tim",
    // roles: new Array(),
    // suggestedTimes: [
    //   "Wed, Mar 10 @ 6:00 pm",
    //   "Wed, Mar 10 @ 7:00 pm",
    //   "Wed, Mar 10 @ 8:00 pm",
    // ],
    // finalDay: null,
    // finalDate: null,
    // finalTime: null,
  });

  //for current user info
  const [user, setUser] = useState({
    name: "",
    friends: [],
  });

  //for general state of current event page
  const [state, setState] = useState({
    unverifiedInput: React.createRef(), //used to reference to name input by unverified user
    descriptionInput: React.createRef(),
    creator: false,
    attendee: false,
    unverified: false,
    redirect: false, //if true, page will redirect back to home
  });

  //for suggested times & final time
  const [chosenTime, setChosenTime] = useState({
    day: "test",
    date: "test",
    time: "test",
  });

  //for inviting friends
  const { Option } = Select;
  const [invitees, setInvitees] = useState();

  //for edit description
  const [description, setDescription] = useState({
    edit: false,
    description: "",
  });

  useEffect(() => {
    let eventQueryID = window.location.pathname.split("id:")[1];
    axios
      .get(`/event/${eventQueryID}.json?key=${key}`)
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let addUnverified = (e) => {
    console.log(e.target.previousElementSibling.inputValue);
    let newAttendee = state.unverifiedInput.current.value;
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
  useEffect(() => {
    //for attendees list & attendee roles
    if (event.attendees) {
      event.attendees.map((attendee, index) => {
        if (event.creator === attendee) {
          event.roles.push("Creator");
        } else {
          event.roles.push("Attendee");
        }
        // TODO: should return something from map function
      });
      console.log(event.roles);
    }
  }, [event.attendees]); // TODO: check warnings

  const [showLink, setShowLink] = useState(false);
  const handleShowLink = () => setShowLink(true);
  const handleCloseLink = () => setShowLink(false);
  useEffect(() => {
    //for generating event url
    if (event.id) {
      let eventURL = window.location.origin + "/event/id:" + event.id.$oid;
      setEvent((prevState) => ({
        ...prevState,
        url: eventURL,
      }));
    }
  }, [event.id]);

  let suggestedTimes;
  // let suggestedModal;
  let onChecked = (e) => {
    setChosenTime((prevState) => ({
      ...prevState,
      day: e.target.getAttribute("day"),
      date: e.target.getAttribute("date"),
      time: e.target.getAttribute("time"),
    }));
  };
  const [showSuggested, setShowSuggested] = useState(false);
  const handleShowSuggested = () => setShowSuggested(true);
  const handleCloseSuggested = (e) => setShowSuggested(false);
  const handleFinal = () => {
    console.log("chosenn time: ", chosenTime);
    setEvent((prevState) => ({
      ...prevState,
      finalDay: chosenTime.day,
      finalDate: chosenTime.date,
      finalTime: chosenTime.time,
    }));
    setShowSuggested(false);
    //axios post call to update event
    axios
      .post("/events/" + event.id.$oid + `.json?key=${key}`, event)
      .then((response) => {
        console.log(response);
      });
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
  }, [event.finalDay]); // TODO: check warnings

  let addVerified = (e) => {
    let attendeesCopy = [...event.attendees]; //make a shallow copy first
    let rolesCopy = [...event.roles];
    if (invitees.length > 0) {
      for (let i = 0; i < invitees.length; i++) {
        attendeesCopy.splice(1, 0, invitees[i]);
        rolesCopy.splice(1, 0, "Attendee");
      }
      console.log(invitees);
      setInvitees(null);
      setEvent((prevState) => ({
        ...prevState,
        attendees: attendeesCopy,
        roles: rolesCopy,
      }));
    }
  };
  useEffect(() => {
    // setState((prevState) => ({
    //   ...prevState,
    //   name: "Angela Tim",
    //   friends: [
    //     { value: "friend_first1 friend_last1" },
    //     { value: "friend_first2 friend_last2" },
    //     { value: "friend_first3 friend_last3" },
    //     { value: "friend_first4 friend_last4" },
    //     { value: "friend_first5 friend_last5" },
    //   ],
    // }));
    // setLoading({ user: false });
    axios
      .get(`/users/123.json?key=${key}`)
      .then((response) => {
        setUser((prevState) => ({
          ...prevState,
          name: response.data.name,
        }));
        let friendsNames = [];
        response.data.friends.map((friend, index) => {
          friendsNames.push(friend.name);
          // TODO: map function should return something
        });
        setUser((prevState) => ({
          ...prevState,
          name: response.data.name,
          friends: friendsNames,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(user.friends);
  }, [user.friends]);

  //for canceling event
  const [show, setShow] = useState(false);
  const handleDelete = () => {
    axios
      .delete(`/event/${event.id}.json?key=${key}`)
      .then((response) => {
        console.log("deleted");
        console.log(response);
        setShow(false);
        setState((prevState) => ({
          ...prevState,
          redirect: true,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for editing description
  let editDescription = () => {
    setDescription((prevState) => ({
      ...prevState,
      edit: true,
      description: event.description,
    }));
  };
  let handleDescription = () => {
    if (description.description !== "") {
      setEvent((prevState) => ({
        ...prevState,
        description: description.description,
      }));
    }
    setDescription((prevState) => ({
      ...prevState,
      edit: false,
    }));
    //axios post to update event
    axios
      .post("/events/" + event.id.$oid + `.json?key=${key}`, event)
      .then((response) => {
        console.log(response);
      });
  };
  let descriptionChange = (e) => {
    setDescription((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };
  let cancelDescription = () => {
    setDescription((prevState) => ({
      ...prevState,
      edit: false,
    }));
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      unverified: true,
      // creator: true,
      // attendee: true
    }));
    // if (user.name !== "" && event.creator) {
    //   console.log(user.name);
    //   console.log(event.creator);
    //   if (user.name === event.creator) {
    //     setState(prevState => ({
    //       ...prevState,
    //       creator: true
    //     }));
    //   } else {
    //     setState(prevState => ({
    //       ...prevState,
    //       attendee: true
    //     }));
    //   }
    // } else {
    //   setState(prevState => ({
    //     ...prevState,
    //     unverified: true
    //   }));
    // }
  }, [event, user]);

  useEffect(() => {
    console.log(event);
    console.log(state);
    if (
      state.creator === true ||
      state.attendee === true ||
      state.unverified === true
    ) {
      setLoading((prevState) => ({
        ...prevState,
        event: false,
        user: false,
      }));
    } // TODO: check warnings
  }, [state]);

  if (state.redirect === true) {
    return <Redirect to="/" />;
  }
  let eventPage = <Spinner />;
  if (!loading.event && !loading.user) {
    if (state.attendee === true) {
      eventPage = (
        <Container fluid className={classes.Container}>
          <Row className={classes.EventTitle}>
            <EventTitle
              title={event.title}
              day={event.day}
              date={event.date}
              time={event.time}
              location={event.location}
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

          <CardGroup>
            <Card className={classes.CardBorder}>
              <Container fluid>
                <Row>
                  <div className={classes.Profile}>
                    <Card className={classes.CardAttendee}>
                      <Card.Title
                        className={classes.TitleAttendee}
                      ></Card.Title>
                      <Card.Title className={classes.AttendeeTitle}>
                        <h5>Event Attendees</h5>
                        <hr />
                      </Card.Title>
                      <Card.Body className={classes.AttendeesBody}>
                        <EventAttendees
                          attendees={event.attendees}
                          roles={event.roles}
                          isAuthenticated={state.isAuthenticated}
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
    } else if (state.creator === true) {
      console.log("hewwo");
      eventPage = (
        <Container fluid className={classes.Container}>
          <Row className={classes.Row}>
            <Button
              variant="outline-primary"
              className={classes.LinkBtn}
              onClick={handleShowLink}
            >
              Generate Event Link
            </Button>
            <Button
              variant="outline-primary"
              className={classes.SuggestedBtn}
              onClick={handleShowSuggested}
            >
              Choose Final Time
            </Button>
          </Row>

          <Row className={classes.EventTitle}>
            <EventTitle
              title={event.title}
              day={event.day}
              date={event.date}
              time={event.time}
              location={event.location}
            />
          </Row>
          <hr />
          <br />

          {/* TODO: check warnings about href */}
          <Row className="justify-content-center">
            <Card className={classes.CardInfo}>
              <Card.Body className={classes.CardDetail}>
                {description.edit === false ? (
                  <div>
                    <Card.Title>
                      Event Details 
                      <a className={classes.Edit} onClick={editDescription}>
                        Edit
                      </a>
                    </Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                  </div>
                ) : (
                  <div>
                    <Card.Title>Event Details</Card.Title>
                    <Card.Text>
                      <FormB.Group>
                        <FormB.Control
                          as="textarea"
                          rows={3}
                          defaultValue={description.description}
                          value={description.description}
                          onChange={descriptionChange}
                        />
                      </FormB.Group>
                    </Card.Text>
                    <Row className="justify-content-end pr-3">
                      <Button variant="danger" onClick={cancelDescription}>
                        Cancel
                      </Button>
                      <Button className="ml-2" onClick={handleDescription}>
                        Save Changes
                      </Button>
                    </Row>
                  </div>
                )}
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
                      <Card.Title
                        className={classes.TitleAttendee}
                      ></Card.Title>
                      <Card.Title className={classes.AttendeeTitle}>
                        <h5>Event Attendees</h5>
                        <hr />
                      </Card.Title>
                      <Card.Body className={classes.AttendeesBody}>
                        <EventAttendees
                          attendees={event.attendees}
                          roles={event.roles}
                          isAuthenticated={state.isAuthenticated}
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
                                onChange={(value) => setInvitees(value)}
                                value={event.invitees}
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

          <Row className="justify-content-center mt-3">
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
              <EventModalTimes
                suggestedTimes={event.suggestedTimes}
                onChecked={onChecked}
              />
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
      eventPage = (
        <Container className={classes.Container}>
          <Row>
            <EventTitle
              title={event.title}
              day={event.day}
              date={event.date}
              time={event.time}
              location={event.location}
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

          <h5 className="ml-2">Event Attendees</h5>
          <div className={classes.AttendeesBody}>
            <EventAttendees
              attendees={event.attendees}
              roles={event.roles}
              isAuthenticated={state.isAuthenticated}
            ></EventAttendees>
          </div>
          <br />

          <Row className="justify-content-center">
            <div className={classes.Div}>
              <InputGroup className={classes.Input}>
                <FormControl
                  ref={state.unverifiedInput}
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
  }

  return <div>{eventPage}</div>;
};

export default EventPage;
