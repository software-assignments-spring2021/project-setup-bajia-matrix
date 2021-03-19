import React from 'react';

import classes from './EventDescription.module.css';

const EventDescription = (props) => (
    <div>
        
        <p>{props.description}</p>
    </div>
);

export default EventDescription;
