import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import custom files and components
import classes from './Home.module.css';
import axios from '../../axios';
import Event from '../../components/Event/Event';
import EventInvite from '../../components/Event/EventInvite/EventInvite';
import Spinner from '../../components/UI/Spinner/Spinner';

/*
    This component displays the Home page with a signed in user.
    This will display any pending event invitations for the user. 
    It will also show a list of events the user is currently
    a part of. The user can also create new events from this page.

    Props: 
        This component does not accept any custom props
*/

const Home = (props) => {
    const [loading, setLoading] = useState(true);
    const [invitesState, setInvitesState] = useState([]); 
    const [myEventsState, setMyEventsState] = useState([]);
    const [upcomingEventsState, setUpcomingEventsState] = useState([]);
    const id = localStorage.getItem("userID");

    const urlParams = new URLSearchParams(window.location.search);
    let eventParam = urlParams.get('event');

    useEffect(() => {
        // this code for when an unverified user signs up after joining an event as attendee
        // the home page should now display the event the user just joined in the upcoming events section
        if (eventParam) {
            axios.get("/events?eventid=" + eventParam)
                .then(response => {
                    setUpcomingEventsState([response.data]);
                    // disable spinner
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                })
        } 
        else {
            axios.get("/?userid=" + id)
                .then(response => {
                    // invites
                    let list = response.data.invites;
                    setInvitesState(list);

                    // my events
                    list = response.data.myEvents;
                    setMyEventsState(list);
                    
                    // upcoming events
                    list = response.data.upcomingEvents;
                    setUpcomingEventsState(list);
                    
                    // disable spinner
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error.response.data);
                    setLoading(false);
                });
        }
    }, [id, eventParam]);

    const pendingInvites = invitesState.map(e => {
        return (
            <EventInvite
                key={e._id}
                id={e._id}
                title={e.title}
                start={e.startDate}
                description={e.description}
                inviter={e.creator}
                userId={id}
            />
        );
    });

    const myEvents = myEventsState.map(e => {        
        const attendeesList = e.attendees.map(a => {
            return a.name;
        });
        
        return (
            <Event
                key={e._id}
                id={e._id}
                title={e.title}
                day={e.finalDay}
                date={e.finalDate}
                time={e.finalTime}
                myCreatedEvent={true}
                description={e.description}
                attendees={attendeesList}
                creator={e.creator}
            />
        );
    }, []);

    const upcomingEvents = upcomingEventsState.map((e) => {
        const attendeesList = e.attendees.map(a => {
            return a.name;
        });

        return (
            <Event
                key={e._id}
                id={e._id}
                title={e.title}
                day={e.finalDay}
                date={e.finalDate}
                time={e.finalTime}
                myCreatedEvent={false}
                description={e.description}
                attendees={attendeesList}
                creator={e.creator}
            />
        );
    });

    const newEventHandler = () => {
        props.history.push("/user/newevent");
    }

    // render
    let homePage = <Spinner />;
    if (!loading) {
        homePage = (
            <div className={classes.Home}>
                <h5>Pending Invitations</h5>
                <div className={classes.Event}>
                    {(pendingInvites.length === 0) ? <p>You have no pending invitations at the moment.</p> : null}
                    {pendingInvites}
                </div>
                <br />
                <Button variant="outline-dark" onClick={newEventHandler}>Create New Event</Button>
                <h5>Your Events</h5>
                <div className={classes.Event}>
                    {(myEvents.length === 0) ? <p>You do not have any created events at the moment.</p> : null}
                    {myEvents}
                </div>
                <h5>Other Upcoming Events</h5>
                <div className={classes.Event}>
                    {(upcomingEvents.length === 0) ? <p>You do not have any upcoming events at the moment.</p> : null}
                    {upcomingEvents}    
                </div>
            </div>
        );
    }

    return (
        <div>
            {homePage}
        </div>
    );
};

export default Home;