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