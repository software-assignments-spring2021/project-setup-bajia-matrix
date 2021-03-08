import React from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

/*
    This component accepts the isAuthenticated prop from App.js
    to render the navbar depending on whether the user is authenticated
    or not
*/

const layout = (props) => {
    return (
        <div>
            <Toolbar isAuth={props.isAuthenticated} />
            {props.children}
        </div>
    );
};

export default layout;