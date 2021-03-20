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

// Function for the table format
const Row = (props) => {
    return (
        <tr>
            <td className={classes.LandingTD}>{props.feature}</td>
            <td className={classes.LandingTD}>{props.with}</td>
            <td className={classes.LandingTD}>{props.without}</td>
        </tr>
    )
}

const landing = () => {
    return (
        <div>
            <img className={classes.LandingLogo} src={Logo} alt="Logo"></img>
            <h1 className={classes.TagLine}>Planning a hangout shouldn't take more than 10 minutes.</h1>
            <h1 className={classes.SecondLine}>Let us help.</h1>
            
            <CardDeck style={{padding: '50px 20px'}}>
                <Step title="Skip the back-and-forth texts" img={image1} lead="Want to schedule a picnic with your friends?
                Create a new event, fill out some details, and select your availability using the calendar."/>

                <Step title="Send out invitations with one click" img={image2} lead="Select the friends you want to invite.
                We'll email them a link and they can fill in their availabilities too."/>

                <Step title="Sit back and relax" img={image3} lead="We'll calculate and suggest specific dates and times 
                that work best for you and your friends based on the availabilites you gave us."/>

                <Step title="Manage the little things" img={image4} lead="Manage your events, see who's attending, and who's
                bringing what. We'll even help you split costs after your event is over."/>
            </CardDeck>

            <a href="/signup" className={classes.a}><button className={classes.Button} ><b>
                Get Started - Create An Account
            </b></button></a>

            <div className={classes.Text}>
                <h2 className={classes.LandingH2}>FEATURES</h2>
                <table className={classes.LandingTable}>
                    <tr>
                        <th className={classes.LandingTH}>Highlighted Features</th>
                        <th className={classes.LandingTH}>With an account</th>
                        <th className={classes.LandingTH}>Without an account</th>
                    </tr>
                    <Row feature="Create and schedule events" with="Yes" without="Yes"/>
                    <Row feature="Select your availability so we can calculate best meeting times" with="Yes" 
                    without="No, event creater must provide specific date and time"/>
                    <Row feature="Send invitations to friends with shareable link" with="Yes" without="Yes"/>
                    <Row feature="Automatically send event invitations to friends" with="Yes" 
                    without="No, you must manually send the link to your friend"/>
                    <Row feature="Access event details" with="Yes" without="Yes, only with event link"/>
                    <Row feature="See who is attending an event" with="Yes" without="Yes"/>
                    <Row feature="Manage events you've created" with="Yes" 
                    without="No, once an event link is generated, you no longer have creator privileges"/>
                    <Row feature="Keep track of upcoming events you're attending" with="Yes" 
                    without="No, you must keep track of event links you've created or received"/>
                    <Row feature="See your pending invitations" with="Yes" without="No"/>
                    <Row feature="Accept an invitiation" with="Yes" 
                    without="Yes, by manually adding your name to the attendees list"/>
                    <Row feature="Track supplies and costs and split expenses" with="Yes" without="No"/>
                </table>

                <a href="/newevent" className={classes.a}><button className={classes.Button}><b>
                    Get Started Without An Account: Create New Event
                </b></button></a>
                
            </div>       
        </div>
    )
};

export default landing;
