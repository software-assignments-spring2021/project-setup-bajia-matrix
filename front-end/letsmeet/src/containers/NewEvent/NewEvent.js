import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Alert, Button, DatePicker, Divider, Form, Input, Modal, Select, Space, TimePicker, Tag} from 'antd';
import { CopyOutlined, EnvironmentOutlined, InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Tab, Tabs } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ScheduleSelector  from 'react-schedule-selector';
import moment from 'moment';
import axios from '../../axios';

import classes from '../NewEvent/NewEvent.module.css';
import EventTitle from '../../components/EventParts/EventTitle/EventTitle';

/*
    TODO: comment about component

    Props:
        - isAuthenticated: whether the user is signed in or not
*/

const NewEvent = (props) => {

    // Variables for the form
    const [form] = Form.useForm()
    const [requiredMark, setRequiredMarkType] = useState('*')

    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    //Used to select date for non-users
    const [finalDate, setFinalDate] = useState(Date())
    const [finalStartTime, setFinalStartTime] = useState(Date())
    const [finalEndTime, setFinalEndTime] = useState(Date())
    const [finalDay, setFinalDay] = useState(Date())

    function handleFinalDate(date, dateString) {
        setFinalDate(dateString)
        setFinalDay(moment(dateString).format('dddd'))
        console.log(dateString)
    }

    function handleFinalTime(date) {
        setFinalStartTime(date[0].format('LT'))
        setFinalEndTime(date[1].format('LT'))
    }

    // Used to select friends
    const { Option } = Select

    // Used to select date for verified users
    const [startDate, setDate] = useState()
    const dateFormat = "MM/DD"
    const [schedule, setSchedule] = useState() // this variable holds selected dates and time in this format: Thu Apr 22 2021 09:00:00 GMT-0400 (Eastern Daylight Time)
    
    // Availability calendar update dates and times selected
    function onChange(date) {
        setDate(date.format('LL'))  // sets start date for week view
        setSchedule()               // clear previously selected if start date is changed
    }

    function handleChangeSchedule(e) {
        setSchedule(e)      // stores selected dates and times
        console.log(e)
    }

    // when clicking submit
    function handleSubmit(e) {
        e.preventDefault()
    }

    // Event pop-up after pressing submit
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    let handleOk = () => {
        setIsModalVisible(false);
        props.history.push({
            pathname: "/",
            state: {newUpcomingEvent: newCreatedEvent}
        });
        window.location.assign('/');
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const [profileState, setProfileState] = useState({
        friends: []
    })

    useEffect(() => {
        const id = 123;
        axios.get("/profile?userid=" + id)
            .then(response => {
                setProfileState(response.data)
            })
            .catch(error => {
                console.log(error);
            })
      }, []);

    let friendsList = profileState.friends.map(friend => (
        <Option value={friend.name}>{friend.name}</Option>
    ))

    const [newCreatedEvent, setNewCreatedEvent] = useState({
        id: "",
        title: "",
        location: "",
        description: "",
        attendees: [],
        myCreatedEvent: true
    })

    let sendToBackend = param => e => {
        setNewCreatedEvent(prevState => ({
            ...prevState,
            id: "123",
            title: param.getFieldValue('Event Title'),
            location: param.getFieldValue('Location'),
            description: param.getFieldValue('Event Description'),
            attendees: param.getFieldValue('Invited Friends'),
        }))
        // console.log(param.getFieldValue('Invited Friends'))

        axios.post("/events", newCreatedEvent)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
        
        console.log(newCreatedEvent);
        // props.history.push({
        //     pathname: "/events",
        //     state: {newEventState: newCreatedEvent}
        // });
    }

    return (
        <div>
            <div className={classes.subheader}>
                <center><h6>Create a New Event</h6></center>
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
                    onFinish={showModal}
                >
                    <Form.Item 
                        label="Event Title" 
                        name="Event Title"
                        required tooltip={{
                            title: "This is a required field.", 
                            icon: <InfoCircleOutlined />,
                        }}
                        rules={[{required:true, message: 'Please include event title!'}]}
                    >
                        <Input.TextArea placeholder="ex. Birthday Party" autoSize maxLength={50} showCount={true}/>
                    </Form.Item>

                    <Form.Item
                        label="Event Description"
                        name="Event Description"
                        required tooltip={{
                            title: "Write the event details here.",
                            icon: <InfoCircleOutlined />,
                        }}
                        rules={[{required: true, message: 'Please include event description!'}]}
                    >
                        <Input.TextArea autoSize maxLength={300} showCount={true} placeholder="Write event details here"/>
                    </Form.Item>

                    <Form.Item 
                        label="Location"
                        name="Location"
                        required 
                        tooltip={{
                            title: "Where is your event being held?",
                            icon: <InfoCircleOutlined />,
                        }}
                        rules={[{required:true, message: 'Please include event location!'}]}
                    >
                        <Input
                            prefix={<EnvironmentOutlined/>}
                            placeholder="Add event location"
                        />
                    </Form.Item>

                    {!props.isAuthenticated && <>
                        <Form.Item
                            name="Date"
                            label="Date & Time"
                            required 
                            rules={[{required:true, message: 'Please include event date!'}]}
                        >
                            <DatePicker 
                                onChange={handleFinalDate} 
                                format="MM/DD/YYYY" 
                                allowClear={false}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Time"
                            rules={[{required:true, message: 'Please include event time!'}]}
                        >
                            <TimePicker.RangePicker 
                                onChange={handleFinalTime}
                                format="h:mm A" use12Hours 
                                allowClear={false}
                                minuteStep={30}
                            />
                        </Form.Item>
                    </>}

                    {props.isAuthenticated && <>
                        <Form.Item 
                            label="Invite Friends" 
                            name="Invited Friends"
                            tooltip={{
                                title: "Invite people from your friends list. You can add more friends later.",
                                icon: <InfoCircleOutlined />,
                            }}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Select from Friends List"
                                className={classes.dropdown}
                            >
                                {friendsList}
                            </Select>
                        </Form.Item>

                        <Divider orientation="center">Availability</Divider>
                        <Form.Item
                            label="Your Availability for this Event"
                            name="Availability"
                            required
                            tooltip={{
                                title: 'Please include as many availability slots as possible. We use this to calculate best possible times for your event.',
                                icon: <InfoCircleOutlined />,
                            }}
                        >
                            <span>Select your availability using the calendar below. Start by selecting a start date, and then click and drag to select availability.</span>
                        </Form.Item>

                        {/* Availability for verified users*/}
                        <Form.Item 
                            className={classes.dateSelect}
                            label="Select start date for availability calendar."
                            name="Calendar Start Date"
                            required
                            rules={[
                                {
                                    validator: async () => {
                                    if (!startDate) {
                                        return Promise.reject(new Error('Please select a start date for the availability calendar!'));
                                    }
                                    },
                                },
                            ]}
                        >
                            <DatePicker format={dateFormat} onChange={onChange} allowClear={false}/>
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
                                onChange={handleChangeSchedule}
                                selectedColor={"#3D41D8"}
                                selection={schedule}
                                minTime={7}
                                timeFormat={'h a'}
                            />
                        </Form.Item>
                    </>}
                        
                    <Button type="primary" htmlType="submit" className={classes.formButton} onClick={sendToBackend(form)}>Submit</Button>

                    <Modal title="Event created successfully!" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} centered>
                        {props.isAuthenticated && <EventTitle title={form.getFieldValue('Event Title')} newEventAuthentication={true} description={form.getFieldValue('Event Description')} location={form.getFieldValue('Location')}/>}
                        {!props.isAuthenticated && <EventTitle title={form.getFieldValue('Event Title')} day={finalDay} date={finalDate} time={finalStartTime + ' - ' + finalEndTime} description={form.getFieldValue('Event Description')} location={form.getFieldValue('Location')}></EventTitle>}
                        <CopyToClipboard text='[event id link]' className={classes.copyLink}>
                            <Tag icon={<CopyOutlined/>} className={classes.copyButton}>[event id link] (Click to copy to clipboard)</Tag>
                        </CopyToClipboard>
                        <div className={classes.spacing}></div>
                        {!props.isAuthenticated && <>
                            <Alert
                                message="Want to unlock all features? Create an account now!"
                                type="info"
                                showIcon
                                action={<a href="/signup"><Button size="small" type="primary" >Go</Button></a>}
                            />
                        </>}
                    </Modal>
                </Form>
            </div>
        </div>
    );
};

export default withRouter(NewEvent);
