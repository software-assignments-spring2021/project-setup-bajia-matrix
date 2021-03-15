import React from 'react';

import classes from './Backdrop.module.css';

/*
    This component makes the backdrop more transparent to make
    the SideDrawer the focus of the user's attention. This is used
    in the SideDrawer component.

    Props:
        - show: whether or not to show the backdrop
        - clicked: function to handle when the backdrop is clicked on
*/

const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;