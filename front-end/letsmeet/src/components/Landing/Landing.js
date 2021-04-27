import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse } from 'antd';

import classes from './Landing.module.css';
import Logo from '../../assets/Logo.png';
import image1 from '../../assets/LandingImages/calendar-colour-800px.png';
import image2 from '../../assets/LandingImages/holding-phone-colour-800px.png';
import image3 from '../../assets/LandingImages/reading-corner-colour-800px.png';
import image4 from '../../assets/LandingImages/drawkit-list-app-colour-800px.png';

/*  
    Function to display cards with images and short feature descriptions on landing  page
    
    Props:
        - img: picture
        - title: short header
        - lead: one or two sentences describing a feature of the app
*/

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

/* 
    Function for the table format
    
    Props:
        - feature: feature description
        - with: text to put in the with column
        - without: text to put in the without column
*/

const Row = (props) => {
    return (
        <tr>
            <td className={classes.LandingTD}>{props.feature}</td>
            <td className={classes.LandingTD}>{props.with}</td>
            <td className={classes.LandingTD}>{props.without}</td>
        </tr>
    )
}

// clicking on Panel displays feature table
const { Panel } = Collapse;

/* 
    This component displays the landing page
    
    Props:
        This component does not accept any custom props
*/

const landing = () => {
    return (
        <div>
            <img className={classes.LandingLogo} src={Logo} alt="Logo"></img>
            <h1 className={classes.TagLine}>Planning a hangout shouldn't take more than 10 minutes.</h1>
            <h1 className={classes.SecondLine}>Let us help.</h1>
            
            <CardDeck >
                <Step title="Skip the back-and-forth texts" img={image1} lead="Want to schedule a picnic with your friends?
                Create a new event, fill out some details, and select your availability using the calendar."/>

                <Step title="Send out invitations with one click" img={image2} lead="Select the friends you want to invite.
                We'll email them a link and they can fill in their availabilities too."/>

                <Step title="Sit back and relax" img={image3} lead="We'll calculate and suggest specific dates and times 
                that work best for you and your friends based on the availabilites you gave us."/>

                <Step title="Manage the little things" img={image4} lead="Manage your events, see who's attending, and who's
                bringing what. We'll even help you split costs after your event is over."/>
            </CardDeck>

            <div className={classes.Text}>
                <h2 className={classes.LandingH2}>FEATURES</h2>

                <div className={classes.collapse}>
                    <Collapse>
                        <Panel showArrow={false} header="Don't miss out! Click to discover benefits of having an account." key="1">
                            <table className={classes.LandingTable}>
                                <tr>
                                    <th className={classes.LandingTH}>Highlighted Features</th>
                                    <th className={classes.LandingTH}>With account</th>
                                    <th className={classes.LandingTH}>Without account</th>
                                </tr>
                                <Row feature="Select your availability so we can calculate best meeting times" with="Yes" without="No"/>
                                <Row feature="Automatically send event invitations to friends" with="Yes" without="No"/>
                                <Row feature="Manage events you've created" with="Yes" without="No"/>
                                <Row feature="Let us keep track of upcoming events you're attending" with="Yes" without="No"/>
                                <Row feature="See your pending invitations" with="Yes" without="No"/>
                                <Row feature="Track supplies and costs and split expenses" with="Yes" without="No"/>
                            </table>
                        </Panel>
                    </Collapse>
                </div>

                <a href="/newevent" className={classes.a}><button className={classes.Button}><b>
                    Get Started Without An Account: Create New Event
                </b></button></a>
                
            </div>       
        </div>
    )
};

export default landing;
