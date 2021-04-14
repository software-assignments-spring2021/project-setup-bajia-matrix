import React from 'react';
import axios from '../../../axios';

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

    // Bing to Rahul: This should not be on this page. You need to create a new Signup.js file and in App.js add a 
    // <Route path="/signout" exact component={/path/to/Signout.js} />
    // let signOut = (e) => {
    //     e.preventDefault();
    //     axios.post("/auth/signout", localStorage.getItem('userID'))
    //         .then(response => {
    //             console.log(response.data);

    //             if (response.data.success) {
    //                 // setState((prevState) => ({
    //                 //     ...prevState,
    //                 //     isAuthenticated: true,
    //                 //     userID: response.data.uid
    //                 //   }));
    //                 localStorage.setItem('userID', "");
    //                 localStorage.setItem('isAuthenticated', false);
    //             }
    //             else {
    //                 // TODO: if auth failed, should change so page reloads and displays this message 
    //                 //setErrorMessage(<strong>Error</strong>);
    //                 // authenticated
    //             }
    //         })
    //         .catch(error => {
    //           console.log(error);

    //         });      
    // }


    let navItems = (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            <NavigationItem link="/signup">Sign Up</NavigationItem>
            <NavigationItem link="/signin">Sign In</NavigationItem>
        </ul>
    );

    if (props.isAuthenticated) {
        navItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Home</NavigationItem>
                <NavigationItem link="/profile">My Profile</NavigationItem>
                <NavigationItem link="/signout" exact>Sign Out</NavigationItem>    
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