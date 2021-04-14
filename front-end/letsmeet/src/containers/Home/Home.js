import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './Home.module.css';
import axios from '../../axios';
import Event from '../../components/Event/Event';
import EventInvite from '../../components/Event/EventInvite/EventInvite';
import Spinner from '../../components/UI/Spinner/Spinner';

/*
    This component displays the home page with a signed in user.
    This will show a notification if the user has pending invitations
    for an event. It will also show a list of events the user is currently
    signed up for. The user can also create new events from this page.

    Props: 
        This component does not accept any custom props
*/

const Home = (props) => {
    const [loading, setLoading] = useState(true);
    const [invitesState, setInvitesState] = useState([]); 
    const [myEventsState, setMyEventsState] = useState([]);
    const [upcomingEventsState, setUpcomingEventsState] = useState([]);
    const id = "6071f92b7278a8a7c6d70217"; // TODO: change to props.id once Rahul is done with auth

    useEffect(() => {
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
    }, []);

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

    // accepts a datetime (Date object) and converts it into day, date, and time
    const formatDateTime = (datetime) => {
        const finalDate = datetime.toLocaleString("en-US",  {
            hour12: true,
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

        const dt = finalDate.split(", ");

        // get day
        const weekday = [
            "Sun",
            "Mon",
            "Tues",
            "Wed",
            "Thurs",
            "Fri",
            "Sat"
        ];
        const day = weekday[datetime.getDay()];
        const date = dt[0];
        const time = dt[1];

        return [day, date, time];
    };

    const myEvents = myEventsState.map(e => {
        let day = null;
        let date = null;
        let time = null;

        // TODO remove the ! when finalDate exists again
        if (!e.finalDate) {
            // TODO: replace mockDate with e.finalDate
            const mockDate = new Date("2021-04-19T13:00:00.000Z");
            [day, date, time] = formatDateTime(mockDate);
        }
        
        const attendeesList = e.attendees.map(a => {
            return a.name;
        });
        
        return (
            <Event
                key={e._id}
                id={e._id}
                title={e.title}
                day={day}
                date={date}
                time={time}
                myCreatedEvent={true}
                description={e.description}
                attendees={attendeesList}
                creator={e.creator}
            />
        );
    }, []);

    const upcomingEvents = upcomingEventsState.map((e) => {
        let day = null;
        let date = null;
        let time = null;

        // TODO remove the ! when finalDate exists again
        if (!e.finalDate) {
            // TODO: replace mockDate with e.finalDate
            const mockDate = new Date("2021-04-19T13:00:00.000Z");
            [day, date, time] = formatDateTime(mockDate);
        }
        
        const attendeesList = e.attendees.map(a => {
            return a.name;
        });

        return (
            <Event
                key={e._id}
                id={e._id}
                title={e.title}
                day={day}
                date={date}
                time={time}
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
                <Button className={classes.Button} variant="outline-dark" onClick={newEventHandler}>Create New Event</Button>
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