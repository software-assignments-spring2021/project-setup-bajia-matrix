import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Landing.module.css';
import Logo from '../../assets/Logo.png';
import image1 from '../../assets/LandingImages/calendar-colour-800px.png';
import image2 from '../../assets/LandingImages/holding-phone-colour-800px.png';
import image3 from '../../assets/LandingImages/reading-corner-colour-800px.png';
import image4 from '../../assets/LandingImages/drawkit-list-app-colour-800px.png';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';

// The template for the app walkthrough containing image, header, paragraph
const Step = (props) => {
    return (
        <Card className={classes.article}>
            <Card.Img src={props.img} className={classes.Images} variant="top" />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.lead}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

const landing = () => {
    return (
        <div>
            <img className={classes.LandingLogo} src={Logo}></img>
            <h1 className={classes.TagLine} style={{paddingTop: '50px'}}>Planning a hangout shouldn't take more than 10 minutes.</h1>
            <h1 className={classes.TagLine} style={{color: '#939cf1', paddingBottom: '20px'}}>Let us help.</h1>
            
            <CardDeck>
                <Step title="Skip the back-and-forth texts" img={image1} lead="Want to schedule a picnic with your friends?
                Create a new event, fill out some details, and select your availability using the calendar."/>

                <Step title="Send out invitations with one click" img={image2} lead="Select the friends you want to invite.
                We'll email them a link and they can fill in their availabilities too."/>

                <Step title="Sit back and relax" img={image3} lead="We'll calculate and suggest specific dates and times 
                that work best for you and your friends based on the availabilites you gave us."/>

                <Step title="Manage the little things" img={image4} lead="Manage your events, see who's attending, and who's
                bringing what. We'll even help you split costs after your event is over."/>
            </CardDeck>

            <a href="/SignUp" style={{textDecoration:'none'}}><button className={classes.Button} ><b>
                Get Started - Create An Account
            </b></button></a>

            <div className={classes.Text}>
                <h2>FEATURES</h2>
                <table>
                    <tr>
                        <th>Highlighted Features</th>
                        <th>With an account</th>
                        <th>Without an account</th>
                    </tr>
                    <tr>
                        <td>Create and schedule events</td>
                        <td>Yes</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Select your availability so we can calculate best meeting times</td>
                        <td>Yes</td>
                        <td>No, event creater must provide specific date and time</td>
                    </tr>
                    <tr>
                        <td>Send invitations to friends with shareable link</td>
                        <td>Yes</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Automatically send event invitations to friends</td>
                        <td>Yes</td>
                        <td>No, you must manually send the link to your friend</td>
                    </tr>
                    <tr>
                        <td>Access event details</td>
                        <td>Yes</td>
                        <td>Yes, only with event link</td>
                    </tr>
                    <tr>
                        <td>See who is attending an event</td>
                        <td>Yes</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Manage events you've created</td>
                        <td>Yes</td>
                        <td>No, once an event link is generated, you no longer have creator privileges</td>
                    </tr>
                    <tr>
                        <td>Keep track of upcoming events you're attending</td>
                        <td>Yes</td>
                        <td>No, you must keep track of event links you've created or received</td>
                    </tr>
                    <tr>
                        <td>See your pending invitations</td>
                        <td>Yes</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Accept an invitiation</td>
                        <td>Yes</td>
                        <td>Yes, by manually adding your name to the attendees list</td>
                    </tr>
                    <tr>
                        <td>Track supplies and costs and split expenses</td>
                        <td>Yes</td>
                        <td>No</td>
                    </tr>
                </table>

                <a href="/newevent" style={{textDecoration:'none'}}><button className={classes.Button} ><b>
                    Get Started Without An Account: Create New Event
                </b></button></a>
                
            </div>       
        </div>
    )
};

export default landing;