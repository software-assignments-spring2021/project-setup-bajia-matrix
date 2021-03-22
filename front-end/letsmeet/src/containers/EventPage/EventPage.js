import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "../../axios";

import EventAttendees from "../../components/EventParts/EventAttendees/EventAttendees";
import EventTitle from "../../components/EventParts/EventTitle/EventTitle";
import Spinner from "../../components/UI/Spinner/Spinner";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./EventPage.module.css";

import { Form, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
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
  const [loading, setLoading] = useState({
    event: true,
    user: true
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
    friends: new Array()
  });

  //for general state of current event page 
  const [state, setState] = useState({
    textInput: React.createRef(), //used to reference to name input by unverified user
    creator: false,
    attendee: false,
    unverified: false
  })

  //for suggested times & final time
  const [chosenTime, setChosenTime] = useState({
    day: "",
    date: "",
    time: "",
    show: true,
  });

  //for inviting friends
  const { Option } = Select;
  const [invitees, setInvitees] = useState();

  useEffect(() => {
    let eventQueryID = window.location.pathname.split("id:")[1];
    axios.get(`/event/${eventQueryID}.json?key=52632390`)
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
  useEffect(() => {
    //for attendees list & attendee roles
    if (event.attendees) {
      event.attendees.map((attendee, index) => {
        if (event.creator === attendee) {
          event.roles.push("Creator");
        } else {
          event.roles.push("Attendee" + index);
        }
      });
      console.log(event.roles);
    }
  }, [event.attendees]);

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
  let suggestedModal;
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
    if (event.suggestedTimes) {
      //for suggested times
      suggestedTimes = event.suggestedTimes.map((time) => (
        <h5>
          <Badge className="text-wrap" variant="primary">
            {time}
          </Badge>
        </h5>
      ));

      //for suggested modal
      suggestedModal = event.suggestedTimes.map((time) => (
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
    }
  }, [event.suggestedTimes]);

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
    axios.get("/users.json?key=52632390")
      .then(response => {
        setUser(prevState => ({
          ...prevState,
          name: response.data.name,
          friends: response.data.friends
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (user.name !== "" && event.creator) {
      console.log(user.name);
      console.log(event.creator);
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
    } else {
      setState(prevState => ({
        ...prevState,
        unverified: true
      }));
    }
  }, [event, user]);

  useEffect(() => {
    console.log(state);
    if (state.creator === true || state.attendee === true || state.unverified === true) {
      setLoading(prevState => ({
        event: false,
        user: false
      }));
    }
  }, [state]);

  let eventPage = <Spinner />;
  if (!loading.event && !loading.user) {
    eventPage = (
      <div>
        <EventAttendees
          attendees={event.attendees}
          roles={event.roles}
        ></EventAttendees>
      </div>
    )
  }

  return <div>{eventPage}</div>;
};

export default Event;
