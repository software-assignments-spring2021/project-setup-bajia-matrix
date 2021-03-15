import React, { Component } from "react";
import classes from '../SignIn/SignIn.module.css';


export default class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        Verified_Passwowrd: '',
        errormessage: ''
    };
    
    
    
      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = '';
        if (nam === "Verified_Passwowrd") {
            if (val != this.state.password) {
              err = <strong>Your passwords do not match!</strong>;
            }
          }
    
        this.setState({errormessage: err});
        this.setState({[nam]: val});
        console.log("it worked");
        console.log(this.state.password);
      }
      onSubmit = e => {
        e.preventDefault();
        let password = this.state.password;
        if (this.state.Verified_Passwowrd != password) {
           
                alert("Your passwords do not match!");
      
    }
        // this.props.onSubmit(this.state);
        //const newTodo = API.graphql(graphqlOperation(mutations.createTodo, {input: this.state}));
        console.log("it worked");
        
      };
        //yuh
    render() {
        return (
            <div className="row justify-content-center">

            <form className={classes.Authform}>

                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" 
                    //value={this.state.firstName}
                    name = "firstName"
                    value={this.state.firstName} 
                    onChange={this.myChangeHandler}
                    required/>
                    
                    
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" 
                    name = "lastName"
                    value={this.state.lastName} 
                    onChange={this.myChangeHandler}
                    required/>
                    
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" id="exampleInputEmail1"  className="form-control" placeholder="Enter email" 
                    name = "email"
                    value={this.state.email} 
                    onChange={this.myChangeHandler}
                    required/>

                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                    name = "password"
                    value={this.state.password} 
                    onChange={this.myChangeHandler}
                     required/>
                    
                </div>
                <div className="form-group">
                    <label for="password2">Confirm password:</label>
                    <input type="password" className="form-control" placeholder="Enter password" 
                    name = "Verified_Passwowrd"
                    value={this.state.Verified_Passwowrd} 
                    onChange={this.myChangeHandler}
                    required/>
                     {this.state.errormessage}
                    
                </div>

                <button  type="submit" className="btn btn-primary btn-block"> Sign Up</button>
                <p className="Already Registered">
                    Already registered? <a href="/signin">Sign In</a>
                </p>
                
               
            </form>
            </div>
           

        );
        console.log(this.state.password);
    }
    
}
