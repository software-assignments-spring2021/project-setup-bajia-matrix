import React from 'react';
import { Redirect} from 'react-router-dom';

/*
    This component updates the variables in localStorage to indicate
    the user has signed out of their account.

    Props:
        This component does not accept any custom props
*/

const SignOut = (props) => {
    localStorage.setItem('userID', "");
    localStorage.setItem('isAuthenticated', false);
    return <><Redirect to="/"/></>;    
};

export default SignOut;
