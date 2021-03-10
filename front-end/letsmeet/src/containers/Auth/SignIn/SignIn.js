import React, { Component } from 'react';

import classes from './SignIn.module.css';




export default class SignIn extends Component {
    state = {
       
        email: '',
        password: '',
        Verified_Passwowrd: '',

      };
      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
       
    
        this.setState({[nam]: val});
        console.log("it worked");
        console.log(this.state.password);
      }
      onSubmit = e => {
        e.preventDefault();
        let password = this.state.password;
        
        // this.props.onSubmit(this.state);
        //const newTodo = API.graphql(graphqlOperation(mutations.createTodo, {input: this.state}));
        console.log("it worked");
        
      };

    render() {
        return (
            <div class="row justify-content-center">
            <form>
            
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" 
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
}