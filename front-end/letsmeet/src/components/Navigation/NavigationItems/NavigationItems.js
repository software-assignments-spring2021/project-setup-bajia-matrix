import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

/* 
    This component displays a list of navigationItem, the contents of which,
    depends on whether the user is authenticated or not.

    Props:
        - isAuthenticated: whether or not the user is signed in
*/

const navigationItems = (props) => {
    // TODO: signout should do something to log the person out then go to landing page or sign in page
    // maybe there is a separate /signout route that does this
    // TODO: /profile should be /uniqueUserId/profile

    let navItems = (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/signin">Sign In</NavigationItem>
            <NavigationItem link="/signup">Sign Up</NavigationItem>
        </ul>
    );

    if (props.isAuthenticated) {
        navItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Sign Out</NavigationItem>
                <NavigationItem link="/profile">My Profile</NavigationItem>
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