


import React, { useEffect, useState } from 'react';
import classes from '../SignIn/SignIn.module.css';


const SignUp = (props) => {
    const [authState, setauthState] = useState({
        firstName: 'a',
        lastName: 'a',
        email: 'a',
        password: 'a',
        verifiedPassword: 'a',
        errorMessage: 'a'
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
            <div className="row justify-content-center">

            <form className={classes.Authform}>

                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" 
                    name = "firstName"
                    value={authState.firstName} 
                    onChange={myChangeHandler}
                    required/>
                    
                    
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" 
                    name = "lastName"
                    value={authState.lastName} 
                    onChange={myChangeHandler}
                    required/>
                    
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" id="exampleInputEmail1"  className="form-control" placeholder="Enter email" 
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
                    <label for="password">Confirm password</label>
                    <input type="password" className="form-control" placeholder="Enter password" 
                    name = "verifiedPassword"
                    value={authState.verifiedPassword} 
                    onChange={myChangeHandler}

                    required/>
                     {authState.verifiedPassword}

                    
                </div>

                <button  type="submit" className="btn btn-primary btn-block"> Sign Up</button>
                <p className="Already Registered">
                    Already registered? <a href="/signin">Sign In</a>
                </p>
                
               
            </form>
            </div>
           

        );
    
    
}
export default SignUp;
