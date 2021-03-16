import React from 'react';

import classes from './EventTitle.module.css';

const eventTitle = (props) => (
    <div>
        <h1>{props.title}</h1>
        <p>{props.day}, {props.date} @ {props.time}</p>
    </div>
);

export default eventTitle;