import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./EventPage.module.css";
import Container from "react-bootstrap/Container";

import axios from "../../axios";

import Spinner from "../../components/UI/Spinner/Spinner";
// import EventInvitees from "../../components/EventParts/EventInvitees/EventInvitees";
import AttendeeEvent from "./AttendeeEvent/AttendeeEvent";
import CreatorEvent from "./CreatorEvent/CreatorEvent";
import UnverifiedEvent from "./UnverifiedEvent/UnverifiedEvent";

/*
  This component displays the event pages for the following users: event creator, event attendee, and unverfied user.

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
    id: "1-i-am-random-event-id",
    title: "Study Dateeeeeeeeeeeeeeeeeeeeee",
    day: "Wed",
    date: "Mar 10",
    time: "5:00 pm",
    location: "New York, NY",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
    attendees: [
      "Angela Tim",
      "Matthew Fishman",
      "Timothy Sanders",
      "Spike Spiegel",
      "Faye Valentine",
    ],
    creator: "Angela Tim",
    roles: new Array(),
    suggestedTimes: [
      { "Day": "Saturday", "Date": "10/30/2020", "Time": "2:09 AM" },
      { "Day": "Saturday", "Date": "04/27/2021", "Time": "7:15 AM" },
      { "Day": "Saturday", "Date": "09/16/2020", "Time": "4:52 AM" },
      { "Day": "Saturday", "Date": "01/21/2021", "Time": "3:30 AM" },
    ],
    finalDay: null,
    finalDate: null,
    finalTime: null,
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
  const [invitees, setInvitees] = useState();

  //for edit description
  const [description, setDescription] = useState({
    edit: false,
    description: "",
  });

   useEffect(() => {
      let eventQueryID = window.location.pathname.split("id:")[1];
      axios.get("/events?eventid=" + eventQueryID)
        .then((response) => {
        //console.log('successfully get event: ', response.data);
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
    let eventCopy = event;
    eventCopy.attendees = newAttendees;

    setEvent((prevState) => ({
      ...prevState,
      attendees: newAttendees,
      roles: newRoles,
    }))

    axios.post("/events?eventid=" + event.id.$oid, eventCopy)
      .then((response) => {
        console.log('successfully posted new attendee: ', response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    //for attendees list & attendee roles
    if (event.attendees) {
      event.attendees.filter((attendee) => {
        if (event.creator === attendee) {
          event.roles.push("Creator");
        } else {
          event.roles.push("Attendee");
        }
      });
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
    
    // BING: retrieve suggested times and update event.suggestedTimes from backend
        
    // get browser's current timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const ev = {
      availability: [
        "Mon Apr 02 2001 11:00:00 GMT-0400 (Eastern Daylight Time)",
        "Wed Apr 04 2001 14:00:00 GMT-0500 (Eastern Daylight Time)",
        "Thu Apr 05 2001 14:00:00 GMT-0400 (Eastern Daylight Time)",
        "Fri Apr 06 2001 18:00:00 GMT-0400 (Eastern Daylight Time)",
        "Thu Apr 05 2001 11:00:00 GMT-0400 (Eastern Daylight Time)",
        "Thu Apr 05 2001 12:00:00 GMT-0400 (Eastern Daylight Time)",
        "Thu Apr 05 2001 14:00:00 GMT-0400 (Eastern Daylight Time)",
        "Thu Apr 05 2001 13:00:00 GMT-0400 (Eastern Daylight Time)",
        "Thu Apr 05 2001 12:00:00 GMT-0400 (Eastern Daylight Time)",
        "Thu Apr 05 2001 14:00:00 GMT-0400 (Eastern Daylight Time)",
        "Wed Apr 04 2001 19:00:00 GMT-0400 (Eastern Daylight Time)",
        "Mon Apr 02 2001 11:00:00 GMT-0400 (Eastern Daylight Time)",
        "Thu Apr 05 2001 14:00:00 GMT-0400 (Eastern Daylight Time)"
      ],
      tz: timezone
    }
    
    // TODO: once we have database, send this info from the state instead of hardcoding
    // aka change ev to event and remove ev above
    // no need to link to specific event since just passing the times to perform the algorithm with
    axios.post("/suggestedTimes", ev)
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
    console.log("chosen time: ", chosenTime);
    setEvent((prevState) => ({
      ...prevState,
      finalDay: chosenTime.day,
      finalDate: chosenTime.date,
      finalTime: chosenTime.time,
    }));
    setShowSuggested(false);

    let eventCopy = event;
    eventCopy.finalDay = chosenTime.day;
    eventCopy.finalDate = chosenTime.date;
    eventCopy.finalTime = chosenTime.time;
    //axios post call to update event's final time details
    axios.post("/events?eventid=" + event.id.$oid, eventCopy)
      .then((response) => {
        console.log('successfully updated event\'s final time: ', response);
      })
      .catch((error) => {
        console.log(error);
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

      let eventCopy = event;
      eventCopy.attendees = attendeesCopy;
      axios.post("/events?eventid=" + event.id.$oid, eventCopy)
      .then((response) => {
        console.log('successfully posted new attendee: ', response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  //useEffect(() => {
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

    // axios
    //   .get(`/users/123.json?key=${key}`)
    //   .then((response) => {
    //     setUser((prevState) => ({
    //       ...prevState,
    //       name: response.data.name,
    //     }));
    //     let friendsNames = [];
    //     response.data.friends.map((friend, index) => {
    //       friendsNames.push(friend.name);
    //       // TODO: map function should return something
    //     });
    //     setUser((prevState) => ({
    //       ...prevState,
    //       name: response.data.name,
    //       friends: friendsNames,
    //     }));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  //}, []);

  useEffect(() => {
    console.log(user.friends);
  }, [user.friends]);

  //for canceling event
  const [show, setShow] = useState(false);
  const handleDelete = () => {
    axios.delete("/events?eventid=" + event.id.$oid)
      .then(response => {
        console.log("canceled event");
        console.log(response);
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

    let eventCopy = event;
    eventCopy.description = description.description;
    //axios post to update event description
    axios.post("/events?eventid=" + event.id.$oid, eventCopy)
      .then((response) => {
        console.log('successfully updated event\'s description: ', response);
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

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      // unverified: true,
      creator: true,
      //attendee: true
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
          <AttendeeEvent
            event={event}
            state={state}
            handleShow={handleShow}
            show={show}
            handleClose={handleClose}
            handleDelete={handleDelete}
            role="attendee"
          />
        </Container>
      );
    } else if (state.creator === true) {
      eventPage = (
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
          />
        </Container>
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

export default EventPage;
