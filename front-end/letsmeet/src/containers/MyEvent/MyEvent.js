import React, { useState, useEffect } from 'react';
//import axios from '../../../axios';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './MyEvent.module.css';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { AutoComplete } from 'antd';

import EventAttendees from '../../components/EventParts/EventAttendees/EventAttendees';
import EventTitle from '../../components/EventParts/EventTitle/EventTitle';

const MyEvent = (props) => {

  const [event, setEvent] = useState({
    id: '1-i-am-random-event-id',
    title: "Study Dateeeeeeeeeeeeeeeeeeeeee",
    day: "Wed",
    date: "Mar 10",
    time: "5:00 pm",
    description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
    attendees: [
      "Angela Tim",
      "Matthew Fishman",
      "Timothy Sanders",
      "Spike Spiegel",
      "Faye Valentine"
    ],
    myCreatedEvent: true,
    creator: "Angela Tim",
    roles: new Array(),
    suggestedTimes: [
      "Wed, Mar 10 @ 6:00 pm",
      "Wed, Mar 10 @ 7:00 pm",
      "Wed, Mar 10 @ 8:00 pm",
      "Wed, Mar 10 @ 9:00 pm",
      "Wed, Mar 10 @ 10:00 pm",
      "Wed, Mar 10 @ 11:00 pm",
    ]
  });

  /////////////////////////////////////////////////////////
  //for user name & user friends
  const [state, setState] = useState({
    isAuthenticated: true,
    textInput: React.createRef(),
    name: "name",
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      name: "Angela Tim",
      friends: [
        {value: 'friend_first1 friend_last1'},
        {value: 'friend_first2 friend_last2'},
        {value: 'friend_first3 friend_last3'},
        {value: 'friend_first4 friend_last4'},
        {value: 'friend_first5 friend_last5'},
      ]
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
  },[]);

  /////////////////////////////////////////////////////////
  //for event attendees & avis
  useEffect(() => {
    event.attendees.map((attendee) => {
      if (event.creator === attendee) {
        event.roles.push('Creator');
      } else {
        event.roles.push('Attendee');
      }
    })
  },[]);

  let addAttendee = (e) => {
    console.log(e.target.previousElementSibling.inputValue);
    let newAttendee = state.textInput.current.value;
    let newAttendees = [...event.attendees]; //make a shallow copy first
    newAttendees.splice(1, 0, newAttendee);
    let newRoles = [...event.roles];
    newRoles.splice(1, 0, "Attendee");
  
    setEvent(prevState => ({
      ...prevState,
      attendees: newAttendees,
      roles: newRoles
    }));
  }

  return (
    <EventAttendees attendees={event.attendees} roles={event.roles}></EventAttendees>
  )

};

export default MyEvent;