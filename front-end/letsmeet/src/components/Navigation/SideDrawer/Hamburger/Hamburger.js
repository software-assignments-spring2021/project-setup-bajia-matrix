import React from 'react';

// import custom files 
import classes from './Hamburger.module.css';

/*
    This component displays the three horizontal lines iconic
    of a hamburger icon. It handles toggling of the SideDrawer
    when clicked on. This is used in the Toolbar component.

    Props:
        - clicked: function to run when the user clicks on the icon
*/

const hamburger = (props) => (
    // the 3 <div> is the hamburger icon
    <div className={classes.Hamburger} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default hamburger;