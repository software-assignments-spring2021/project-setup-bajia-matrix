import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Divider, Form } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScheduleSelector  from 'react-schedule-selector';

// import custom files and components
import classes from '../AcceptInvite/AcceptInvite.module.css';
import axios from '../../axios';
import EventTitle from '../../components/EventParts/EventTitle/EventTitle';

/*
    This component displays the Accept Invite page where the user 
    inputs their availability to be added to the event's 
    attendee list.

    Props:
        This component does not accept any custom props
*/

const AcceptInvite = (props) => {

    // default event state
    const [event, setEvent] = useState({
        title: "",
        availability: [],
        eventLocation: "",
        description: "",
        creator: ""
    });

    const [user, setUser] = useState({});
    
    // Used to select availability
    // Week view
    const [startDate, setDate] = useState("")
    const [schedule, setSchedule] = useState()

    // Used to populate event details from database
    useEffect(() => {
        const id = props.location.state.eventId;
        const userId = props.location.state.userId;

        axios.get("/events?eventid=" + id)
            .then(response => {
                setEvent(response.data);
                setDate(response.data.startDate);
            })
            .catch(error => {
                console.log(error.response.data);
                props.history.push("/"); // redirect to home page if event no longer exists
            });

        axios.get("/profile?userid=" + userId)
            .then(response => {
                setUser(response.data)
            })
            .catch((error) => {
                console.log(error.response.data)
            });
    }, [ props.history, props.location.state ]);

    // Variables for the form
    const [form] = Form.useForm()
    const [requiredMark, setRequiredMarkType] = useState('*')

    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    function handleChangeSchedule(e) {
        setSchedule(e)
    }

    function updateInvitee() {
        // Remove user from invitee list
        axios.delete("/events?pending=true&userid=" + user._id + "&eventid=" + event._id)
            .then(response => {
                // TODO: axios call to email creator
                
                // Get creator details
                axios.get("/profile?userid=" + event.creatorID)
                    .then(response => {
                        const creatorEmail = response.data.email
                        // Send email to creator
                        emailCreator(creatorEmail)
                    })
                    .catch((error) => {
                        console.log(error.response.data)
                    });
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    function emailCreator(e) {
        axios.post("/events/emailCreator", {invitee: user, event: event, creatorEmail: e})
            .then((response) => {
                window.location.assign('/')
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // After clicking submit, reroute back to home page
    const goHome = () => {
        let newAvailability = event.availability

        for (let i of schedule) {
            newAvailability.push(i)
        }

        let attendee = {
            id: user._id,
            name: user.name
        }

        event.attendees.push(attendee)

        setEvent(prevState => ({
            ...prevState,
            availability: newAvailability
        }))

        axios.post("/events?_id=" + event._id, event)
            .then(response => { 
                updateInvitee()
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    return (
        <div>
            <div className={classes.Header}>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="align-self-baseline">
                        <a href="/">Cancel</a>
                    </div>
                    <div className="align-self-baseline">
                        <h6>Accept Event Invitation</h6>
                    </div>
                    <div className={classes.FlexPadding}>Cancel</div>
                    {/* This is invisible text to center the header */}
                </div>
                <hr/>
            </div>
            <div className={classes.container}>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        requiredMark,
                    }}
                    onValuesChange={onRequiredTypeChange}
                    requiredMark={requiredMark}
                    onFinish={goHome}
                    scrollToFirstError
                >
                
                    <Form.Item className={classes.eventDetails}>
                        <EventTitle
                            title={event.title}
                            description={event.description}
                            creator={event.creator}
                            showCreator={true}
                            // Set newEventAuthentication to true for this page
                            newEventAuthentication={true}
                            location={event.eventLocation}
                        />
                    </Form.Item>

                    <Divider orientation="center">Availability</Divider>

                        <Form.Item
                            label="Your Availability for this Event"
                            name="Availability"
                            required
                            tooltip={{
                                title: 'Please include as many availability slots as possible. We use this to calculate best possible times for this event.',
                                icon: <InfoCircleOutlined />,
                            }}
                        >
                            <span>The event creator wants this event to take place the week of {startDate}.
                            Please put in your availability for that week.</span>
                        </Form.Item>
                        <Form.Item
                            name="calendar select"
                            rules={[
                                {
                                    validator: async () => {
                                    if (schedule.length === 0) {
                                        return Promise.reject(new Error('Please select at least one availability slot!'));
                                    }
                                    },
                                },
                            ]}
                        >
                            <ScheduleSelector
                                hourlyChunks={1}
                                startDate={startDate} 
                                /* Set start date to be the one indicated by event creator" */
                                onChange={handleChangeSchedule}
                                selectedColor={"#3D41D8"}
                                selection={schedule}
                            />
                        </Form.Item>
                        
                    <Button type="primary" htmlType="submit" className={classes.formButton}>Submit</Button>

                </Form>
            </div>
        </div>
    );
};

export default AcceptInvite;