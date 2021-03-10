import React from 'react';

import classes from './Hamburger.module.css';

const hamburger = (props) => (
    // the 3 <div> is the hamburger icon
    <div className={classes.Hamburger} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default hamburger;