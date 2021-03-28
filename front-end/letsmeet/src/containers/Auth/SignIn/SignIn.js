import React, { useState } from 'react';

import classes from './SignIn.module.css';
import axios from '../../../axios';

/*
    This component renders the sign in page so
    a user can sign into their account.

    Props:
        This component does not accept any custom props
*/

const SignIn = () => {
    const [authState, setauthState] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    let myChangeHandler = (event) => {
        // update authState immutably
        const updatedAuthState = {
          ...authState
        }

        let nam = event.target.name;
        let val = event.target.value;

        updatedAuthState[nam] = val;
        setauthState(updatedAuthState);
    }

    let onSubmit = (e) => {
        //e.preventDefault();

        axios.get("/users/" + authState.email + ".json?key=fe6891f0")
            .then(response => {
                if (response.password !== authState.password) {
                    // TODO: if auth failed, should change so page reloads and displays this message 
                    setErrorMessage(<strong>Either your email is incorrect or your password does not match!</strong>);
                }
                else {
                    console.log("signed in!");
                    this.props.isAuthenticated = true;
                    // authenticated
                }
            })
            .catch(error => {
              console.log(error);
            });      
    }

    return (
        <div class="row justify-content-center">
            <form className={classes.Authform} method="POST" action="/login">
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        name = "email"
                        value={authState.email} 
                        onChange={myChangeHandler}
                        required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        name = "password"
                        value={authState.password} 
                        onChange={myChangeHandler}
                        required />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" onClick={onSubmit} className="btn btn-primary btn-block">Submit</button>
                <p className="Create Account">
                        Need an Account?
                <a href="/signup"> Create Account</a>
                </p>
            </form>
        </div>
    ); 
};

export default SignIn;
