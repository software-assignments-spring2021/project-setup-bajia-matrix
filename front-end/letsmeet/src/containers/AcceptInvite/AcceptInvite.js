import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, DatePicker, Divider, Form, Space, TimePicker} from 'antd';
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Tab, Tabs } from 'react-bootstrap'
import ScheduleSelector  from 'react-schedule-selector';
// import moment from 'moment';

import classes from '../AcceptInvite/AcceptInvite.module.css';
import axios from '../../axios';
import EventTitle from '../../components/EventParts/EventTitle/EventTitle';

/*
    TODO: comment what this component is

    Props:
        This component does not accept any custom props
*/

const AcceptInvite = (props) => {

    const [loading, setLoading] = useState(true);

    // default event state
    const [event, setEvent] = useState({
        title: "",
        description: "",
        creator: "",
        showCreator: false,
        newEventAuthentication: false,
        location: "",
    });

    const [userId, setUserId] = useState();

    // Used to populate event details from database
    useEffect(() => {
        const id = props.location.state.eventId;
        const userId = props.location.state.userId;
        axios.get("/events?eventid=" + id)
            .then((response) => {
                setEvent(response.data);
                setDate(response.data.startDate);
                setUserId(userId);
            })
            .catch((error) => {
                console.log(error.response.data);
                props.history.push("/"); // redirect to home page if event no longer exists
            });
    }, []);

    // Variables for the form
    const [form] = Form.useForm()
    const [requiredMark, setRequiredMarkType] = useState('*')

    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    // Used to select availability
    // Week view
    const [startDate, setDate] = useState("3/28")
    const [schedule, setSchedule] = useState()

    function handleChangeSchedule(e) {
        setSchedule(e)
        console.log(e)
    }

    function handleSubmit(e) {
        e.preventDefault()
        // TODO: Delete event from pending invitations on home screen
        // Bing's comments
        // TODO: Add event to upcoming events aka add current user to list of attendees and remove user from list of invitees
        // if you do this in the backend, then you shouldn't need to pass this event to home
    }

    // After clicking submit, reroute back to home page
    const goHome = () => {
        props.history.push("/");
        window.location.assign('/')
    }

    return (
        <div>
            <div className={classes.subheader}>
                <center><h6>Accept Event Invitation</h6></center>
                <div className={classes.cancelButton}>
                    <a href="/">Cancel</a>
                </div>
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
                    submit={handleSubmit}
                    onFinish={goHome}
                >
                
                    {/* TODO: import and display event details */}
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