import React, { useState, useEffect } from "react";
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

  /////////////////////////////////////////////////////////
  //for current user name & current user friends
  const [state, setState] = useState({
    textInput: React.createRef(),
    name: "",
    friends: new Array()
  });

  useEffect(() => {
    let eventQueryID = window.location.pathname.split("id:")[1];
    axios.get(`/event/${eventQueryID}.json?key=5942cd70`)
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
        setLoading(prevState => ({
          ...prevState,
          event: false
        }));
      })
      .catch((error) => {
        console.log(error);
      });
    
    // axios.get("/users.json?key=5942cd70")
    //   .then(response => {
    //     setState(prevState => ({
    //       ...prevState,
    //       name: response.data.name,
    //       friends: response.data.friends
    //     }));
    //     setLoading(prevState => ({
    //       ...prevState,
    //       user: false
    //     }));
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    if (event) {
      event.attendees.map((attendee, index) => {
        if (event.creator === attendee) {
          event.roles.push("Creator");
        } else {
          event.roles.push("Attendee" + index);
        }
      });
    }
  }, []);

  
  console.log('roles: ', event.roles);
  console.log('attendees: ', event.attendees);
  let eventPage = <Spinner />;
  console.log(loading.event);
  console.log(loading.user);
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
