import React from 'react';
import classes from './Landing.module.css';
import Logo from '../../assets/Logo.png';

const landing =  (props) => {
    return (
        <div>
            <img className={classes.LandingLogo} src={Logo}></img>
            <div className={classes.Text}>
                <h2 style={{display: 'flex', justifyContent:'center'}}>Who We Are</h2>
                <p><b>Imagine this:</b> You want to plan a beautiful picnic in Central Park for you and your 
                    friends. You ask Olivia when she's free and she says Friday's and Saturday's but only
                    before five. You go ask Charlie and she says she has work. Matt has to study for finals. 
                    Okay, let's try again. You ask everyone to share their calendars with you. Now you have 
                    to put together everyone's schedules to figure out the best day and time for you to meet. 
                    You also have to think about who needs to bring what. Your nice, relaxing day in the 
                    park doesn't seem so relaxing anymore. You're thinking of canceling the picnic all 
                    together because organizing it is becoming an impossible task.
                </p>
                <p>That's where we come in. Let's Meet is an application designed to help people like you 
                    easily coordinate and plan out events. With Let's Meet, you can create an event, fill 
                    out event details, put in your availability, send out invitations to friends so they 
                    can put in their availabilities, and we will handle the rest. We'll suggest specific 
                    dates and times that work best for you and your friends. All you have you to do is check 
                    a bubble and your event is finalized.
                </p>
                
            </div>  

            <div className={classes.Text}>
                <h2 style={{display: 'flex', justifyContent:'center'}}>Features</h2>
                <p>Need a little more help figuring out the small details? We can help with that too! Let's 
                    Meet has built in features to help you manage your event, from who's attending to who
                    is bringing what. We can even help you split costs after your event is over!
                </p>
                <div style={{display: 'flex', justifyContent:'center'}}>
                    <p style={{padding: '20px', border: 'solid #939cf1'}}>With an account, you can: 
                        <ul>
                            <li>Select your availability so we can suggest best meeting times</li>
                            <li>Automatically send invitation links to friends</li>
                            <li>Manage events you've created</li>
                            <li>Keep track of upcoming events you're attending</li>
                            <li>See your pending invitations</li>
                            <li>Track supplies and costs and split expenses</li>
                            <li>Manage a friends list for easy invitations</li>
                        </ul>
                        Without an account, you can: 
                        <ul>
                            <li>Create new events with a specified time</li>
                            <li>Send invitations to friends via a shareable link</li>
                            <li>See who is attending an event</li>
                        </ul>
                    </p>
                </div>
            </div> 

            <div className={classes.Text}>
                <h2 style={{display: 'flex', justifyContent:'center'}}>The People Behind the Product</h2>
            </div>       
        </div>
    )
};

export default landing;