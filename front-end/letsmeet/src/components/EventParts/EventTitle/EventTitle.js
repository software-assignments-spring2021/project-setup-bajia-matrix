import React from 'react';

import classes from './EventTitle.module.css';

/*
    This component displays the title of an event page and its associated pages.
    The title includes the name, location, and time of the event.

    Props:
        - title: name of the event
        - day: day of the week 
        - date: Month and day of the year
        - time: time range from start to end
*/

const eventTitle = (props) => (
    <div className={classes.EventTitle}>
        <h1>{props.title}</h1>
        <p>{props.day}, {props.date} @ {props.time}</p>
    </div>
);

export default eventTitle;