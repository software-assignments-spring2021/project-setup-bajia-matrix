import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

/* 
    This component accepts the isAuthenticated prop from the Toolbar component 
    to display navigable links depending on whether the user is authenticated or not
*/
const navigationItems = (props) => {
    // TODO: signout should do something to log the person out then go to landing page or sign in page
    // maybe there is a separate /signout route that does this
    // TODO: /profile should be /uniqueUserId/profile

    let navItems = (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/signin" exact>Sign In</NavigationItem>
            <NavigationItem link="/signup" exact>Sign Up</NavigationItem>
        </ul>
    );

    if (props.isAuthenticated) {
        navItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Sign Out</NavigationItem>
                <NavigationItem link="/profile" exact>My Profile</NavigationItem>
            </ul>
        );
    }

    return (
        <div>
            {navItems}
        </div>
        // <ul className={classes.NavigationItems}>
        //     {props.isAuthenticated ? 
        //         <NavigationItem link="/" exact>Sign Out</NavigationItem> :
        //         <NavigationItem link="/signin" exact>Sign In</NavigationItem>
        //     }
        //     {props.isAuthenticated ?
        //         <NavigationItem link="/profile" exact>My Profile</NavigationItem> :
        //         <NavigationItem link="/signup" exact>Sign Up</NavigationItem>
        //     }
        // </ul>
    );
};

export default navigationItems;