import React from 'react';
import { Link } from 'react-router-dom';

// import custom files and components
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../assets/NavbarLogo.png';
import Hamburger from '../SideDrawer/Hamburger/Hamburger';

/*
    This component is the navbar on larger screens. It will
    shift to a format that includes a hamburger menu and move
    the navigationItems to the hamburger menu when it is on a smaller screen.
    
    Props: 
        - drawerToggleClicked: function to handle what happens when the user clicks the hamburger menu
        - isAuth: whether or not the user is signed in
*/

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Hamburger clicked={props.drawerToggleClicked} />
        <Link to="/">
            <img className={classes.Logo} src={Logo} alt="Let's Meet" />
        </Link>
        <nav className={classes.Medium}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;