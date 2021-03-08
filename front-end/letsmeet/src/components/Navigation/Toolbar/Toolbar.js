import React from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

/*
    This component accepts the isAuth prop from the Layout component
    to display NavigationItems depending on whether the user is authenticated
    or not
*/
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <NavigationItem link="/" exact>Let's Meet</NavigationItem>
        <NavigationItems isAuthenticated={props.isAuth} />
    </header>
)

export default toolbar;