import React, { useState } from 'react';

import axios from '../../../axios';


let SignOut = (e) => {
        //e.preventDefault();
    
        localStorage.setItem('userID', "");
        localStorage.setItem('isAuthenticated', false);
        e.history.push("/");
        // axios.post("/auth/signout", localStorage.getItem('userID'))
        //     .then(response => {
        //         console.log(response.data);

        //         if (response.data.success) {
        //             // setState((prevState) => ({
        //             //     ...prevState,
        //             //     isAuthenticated: true,
        //             //     userID: response.data.uid
        //             //   }));
        //             localStorage.setItem('userID', "");
        //             localStorage.setItem('isAuthenticated', false);
        //             window.location.reload(false);

        //         }
        //         else {
        //             // TODO: if auth failed, should change so page reloads and displays this message 
        //             //setErrorMessage(<strong>Error</strong>);
        //             // authenticated
        //         }
        //     })
        //     .catch(error => {
        //       console.log(error);

        //     });
        return (
            <></>
        );     
    }
    export default SignOut;
