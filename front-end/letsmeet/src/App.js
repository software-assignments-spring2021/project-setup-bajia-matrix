import React from 'react';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Layout from './hoc/Layout/Layout';
import Landing from './components/Landing/Landing';
import SignIn from '../src/containers/Auth/SignIn/SignIn';
import SignUp from '../src/containers/Auth/SignUp/SignUp';
import SignOut from '../src/containers/Auth/SignOut/SignOut';


import Home from './containers/Home/Home';
import Profile from './containers/Profile/Profile';
import EditAvatar from './containers/Profile/EditAvatar/EditAvatar';
import EditProfile from './containers/Profile/EditProfile/EditProfile';
import AddFriends from './containers/Profile/AddFriends/AddFriends';
import NewEvent from './containers/NewEvent/NewEvent';
import AcceptInvite from './containers/AcceptInvite/AcceptInvite';
import EditSupplies from './containers/EventPage/EventSupplies/EditSupplies/EditSupplies';
import EventPage from './containers/EventPage/EventPage';

/*
    This is the main component of our app, which is rendered
    by index.js. It sets up the layout of our app, with a navbar
    fixed to the top and a specific page below it. All routes are
    declared here as well.

    Props:
        This component does not accept any custom props
*/

const App = (props) => {
    let isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== null && isAuthenticated === "true") {
        isAuthenticated = true;
    }
    else {
        isAuthenticated = false;
    }

    let routes = (
        <Switch>
            <Route path="/signin" component={SignIn} />]
            <Route path="/signup" component={SignUp} />]
            <Route path="/newevent" component={NewEvent}/>
            <Route path="/event/:id" exact component={() => <EventPage isAuthenticated={isAuthenticated} history={props.history} />} />
            <Route path="/" component={Landing} />
        </Switch>
    );

    if (isAuthenticated === true) {
        routes = (
            <Switch>
                <Route path="/profile" component={Profile}/>
                <Route path="/event/:id" exact component={() => <EventPage isAuthenticated={isAuthenticated} />} />
                <Route path="/editsupplies"  component={EditSupplies} />
                <Route path="/user/newevent" component={() => <NewEvent isAuthenticated={isAuthenticated} />} />
                <Route path="/editfriends" component={AddFriends} />
                <Route path="/user/acceptinvite" component={AcceptInvite}/>
                <Route path="/signout" component={SignOut} />
                <Route path="/editavatar" component={EditAvatar} />
                <Route path="/editprofile" component={EditProfile} />
                <Route path="/" component={Home} />
                <Redirect to="/" />
            </Switch>
        );
    }
    
    return (
        <div className="App">
            <Layout isAuthenticated={isAuthenticated}>
                {routes}
            </Layout>
        </div>
    );
}

export default withRouter(App);
