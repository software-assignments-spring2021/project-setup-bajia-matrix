import React from 'react';

// import custom files
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

/* 
    This component displays a list of navigationItem, the contents of which
    depends on whether the user is authenticated or not.

    Props:
        - isAuthenticated: whether or not the user is signed in
*/

const navigationItems = (props) => {
    let navItems = (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Landing</NavigationItem>
            <NavigationItem link="/signup">Sign Up</NavigationItem>
            <NavigationItem link="/signin">Sign In</NavigationItem>
        </ul>
    );
        
    if (props.isAuthenticated === true) {
        navItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/">Home</NavigationItem>
                <NavigationItem link="/profile">My Profile</NavigationItem>
                <NavigationItem link="/signout">Sign Out</NavigationItem>    
            </ul>
        );
    }
    
    return (
        <div>
            {navItems}
        </div>
    );
};

export default navigationItems;