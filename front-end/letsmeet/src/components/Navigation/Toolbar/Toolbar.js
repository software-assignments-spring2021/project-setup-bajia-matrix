import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../assets/NavbarLogo.png';

/*
    This component accepts the isAuth prop from the Layout component
    to display NavigationItems depending on whether the user is authenticated
    or not
*/
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Link to="/" exact>
            <img className={classes.Logo} src={Logo} alt="Let's Meet" />
        </Link>
        <NavigationItems isAuthenticated={props.isAuth} />
    </header>
);

export default toolbar;