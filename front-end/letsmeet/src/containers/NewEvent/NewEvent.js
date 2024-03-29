import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Alert, Button, DatePicker, Divider, Form, Input, Modal, Select, TimePicker, Tag} from 'antd';
import { CopyOutlined, EnvironmentOutlined, InfoCircleOutlined} from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ScheduleSelector  from 'react-schedule-selector';
import moment from 'moment';

// import custom files and components
import classes from '../NewEvent/NewEvent.module.css';
import axios from '../../axios';
import EventTitle from '../../components/EventParts/EventTitle/EventTitle';

/*
    This component displays the Create New Event page where the user can
    create a new event and invite their friends to participate in that event.

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
    
    // Used to select date for non-users
    const [finalDate, setFinalDate] = useState(Date())
    const [finalStartTime, setFinalStartTime] = useState(Date())
    const [finalEndTime, setFinalEndTime] = useState(Date())
    const [finalDay, setFinalDay] = useState(Date())

    /**
     * Handles the date for unregistered users so that the format matches "MM/DD/YYYY"
     * 
     * @param {*} date 
     * @param {*} dateString 
     */
    function handleFinalDate(date, dateString) {
        setFinalDate(date.format('LL'))
        setFinalDay(moment(dateString).format('dddd'))
    }

    /**
     * Handles time for unregistered users so that the format matches "h:mm A"
     * 
     * @param {*} date 
     */
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
    }

    // Event pop-up after pressing submit
    const [isModalVisible, setIsModalVisible] = useState(false)

    const [url, setUrl] = useState("");

    let handleOk = () => { // Handles when 'OK' button is clicked on the pop-up modal
        setIsModalVisible(false)
        if (!props.isAuthenticated) {
            window.location.assign("/event/" + url.split("/event/")[1])
        } else {
            window.location.assign("/")
        }
    }

    const [profileState, setProfileState] = useState({
        friends: []
    })

    useEffect(() => {
        const id = localStorage.getItem("userID");
        
        if (props.isAuthenticated) {
            axios.get("/profile?userid=" + id)
                .then(response => {
                    setProfileState(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
        }
      }, [props.isAuthenticated]);

    // Store the entire friend object as the value
    let friendsList = profileState.friends.map((friend, index) => (
        <Option key={index} value={JSON.stringify(friend)}>{friend.name}</Option>
    ))

    // For newly created event
    const [newCreatedEvent, setNewCreatedEvent] = useState({ 
        title: "",
        eventLocation: "",
        description: "",
        invitees: []
    })

    /**
     * Once form is finished and submitted, the event is pushed to the backend
     * 
     * @param {*} param 
     * @returns 
     */
    let sendToBackend = param => e => {
        const inviteesList = (param.getFieldValue('Invited Friends')) ? param.getFieldValue('Invited Friends') : [];

        if (props.isAuthenticated) {
            setNewCreatedEvent(prevState => ({
                ...prevState,
                title: param.getFieldValue('Event Title'),
                eventLocation: param.getFieldValue('Location'),
                description: param.getFieldValue('Event Description'),
                invitees: inviteesList,
                creator: profileState.name,
                creatorID: profileState._id
            }))
        } else {
            setNewCreatedEvent(prevState => ({
                ...prevState,
                title: param.getFieldValue('Event Title'),
                eventLocation: param.getFieldValue('Location'),
                description: param.getFieldValue('Event Description'),
                invitees: inviteesList,
            }))
        }

        let inviteesCopy = [];
        if (inviteesList.length > 0) {
            // eslint-disable-next-line
            inviteesList.map((invitee) => {
                inviteesCopy.push(JSON.parse(invitee));
            })
        }

        let newEventCopy = newCreatedEvent;
        newEventCopy.title = param.getFieldValue('Event Title');
        newEventCopy.eventLocation = param.getFieldValue('Location');
        newEventCopy.description = param.getFieldValue('Event Description');
        newEventCopy.invitees = inviteesCopy;
        newEventCopy.availability = schedule;
        newEventCopy.startDate = startDate;
        if (props.isAuthenticated) {
            newEventCopy.creatorID = profileState._id;
            newEventCopy.creator = profileState.name; 
        } else {
            newEventCopy.finalDate = finalDate;
            newEventCopy.finalDay = finalDay;
            newEventCopy.finalTime = finalStartTime + ' - ' + finalEndTime;
        }

        axios.post("/events?new=true", newEventCopy)
            .then(response => {
                console.log(response.data.data);
                let appURL = process.env.REACT_APP_BASE_URL;

                if (appURL === "http://localhost:4000") {
                    appURL = appURL.replaceAll(":4000", ":3000");
                } else {
                    appURL = appURL.replaceAll(":4000", "");
                }

                let eventURL = appURL + "/event/" + response.data.newEventURL
                setUrl(eventURL)
                // After new event is created, send invitation emails to invitees
                if (props.isAuthenticated) {
                    axios.post("/events/emailInvitee", {invitees: newEventCopy.invitees, creator: newEventCopy.creator})
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch(error => {
                console.log(error)
            });
        
        setIsModalVisible(true);
    }

    return (
        <div>
            <div className={classes.Header}>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="align-self-baseline">
                        <a href="/">Cancel</a>
                    </div>
                    <div className="align-self-baseline">
                        <h6>Create a New Event</h6>
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
                    onFinish={sendToBackend(form)}
                    scrollToFirstError
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
                                inputReadOnly={true}
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
                                inputReadOnly={true}
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
                            <DatePicker format={dateFormat} onChange={onChange} allowClear={false} inputReadOnly={true}/>
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
                        
                    <Button type="primary" htmlType="submit" className={classes.formButton} >Submit</Button>

                    <Modal 
                        title="Event created successfully!" 
                        visible={isModalVisible} 
                        onOk={handleOk} 
                        closable={false} 
                        centered
                        footer={[
                            <Button key="submit" type="primary" onClick={handleOk}>
                              Done
                            </Button>
                          ]}
                    >
                        {props.isAuthenticated && <EventTitle title={form.getFieldValue('Event Title')} newEventAuthentication={true} description={form.getFieldValue('Event Description')} location={form.getFieldValue('Location')}/>}
                        {!props.isAuthenticated && <EventTitle title={form.getFieldValue('Event Title')} day={finalDay} date={finalDate} time={finalStartTime + ' - ' + finalEndTime} description={form.getFieldValue('Event Description')} location={form.getFieldValue('Location')}></EventTitle>}
                        {!props.isAuthenticated && <p className={classes.warning}>Your event can only be accessed with this link. Remember to save it in a safe place.</p>}
                        <CopyToClipboard text={url} className={classes.copyLink}>
                            <Tag icon={<CopyOutlined/>} className={classes.copyButton}>Click to copy shareable event link</Tag>
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
