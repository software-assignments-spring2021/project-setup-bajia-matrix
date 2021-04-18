import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./EventPage.module.css";
import Container from "react-bootstrap/Container";

import axios from "../../axios";

import Spinner from "../../components/UI/Spinner/Spinner";
import AttendeeEvent from "./AttendeeEvent/AttendeeEvent";
import CreatorEvent from "./CreatorEvent/CreatorEvent";
import UnverifiedEvent from "./UnverifiedEvent/UnverifiedEvent";

import { Select } from "antd";

/*
  This component displays the event pages for the following users: event creator, event attendee, and unverfied user.

  Props:
    This component does not accept any custom props
*/

const EventPage = (props) => {

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
    eventLocation: "New York, NY",
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
    roles: [],
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
     console.log(props)
      if (props.location.state) {
        const eventState = props.location.state.eventState;
        setEvent(eventState);
      }
      else {
        let eventQueryID = window.location.pathname.split("/")[2];
        axios.get("/events?eventid=" + eventQueryID)
          .then((response) => {
          console.log('successfully get event: ', response.data);
          setEvent(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }
  }, [props]);

  let addUnverified = (e) => {
    let attendeesCopy = [...event.attendees]; //make a shallow copy first
    let newAttendee = {
      name: state.unverifiedInput.current.value,
      eventID: event._id
    };
    attendeesCopy.push(newAttendee);

    if (newAttendee.name.includes('@')) {
      setEvent((prevState) => ({
      ...prevState,
      attendees: attendeesCopy,
      unverifiedURL: "/signup?id=" + event._id + "&email=" + state.unverifiedInput.current.value
    }))
    }
  
    axios.post("/events/newAttendee", newAttendee)
      .then((response) => {
        console.log('successfully posted new attendee: ', response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showLink, setShowLink] = useState(false);
  const handleShowLink = () => setShowLink(true);
  const handleCloseLink = () => setShowLink(false);
  useEffect(() => {
    //for generating event url
    if (event.id) {
      let eventURL = window.location.origin + "/event/" + event.id;
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
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
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
      timezone: tz
    }
    
    // TODO JOANNE: once we have database, send this info from the state instead of hardcoding
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
    //extract names of invitees
    let invitees = [];
    let inviteeNames = [];
    values.friends.forEach(friend => {
      invitees.push(JSON.parse(friend));
      inviteeNames.push(JSON.parse(friend).name);
    })
    
    //update friends list so that friend that was just invited does not appear
    let friends = [];
    let friendsList = {};
    event.friendsList.forEach(friend => {
      if (!inviteeNames.includes(friend.props.children)) {
        let temp = user.friends.filter(temp => {return temp.name === friend.props.children})
        friends.push(temp[0]);
      }
      return;
    })
    friendsList = friends.map(test => (
      <Option value={JSON.stringify(test)} key={test.id}>{test.name}</Option>
    ))
    setEvent((prevState) => ({
      ...prevState,
      friendsList: friendsList,
    }));

    //add friends as invitees to database
    console.log(invitees);
    // eventCopy.attendees = attendeesCopy;
    //   axios.post("/events?eventid=" + event.id.$oid, eventCopy)
    //   .then((response) => {
    //     console.log('successfully posted new attendee: ', response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
  };

  //for populating list of friends to invite to event (exclude any friends already attending or invited)
  useEffect(() => {
    let friendsList;
    if(user.friends && event.title) {
      let test = [];
      let eventInvitees = false;
      let eventAttendees = false;
      user.friends.forEach(friend => {
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
        if (!eventInvitees && !eventAttendees) {
          test.push(friend);
        }
      })
      friendsList = test.map(test => (
        <Option value={JSON.stringify(test)} key={test.id}>{test.name}</Option>
      ))
    }
    setEvent((prevState) => ({
      ...prevState,
      friendsList: friendsList,
    }));
  }, [user.friends, event.title, event.attendees, event.invitees]);

  useEffect(() => {
    //get currently logged in user info
    const id = localStorage.getItem("userID");
    axios.get("/profile?userid=" + id)
        .then((response) => {
        setUser(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
  //for withdrawing from event
  const handleWithdraw = () => {
    let eventCopy = event;
    //TODO: remove user from event attendees & eventCopy attendees

    let withdrawnCopy = [...event.withdrawn];
    withdrawnCopy.push(user);
    setEvent((prevState) => ({
      ...prevState,
      withdrawn: withdrawnCopy
    }))

    eventCopy.withdrawn = withdrawnCopy;
    //axios post to update event withdrawn array
    axios.post("/events", eventCopy)
      .then((response) => {
        console.log('successfully updated event\'s withdrawn array: ', response);
      })
      .catch((error) => {
        console.log(error);
      });

    setState((prevState) => ({
      ...prevState,
      redirect: true,
    }));
  }

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
    // setState((prevState) => ({
    //   ...prevState,
    //   unverified: true,
    //   //creator: true,
    //   //attendee: true
    // }));
    if (props.isAuthenticated) {
      if (user.name && event.title) {
        if (user.name === event.creator) {
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
      if (event.creator) {
        setState(prevState => ({
          ...prevState,
          unverified: true
        }));
      }
    }
  }, [event.title, user.name, props.isAuthenticated, event.creator]);

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
            handleDelete={handleWithdraw}
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
            user={user}
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

export default withRouter(EventPage);
