import React, { useState } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import classes from './App.module.css';
import Layout from './hoc/Layout/Layout';
//import Landing from './components/Landing/Landing';
/* HOW TO ADD ROUTING TO YOUR COMPONENT:
    import your component like the landing page example above
    then add a <Route> component to the let routes variable depending on whether
    your component is accessible when authenticated or not.
    You can test your components by typing into the url /yourroutehere
        ie localhost:3000/signin
    you have to do this because there isn't a button that takes you there yet.

    all possible routes needs to be defined in App.js before it can be used
*/

const App = (props) => {
    // HOW TO ADD ROUTING TO YOUR COMPONENT: to test between authenticated and not,
    // change this boolean variable. Later we will have to add real authentication
    const [state, setState] = useState({
        isAuthenticated: false
    });

    // HOW TO ADD ROUTING TO YOUR COMPONENT: add your route here if it is accessible without an account
    // it should sit above the <Redirect to="/" />
    
    // <Route path="/signin" component={SignIn} />
    // <Route path="/signout" component={SignOut} />
    // <Route path="/" exact component={Landing} />
    let routes = (
        <Switch>
            <Redirect to="/" />
        </Switch>
    )

    // HOW TO ADD ROUTING TO YOUR COMPONENT: add your route here if it is accessible only with an account
    // it should sit above the <Route path="/" exact component={Landing} />
    // if (this.state.isAuthenticated) {
    //     routes = (
    //         <Switch>
    //                 <Route path="/" exact component={Landing} />
    //                 <Redirect to="/" />
    //         </Switch>
    //     )
    // }
    return (
        <div className="App">
            <Layout isAuthenticated={state.isAuthenticated}>
                {routes}
            </Layout>
            <button className={classes.Button}>Hello World!</button>
        </div>
    );
}

export default withRouter(App);
