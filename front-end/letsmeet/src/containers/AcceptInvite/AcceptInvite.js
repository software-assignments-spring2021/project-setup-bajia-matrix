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

    // Event Details
    const [event, setEvent] = useState({
        id: "1-i-am-random-event-id",
        title: "Study Date",
        description:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        creator: "Angela Tim",
        location: "Angela's House",
    });

    // Used to populate event details with event details in mdatabase
    useEffect(() => {
        // TODO: should only get events with current user listed in attendees list
        axios.get("/events")
            .then(response => {
                const list = response.data.events;
                // setEvent({ eventsList: list });
                setEvent(props.location.state.acceptPending);
                setLoading({ events: false });
            })
            .catch(error => {
                console.log(error);
                setLoading({ events: false });
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
    }

    // After clicking submit, reroute back to home page
    const goHome = () => {
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
                            location={event.location}
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
                            <span>The event creator wants this event to take place the week of {startDate}
                            {/* TODO: start date indicated by creator */}. Please put in your availability for that week.</span>
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