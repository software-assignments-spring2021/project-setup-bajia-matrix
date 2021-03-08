import React from 'react';
import { Link } from 'react-router-dom';

import classes from './NavigationItem.module.css';

/*
    This component accepts the link and exact props from the NavigationItems
    component to route the user to the link they clicked on
*/
const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <Link 
            to={props.link}
            exact={props.exact}>{props.children}</Link>
    </li>
);

export default navigationItem;
