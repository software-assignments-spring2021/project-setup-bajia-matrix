import React from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

/*
    This component accepts the isAuthenticated prop from App.js
    to render the entire page, including:
        the navbar which depends on whether the user is authenticated
        or not, and 
        the contents of the page, depending on which route is active
*/

const layout = (props) => {
    /* 
        Toolbar is the Navbar
        props.children will render different components depending on which route is active,
        these componens are the so-called different "pages"
    */
    
    // HAVE TO DO WITH HEADERS
    // get the current route
    // const currPath = props.children.props.children[0].props.path.split('/');
    // const currRoute = currPath[currPath.length - 1];

    // // set page title for the header if the current route requires a header
    // let title = "";
    // console.log(currRoute);
    // switch (currRoute) {
    //     case "profile": // TODO: change to editprofile when done testing
    //         title = "Edit Profile"; 
    //         break;
    //     case "editavatar": 
    //         title = "Edit Avatar";
    //         break;
    //     case "editsupplies":
    //         title = "Edit Event Supplies";
    //         break;
    //     case "createevent":
    //         title = "Create New Event";
    //         break;
    //     default:
    //         title = "";
    // }
    return ( 
        <div> 
            <Toolbar isAuth={props.isAuthenticated} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </div>
    );
};

export default layout;