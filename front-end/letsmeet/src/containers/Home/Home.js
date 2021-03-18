import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './Home.module.css';
import axios from '../../axios';
import Event from '../../components/Event/Event';
import EventInvite from '../../components/Event/EventInvite/EventInvite';

/*
    This component displays the home page with a signed in user.
    This will show a notification if the user has pending invitations
    for an event. It will also show a list of events the user is currently
    signed up for. The user can also create new events from this page.

    Props: 
        This component does not accept any custom props
*/

// TODO: display myEvents and upcomingEvents and pendingInvites using custom sorter
// sort by earliest date to latest. Better to do this in front-end or do it in back-end
// and pass a sorted array to front-end? I think back-end is best
const Home = (props) => {
    // TODO: comment out eventsList items when mockaroo runs out of requests
    const [eventsState, setEventsState] = useState([
        // {
        //     id: 1,
        //     title: "Study Date",
        //     day: "Wed",
        //     date: "Mar 10",
        //     time: "5:00 pm",
        //     description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        //     attendees: [
        //         "Angela"
        //     ],
        //     myCreatedEvent: true,
        //     creator: "Angela"
        // },
        // {
        //     id: 2,
        //     title: "Brunch",
        //     day: "Sat",
        //     date: "Mar 6",
        //     time: "11:00 am",
        //     description: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. ",
        //     attendees: [
        //         "Jessica",
        //         "James",
        //         "Ethan",
        //         "Kai"
        //     ],
        //     myCreatedEvent: false,
        //     creator: "Jessica"
        // },
        // {
        //     id: 3,
        //     title: "Alex's Birthday",
        //     day: "Wed",
        //     date: "Mar 24",
        //     time: "7:30 pm",
        //     description: "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.",
        //     attendees: [
        //         "Alex",
        //         "Tom",
        //         "Alice"
        //     ],
        //     myCreatedEvent: false,
        //     creator: "Alex"
        // }
    ]);

    useEffect(() => {
        // TODO: should only get events with current user listed in attendees list
        axios.get("/events.json?key=fe6891f0")
            .then(response => {
                const list = response.data.events;
                // setEventsState({ eventsList: list });
                setEventsState(list);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // TODO: comment out invites list when mockaroo runs out of requests
    const [invitesState, setInvitesState] = useState([
        // {
        //     id: 1,
        //     title: "Movie Night",
        //     range: "March 15th - March 19th",
        //     description: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”",
        //     inviter: "Ethan"
        // }
    ]);

    useEffect(() => {
        // TODO: should be /invites/:userId.json
        // should only get pending invites for current user
        axios.get("/invites.json?key=fe6891f0")
        .then(response => {
            const list = response.data.invites;
            // setInvitesState({ invites: list });
            setInvitesState(list);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    let pendingInvites = invitesState.map((e) => {
        return (
            <EventInvite
                key={e.id}
                title={e.title}
                range={e.range}
                description={e.description}
                inviter={e.inviter}
            />
        );
    });

    let myEvents = eventsState.map((e) => {
        if (e.myCreatedEvent) {
            return (
                <Event
                    key={e.id}
                    title={e.title}
                    day={e.day}
                    date={e.date}
                    time={e.time}
                    description={e.description}
                    attendees={e.attendees}
                    myCreatedEvent={e.myCreatedEvent}
                    creator={e.creator}
                />
            );
        }
        else {
            return null;
        }
    }, []);

    let upcomingEvents = eventsState.map((e) => {
        if (!e.myCreatedEvent) {
            return (
                <Event
                    key={e.id}
                    title={e.title}
                    day={e.day}
                    date={e.date}
                    time={e.time}
                    description={e.description}
                    attendees={e.attendees}
                    myCreatedEvent={e.myCreatedEvent}
                    creator={e.creator}
                />
            );
        }
        else {
            return null;
        }
    });

    let newEventHandler = () => {
        props.history.push("/editsupplies");
    }

    return (
        <div className={classes.Home}>
            {invitesState.length > 0 ? <h5>Pending Invitations</h5> : null}
            <div className={classes.Event}>
                {pendingInvites}
            </div>
            <Button className={classes.Button} variant="outline-dark" onClick={newEventHandler}>Create New Event</Button>
            <h5>Your Events</h5>
            <div className={classes.Event}>
                {myEvents}
            </div>
            <h5>Other Upcoming Events</h5>
            <div className={classes.Event}>
                {upcomingEvents}    
            </div>
        </div>
    );
};

export default Home;