import React, { useEffect, useState } from 'react';

import classes from './SignIn.module.css';



const SignIn = (props) => {
    const [authState, setauthState] = useState({
       
        email: '',
        password: '',
        Verified_Passwowrd: '',

      });
      let myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = '';
        if (nam === "verifiedPassword") {
            if (val !== authState.password) {
              err = <strong>Your passwords do not match!</strong>;
            }
          }
    
        setauthState({errorMessage: err});
        setauthState({[nam]: val});
        console.log(authState.password);

        //console.log("it worked");
      }
      let onSubmit = e => {
        e.preventDefault();
        let password = authState.password;
        if (authState.verifiedPassword !== password) {
           
              alert("Your passwords do not match!");
      
    }
            console.log("it worked");

      };

        return (
            <div class="row justify-content-center">
            <form className={classes.Authform}>
            
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" 
                name = "email"
                value={authState.email} 
                onChange={myChangeHandler}
                required/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" 
                name = "password"
                value={authState.password} 
                onChange={myChangeHandler}
                 required/>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            <p className="Create Account">
                    Need an Account?
                <a href="/signup"> Create Account</a>
                </p>
        </form>
        </div>
        );
    
}
export default SignIn;
