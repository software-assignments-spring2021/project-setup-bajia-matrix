import React from 'react';
import classes from './EventTitle.module.css';
import { EnvironmentOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

/*
    This component displays the title of an event page and its associated pages.
    The title includes the name, location, and time of the event.

    Props:
        - title: name of the event
        - day: day of the week 
        - date: Month and day of the year
        - time: time range from start to end
        - newEventAuthentication: boolean to show day, date, and time for event (set to ***false*** if you want this to appear)
        - showCreator: boolean value; true: shows creator name
        - creator: name of event creator
        - location: location of event
        - description: event description
*/
const EventTitle = (props) => (
    <div className={classes.EventTitle}>
        <h1>{props.title}</h1>
        {!props.newEventAuthentication && <h5>{props.day}, {props.date} @ {props.time}</h5>}
        {props.showCreator && <p>Event creator: <b>{props.creator}</b></p>}
        <p><EnvironmentOutlined className={classes.icon}/> <b>{props.location}</b></p>
        <p>{props.description}</p>
    </div>
);

export default EventTitle;
