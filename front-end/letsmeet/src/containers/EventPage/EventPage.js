import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Select } from "antd";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

// import custom files and components
import classes from "./EventPage.module.css";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import AttendeeEvent from "../../components/EventPages/AttendeeEvent/AttendeeEvent";
import CreatorEvent from "../../components/EventPages/CreatorEvent/CreatorEvent";
import UnverifiedEvent from "../../components/EventPages/UnverifiedEvent/UnverifiedEvent";
import EventContext from '../../store/event-context';

/*
  This component displays the Event pages for the following users: event creator, event attendee, and unverfied user.

  Props:
    This component does not accept any custom props
*/

const EventPage = (props) => {
  const [loading, setLoading] = useState({
    event: true,
    user: true,
  });

  // for event
  const [event, setEvent] = useState({
    attendees: [],
    supplies: []
  });
  
  // for current user info
  const [user, setUser] = useState({});

  // for general state of current event page
  const [state, setState] = useState({
    unverifiedInput: React.createRef(), // used to reference to name input by unverified user
    descriptionInput: React.createRef(),
    creator: false,
    attendee: false,
    unverified: false,
    redirect: false, // if true, page will redirect back to home
  });

  // for suggested times & final time
  const [chosenTime, setChosenTime] = useState({
    day: "",
    date: "",
    time: "",
  });

  // for inviting friends
  // eslint-disable-next-line
  const [invitees, setInvitees] = useState();

  // for edit description
  const [description, setDescription] = useState({
    edit: false,
    description: "",
  });

  useEffect(() => {
    if (props.location.state) {
      const eventState = JSON.parse(props.location.state.eventState);
      setEvent(eventState);
    }
    else {
      let eventQueryID = window.location.pathname.split("/")[2];
      axios.get("/events?eventid=" + eventQueryID)
        .then((response) => {
          setEvent(response.data);

          if (props.isAuthenticated) {
            axios.get("/profile?userid=" + response.data.creatorID)
              .then(response => {
                setEvent((prevState) => ({
                  ...prevState,
                  creatorAvi: response.data.avatar,
                }))
              })
              .catch(error => {
                console.log(error);
              })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props]);

  // get avis of all attendees
  useEffect(() => {
    if (event.attendees.length > 0) {
      axios.post("profile/avis", { attendees: [...event.attendees] })
        .then((response) => {
          setEvent((prevState) => ({
            ...prevState,
            avis: response.data,
          }))
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [event.attendees])

  let addUnverified = (e) => {
    // check if unverified email already exists in database
    axios.get('/profile?findUser=true&searchEmail=' + state.unverifiedInput.current.value)
      .then((response) => {
        if (response.data.length === 0) {
          let attendeesCopy = [...event.attendees];
          let newAttendee = {
            name: state.unverifiedInput.current.value,
            eventID: event._id
          };

          // check if unverified email is correct email format
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          const isValid = pattern.test(newAttendee.name);
          if (isValid) {
            // check if unverified email is already in attendee list
            let duplicate = false;
            attendeesCopy.forEach(attendee => {
              if (attendee.eventID) {
                if (attendee.name === newAttendee.name) {
                  duplicate = true;
                }
              }
            })
            if (duplicate === true) {
              setEvent((prevState) => ({
                ...prevState,
                emailMessage: "The email address already exists in the event attendee list. Please enter another email."
              }))
            } else {
              attendeesCopy.push(newAttendee);
              setEvent((prevState) => ({
                ...prevState,
                attendees: attendeesCopy,
                unverifiedURL: "/signup?id=" + event._id + "&email=" + state.unverifiedInput.current.value,
                emailMessage: null
              }))
              axios.post("/events/newAttendee", newAttendee)
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          } else {
            setEvent((prevState) => ({
              ...prevState,
              emailMessage: "The email address you entered is not valid. Please try again."
            }))
          }

        } else {
          setEvent((prevState) => ({
            ...prevState,
            emailMessage: "An account with the email already exists. Please enter another email or log in."
          }))
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const [showLink, setShowLink] = useState(false);
  const handleShowLink = () => setShowLink(true);
  const handleCloseLink = () => setShowLink(false);
  useEffect(() => {
    // for generating event url
    if (event._id) {
      let eventURL = window.location.origin + "/event/" + event._id;
      setEvent((prevState) => ({
        ...prevState,
        url: eventURL,
      }));
    }
  }, [event._id]);

  let onChecked = (e) => {
    setChosenTime((prevState) => ({
      ...prevState,
      day: e.target.getAttribute("day"),
      date: e.target.getAttribute("date"),
      time: e.target.getAttribute("time"),
    }));
  };
  const [showSuggested, setShowSuggested] = useState(false);
  const handleShowSuggested = () => {
    const eventCopy = event;
    axios.post("/suggestedTimes", { availability: eventCopy.availability })
      .then(response => {
        setEvent((prevState) => ({
          ...prevState,
          suggestedTimes: response
        }));
        setShowSuggested(true);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleCloseSuggested = (e) => setShowSuggested(false);
  const handleFinal = () => {
    if (chosenTime.date !== "test" && chosenTime.date !== "") {
      setEvent((prevState) => ({
        ...prevState,
        finalDay: chosenTime.day,
        finalDate: chosenTime.date,
        finalTime: chosenTime.time
      }));

      let eventCopy = event;
      eventCopy.finalDay = chosenTime.day;
      eventCopy.finalDate = chosenTime.date;
      eventCopy.finalTime = chosenTime.time;
      eventCopy.attendees.forEach(attendee => {
        attendee.announcement = true
      })
      // axios post call to update event's final time details
      axios.post("/events", eventCopy)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShowSuggested(false);
  };

  useEffect(() => {
    if (event.finalDay) {
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
  }, [event.finalDay, event.finalDate, event.finalTime]);


  const { Option } = Select;
  let addVerified = (values) => {
    // extract names of invitees
    let invitees = [...event.invitees];
    let inviteeNames = [];
    let emailInvitees = [];
    values.friends.forEach(friend => {
      invitees.push(JSON.parse(friend));
      inviteeNames.push(JSON.parse(friend).name);
      emailInvitees.push(JSON.parse(friend));
    })

    // update friends list so that friend that was just invited does not appear
    let friends = [];
    let friendsList = [];
    event.friendsList.forEach(friend => {
      if (!inviteeNames.includes(friend.props.children)) {
        let temp = user.friends.filter(temp => { return temp.name === friend.props.children })
        friends.push(temp[0]);
      }
      return;
    })
    friendsList = friends.map(friend => (
      <Option value={JSON.stringify(friend)} key={friend.id}>{friend.name}</Option>
    ))
    setEvent((prevState) => ({
      ...prevState,
      friendsList: friendsList,
    }));

    // add friends as invitees to database
    let eventCopy = event;
    eventCopy.invitees = invitees;
    axios.post("/events", eventCopy)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.post("/events/emailInvitee", {invitees: emailInvitees, creator: event.creator})
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  // for populating list of friends to invite to event (exclude any friends already attending or invited)
  useEffect(() => {
    let friendsList;
    if (user.friends && event.title) {
      let test = [];
      if (event.invitees && event.attendees) {
        user.friends.forEach(friend => {
          let eventInvitees = false;
          let eventAttendees = false;
          event.invitees.forEach(invitee => {
            if (invitee.name === friend.name) {
              eventInvitees = true;
            }
          })
          event.attendees.forEach(attendee => {
            if (attendee.name === friend.name) {
              eventAttendees = true;
            }
          })
          if (eventInvitees === false && eventAttendees === false) {
            let duplicate = test.some(test => test.id === friend.id);
            if (!duplicate) {
              test.push(friend);
            }
          }
        })
        friendsList = test.map(test => (
          <Option value={JSON.stringify(test)} key={test.id}>{test.name}</Option>
        ))
      }
    }
    setEvent((prevState) => ({
      ...prevState,
      friendsList: friendsList,
    }));
  }, [user.friends, event.title, event.attendees, event.invitees]);

  useEffect(() => {
    // get currently logged in user info
    const id = localStorage.getItem("userID");
    if (id) {
      axios.get("/profile?userid=" + id)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // for canceling event
  const [show, setShow] = useState(false);
  const handleDelete = () => {
    axios.delete("/events?eventid=" + event._id)
      .then(response => {
        console.log(response.data);
        setShow(false);
        setState((prevState) => ({
          ...prevState,
          redirect: true,
        }));
      }).catch((error) => {
        console.log(error);
      });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // for withdrawing from event
  const handleWithdraw = () => {
    let eventCopy = event;
    let attendeesCopy = [...event.attendees];
    attendeesCopy.forEach((attendee, index) => {
      if (user._id === attendee.id) {
        attendeesCopy.splice(index, 1);
      }
    })
    let withdrawnCopy = [...event.withdrawn];
    withdrawnCopy.push({ id: user._id, name: user.name });
    setEvent((prevState) => ({
      ...prevState,
      attendees: attendeesCopy,
      withdrawn: withdrawnCopy
    }))
    eventCopy.attendees = attendeesCopy;
    eventCopy.withdrawn = withdrawnCopy;

    // axios post to update event withdrawn array
    axios.post("/events", eventCopy)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setState((prevState) => ({
      ...prevState,
      redirect: true,
    }));
  }

  // for editing description
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

    let eventCopy = event;
    eventCopy.description = description.description;
    // axios post to update event description
    axios.post("/events", eventCopy)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
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

  // for alerting attendee the final event time has been set
  const [announcement, setAnnouncement] = useState();
  let closeAnnouncement = () => {
    setAnnouncement(false);
    let eventCopy = event;
    eventCopy.attendees.forEach(attendee => {
      if (attendee.name === user.name) {
        attendee.announcement = false;
      }
    })
    axios.post("/events", eventCopy)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    event.attendees.forEach(attendee => {
      if (attendee.name === user.name) {
        if (attendee.announcement === true) {
          setAnnouncement(true);
        } else {
          setAnnouncement(false);
        }
      }
    })
  }, [event.attendees, user.name]);

  useEffect(() => {
    if (props.isAuthenticated === true) {
      if (user.name && event.title) {
        if (user._id === event.creatorID && event.creator !== "") {
          setState(prevState => ({
            ...prevState,
            creator: true
          }));
        } else {
          setState(prevState => ({
            ...prevState,
            attendee: true
          }));
        }
      }
    } else {
      if (!event.creator) {
        setState(prevState => ({
          ...prevState,
          unverified: true
        }));
      }
    }
  }, [event.title, user.name, props.isAuthenticated, event.creator, event.creatorID, user._id]);

  useEffect(() => {
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
    }
  }, [state]);

  if (state.redirect === true) {
    return <Redirect to="/" />;
  }

  // set global event context to event and its updater to setEvent
  const contextValue = {
    eventContext: event,
    setEventContext: setEvent
  };

  let eventPage = <Spinner />;
  if (!loading.event && !loading.user) {
    if (state.attendee === true) {
      eventPage = (
        <EventContext.Provider value={contextValue}>
          <Container fluid className={classes.Container}>
            <AttendeeEvent
              event={event}
              state={state}
              handleShow={handleShow}
              show={show}
              handleClose={handleClose}
              handleDelete={handleWithdraw}
              closeAnnouncement={closeAnnouncement}
              announcement={announcement}
              role="attendee"
            />
          </Container>
        </EventContext.Provider>
      );
    } else if (state.creator === true) {
      eventPage = (
        <EventContext.Provider value={contextValue}>
          <Container fluid className={classes.Container}>
            <CreatorEvent
              event={event}
              state={state}
              role="creator"
              handleShowLink={handleShowLink}
              handleShowSuggested={handleShowSuggested}
              description={description}
              editDescription={editDescription}
              descriptionChange={descriptionChange}
              cancelDescription={cancelDescription}
              handleDescription={handleDescription}
              setInvitees={setInvitees}
              addVerified={addVerified}
              handleShow={handleShow}
              showLink={showLink}
              handleCloseLink={handleCloseLink}
              showSuggested={showSuggested}
              handleCloseSuggested={handleCloseSuggested}
              onChecked={onChecked}
              handleFinal={handleFinal}
              show={show}
              handleClose={handleClose}
              handleDelete={handleDelete}
              user={user}
            />
          </Container>
        </EventContext.Provider>
      );
    } else {
      eventPage = (
        <Container className={classes.Container}>
          <UnverifiedEvent
            event={event}
            state={state}
            addUnverified={addUnverified}
          />
        </Container>
      );
    }
  }

  return <div>{eventPage}</div>;
};

export default withRouter(EventPage);
