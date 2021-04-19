import React, { useState } from 'react';

/*
    This component updates the variables in localStorage to indicate
    the user has signed out of their account.

    Props:
        This component does not accept any custom props
*/

const SignOut = (props) => {
    localStorage.setItem('userID', "");
    localStorage.setItem('isAuthenticated', false);
    props.history.push("/");
    return <></>;    
};

export default SignOut;
