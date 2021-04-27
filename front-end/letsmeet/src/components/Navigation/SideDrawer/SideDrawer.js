import React from 'react';

// import custom files and components
import classes from './SideDrawer.module.css';
import Logo from '../../../assets/NavbarLogo.png';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

/*
    This component replaces the navbar on a smaller screen.
    Instead, it will show the hamburger menu and the logo.
    It will also display the list of navigationItems vertically
    and display a backdrop when it is open.

    Props:
        - open: whether or not the SideDrawer is open
        - closed: function to run to close the SideDrawer
        - isAuth: whether or not the user is signed in
*/

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
   
    return (
        <div>
            {/* able to close sidedrawer if click on hamburger menu or backdrop */}
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.TopBar}>
                    <img className={classes.Logo} src={Logo} alt="Let's Meet" /> 
                </div>
                <nav className={classes.Nav}>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </div>
    );
};

export default sideDrawer;
