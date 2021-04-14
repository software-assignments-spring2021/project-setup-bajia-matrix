import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import classes from "../SignIn/SignIn.module.css";
import axios from '../../../axios';

/* 
    This component renders the sign up page so
    a user can create an account and log in

    Props:
        This component does not accept any custom props
*/

const SignUp = () => {
    const [validForm, setValidForm] = useState(false);

    const [authState, setAuthState] = useState({
        firstName: {
            value: "",
            valid: false
        },
        lastName: {
            value: "",
            valid: false
        },
        email: {
            value: "",
            valid: false
        },
        password: {
            value: "",
            valid: false
        },
        verifiedPassword: {
            value: "",
            valid: false
        }
    });

    const [errorMessage, setErrorMessage] = useState("");
    // console.log("hello: ", authState);
    
    let myChangeHandler = (event) => {
        // update state immutably to do validation correctly

        // first copy first layer of state
        const updatedAuthState = {
            ...authState
        }

        let nam = event.target.name;
        let val = event.target.value;

        if (nam === "password") {
            let isValid = val === authState.verifiedPassword.value;
            (isValid) ? setErrorMessage("") : setErrorMessage(<strong>Your passwords do not match!</strong>);
            
            const updatedPassword = {
                ...updatedAuthState[nam]
            };

            updatedPassword.value = val;
            updatedPassword.valid = isValid;

            updatedAuthState[nam] = updatedPassword;

            // update valid for verifiedPassword too
            const updatedVerifiedPassword = {
                ...updatedAuthState["verifiedPassword"]
            };
            
            updatedVerifiedPassword.valid = isValid;

            updatedAuthState["verifiedPassword"] = updatedVerifiedPassword;
        }
        else if (nam === "verifiedPassword") {
            let isValid = val === authState.password.value;
            (isValid) ? setErrorMessage("") : setErrorMessage(<strong>Your passwords do not match!</strong>);

            const updatedVerifiedPassword = {
                ...updatedAuthState[nam]
            };

            updatedVerifiedPassword.value = val;
            updatedVerifiedPassword.valid = isValid;

            updatedAuthState[nam] = updatedVerifiedPassword;
            
            // update valid for password too
            const updatedPassword = {
                ...updatedAuthState["password"]
            };

            updatedPassword.valid = isValid;

            updatedAuthState["password"] = updatedPassword;
        }
        else if (nam === "firstName") {
            const isValid = val.length > 0;
            (isValid) ? setErrorMessage("") : setErrorMessage(<strong>Please enter your first name!</strong>);

            const updatedFirstName = {
                ...updatedAuthState[nam]
            }

            updatedFirstName.value = val;
            updatedFirstName.valid = isValid;

            updatedAuthState[nam] = updatedFirstName;
        }
        else if (nam === "lastName") {
            const isValid = val.length > 0;
            (isValid) ? setErrorMessage("") : setErrorMessage(<strong>Please enter your last name!</strong>);

            const updatedLastName = {
                ...updatedAuthState[nam]
            }

            updatedLastName.value = val;
            updatedLastName.valid = isValid;

            updatedAuthState[nam] = updatedLastName;
        }
        else if (nam === "email") {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            const isValid = pattern.test(val);
            (isValid) ? setErrorMessage("") : setErrorMessage(<strong>Please enter a valid email address!</strong>);

            const updatedEmail = {
                ...updatedAuthState[nam]
            }

            updatedEmail.value = val;
            updatedEmail.valid = isValid;

            updatedAuthState[nam] = updatedEmail;
        }

        // check validity
        let formIsValid = true;
        for (let key in updatedAuthState) {
            formIsValid = updatedAuthState[key].valid && formIsValid;
        }

        setValidForm(formIsValid);
        setAuthState(updatedAuthState);
        
    };

    let onSubmit = (e) => {
        e.preventDefault();
        console.log("submitting");
        const userID = 123;
        let url = '/auth';
        // "/users/" + userID + ".json?key=fe6891f0&__method=POST"
        axios.post(url , authState)
            .then(response => {
                console.log(response);
                localStorage.setItem('userID', response.data.uid);
                localStorage.setItem('isAuthenticated', true);
                window.location.reload(false); 

            })
            .catch(function (error) {
                console.log(error);
            });;
    };

    return (
        <div className="row justify-content-center">
            <form className={classes.Authform} method="POST" action="/register" >
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        name="firstName"
                        value={authState.firstName.value}
                        onChange={myChangeHandler}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        name="lastName"
                        value={authState.lastName.value}
                        onChange={myChangeHandler}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        id="exampleInputEmail1"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
                        value={authState.email.value}
                        onChange={myChangeHandler}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name="password"
                        value={authState.password.value}
                        onChange={myChangeHandler}
                        required
                    />
                </div>

                <div className="form-group">
                    <label for="password">Confirm password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name="verifiedPassword"
                        value={authState.verifiedPassword.value}
                        onChange={myChangeHandler}
                        required
                    />
                    <div className="text-danger">{errorMessage}</div>
                    {/* {authState.verifiedPassword} */}
                </div>

                <button
                    type="submit"
                    onClick={onSubmit}
                    className="btn btn-primary btn-block"
                    disabled={!validForm}>
                    {" "}
                    Sign Up
                </button>
                <p className="Already Registered">
                    Already registered? <a href="/signin">Sign In</a>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
