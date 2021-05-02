import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// import custom files and components
import classes from "../SignIn/SignIn.module.css";
import axios from '../../../axios';

/* 
    This component renders the Sign Up page so
    a user can create an account and log in.

    Props:
        This component does not accept any custom props
*/

const SignUp = (props) => {
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

    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');

    // this is to prefill the value of email if an email query exists in the url
    useEffect(() => {
        if (emailParam) {
            let emailCopy = {
                value: emailParam.toLowerCase(),
                valid: true
            }
            setAuthState((prevState) => ({
                ...prevState,
                email: emailCopy
            }))
        }
    }, [emailParam]);
    
    const myChangeHandler = (event) => {
        // update state immutably to do validation correctly

        // copy first layer of state
        const updatedAuthState = {
            ...authState
        }

        const nam = event.target.name;
        const val = event.target.value;

        if (nam === "password") {
            const isValid = val === authState.verifiedPassword.value;
            const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
            const isValid2 = pattern.test(val);

            if (isValid && isValid2) {
                // both valid => no error
                setErrorMessage("");
            }
            else if (isValid && !isValid2) {
                // password strength not valid 
                const message = (
                    <div className={classes.Password}>
                        <strong>
                            Your password needs to:
                            <ul>
                                <li>include both lower and upper case characters</li>
                                <li>include at least one number</li>
                                <li>include at least one special character</li>
                                <li>be at least 8 characters long</li>
                            </ul>
                        </strong>
                    </div>
                );
                setErrorMessage(message);
            }
            else {
                // passwords don't match or 
                // password strength not valid and passwords don't match
                setErrorMessage(<strong>Your passwords do not match!</strong>);
            }
           
            const updatedPassword = {
                ...updatedAuthState[nam]
            };

            updatedPassword.value = val;
            updatedPassword.valid = isValid && isValid2;

            updatedAuthState[nam] = updatedPassword;

            // update valid for verifiedPassword too
            const updatedVerifiedPassword = {
                ...updatedAuthState["verifiedPassword"]
            };
            
            updatedVerifiedPassword.valid = isValid && isValid2;

            updatedAuthState["verifiedPassword"] = updatedVerifiedPassword;
        }
        else if (nam === "verifiedPassword") {
            const isValid = val === authState.password.value;
            const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
            const isValid2 = pattern.test(val);

            if (isValid && isValid2) {
                // both valid => no error
                setErrorMessage("");
            }
            else if (isValid && !isValid2) {
                // password strength not valid 
                const message = (
                    <div className={classes.Password}>
                        <strong>
                            Your password needs to:
                            <ul>
                                <li>include both lower and upper case characters</li>
                                <li>include at least one number</li>
                                <li>include at least one special character</li>
                                <li>be at least 8 characters long</li>
                            </ul>
                        </strong>
                    </div>
                );
                setErrorMessage(message);
            }
            else {
                // passwords don't match or 
                // password strength not valid and passwords don't match
                setErrorMessage(<strong>Your passwords do not match!</strong>);
            }

            const updatedVerifiedPassword = {
                ...updatedAuthState[nam]
            };

            updatedVerifiedPassword.value = val;
            updatedVerifiedPassword.valid = isValid && isValid2;

            updatedAuthState[nam] = updatedVerifiedPassword;
            
            // update valid for password too
            const updatedPassword = {
                ...updatedAuthState["password"]
            };

            updatedPassword.valid = isValid && isValid2;

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
            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            const isValid = pattern.test(val);
            (isValid) ? setErrorMessage("") : setErrorMessage(<strong>Please enter a valid email address!</strong>);

            const updatedEmail = {
                ...updatedAuthState[nam]
            }

            updatedEmail.value = val.toLowerCase();
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

    const [submitting, setSubmitting] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        axios.post("/auth/signup" , authState)
            .then(response => {
                // when an unverified user signs up for an event
                if (urlParams.get('id')) {
                    // send post call to event to update event attendee list and update their attendee id
                    axios.post("/events", {_id: urlParams.get('id'), attendee: response.data.uid, email: emailParam.toLowerCase()})
                        .then(response => {
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    setSubmitting(false);
                }

                localStorage.setItem('userID', response.data.uid);
                localStorage.setItem('isAuthenticated', true);
                
                if (emailParam) {
                    props.history.push("/?event=" + urlParams.get('id'));
                } else {
                    props.history.push("/"); 
                }
            })
            .catch(function (error) {
                localStorage.setItem("userID", "");
                localStorage.setItem("isAuthenticated", false)
                console.log(error.response.data.message);
                setErrorMessage(<strong>There is already an account associated with {authState.email.value}!</strong>);
                setSubmitting(false);
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
                    {emailParam 
                    ? <input
                    type="email"
                    id="exampleInputEmail1"
                    className="form-control"
                    placeholder={emailParam}
                    name="email"
                    value={emailParam}
                    onChange={myChangeHandler}
                    required
                />
                : <input
                type="email"
                id="exampleInputEmail1"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={authState.email.value}
                onChange={myChangeHandler}
                required
            />
                    
                    }
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
                    <label htmlFor="password">Confirm password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name="verifiedPassword"
                        value={authState.verifiedPassword.value}
                        onChange={myChangeHandler}
                        required
                    />
                </div>
                <div className={classes.Error}>{errorMessage}</div>
                <div>
                    <button
                        type="submit"
                        onClick={onSubmit}
                        className="btn btn-primary btn-block"
                        disabled={!validForm}>
                        {" "}
                        Sign Up
                    </button>
                    {submitting ? <p>Creating account...</p> : null}
                </div>
                <p className="Already Registered">
                    Already registered? <a href="/signin">Sign In</a>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
