import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import classes from '../AcceptInvite/AcceptInvite.module.css'
import axios from '../../axios';
import { Button, DatePicker, Divider, Form, Space, TimePicker} from 'antd';
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Tab, Tabs } from 'react-bootstrap'
import ScheduleSelector  from 'react-schedule-selector';
import EventTitle from '../../components/EventParts/EventTitle/EventTitle';
import moment from 'moment';

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
        axios.get("/events.json?key=c66d8800")
            .then(response => {
                const list = response.data.events;
                // setEvent({ eventsList: list });
                setEvent(list[0]);
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
    // List view
    let selectedStartTimes = []
    let selectedEndTimes = []
    const [selectedDates, setSelectedDates] = useState([])
   
    function handleSelectedTimes(date, dateString) {
        selectedStartTimes.push(date[0].format('LT'))
        selectedEndTimes.push(date[1].format('LT'))
    }

    function handleChangeSchedule(e) {
        setSchedule(e)
        console.log(schedule)
    }

    function handleSubmit(e) {
        e.preventDefault()
        // Delete event from pending invitations on home screen
    }

    // Used for tab display
    const [key, setKey] = useState('week')

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

                    {/* TODO: if event creator put availability in week view, automatically display week view
                        If event creator put availability in list view, automatically display list view
                    */}
                    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>

                        <Tab eventKey="week" title="Week View">
                            <Form.Item
                                label="Your Availability for this Event"
                                name="Availability"
                                required
                                tooltip={{
                                    title: 'Please include as many availability slots as possible. We use this to calculate best possible times for this event.',
                                    icon: <InfoCircleOutlined />,
                                }}
                            >
                                <span className="ant-form-text">The event creator wants this event to take place the week of {startDate}
                                {/* TODO: start date indicated by creator */}. Please put in your availability for that week.</span>
                            </Form.Item>
                            <Form.Item
                                name="calendar select"
                                rules={[
                                    {
                                        validator: async () => {
                                        if (key === "week" && schedule.length === 0) {
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
                        </Tab>

                        <Tab eventKey="list" title="List View">
                            <Form.Item
                                label="Your Availability for this Event"
                                name="Availability"
                                required
                                tooltip={{
                                    title: 'Please include as many availability slots as possible. We use this to calculate best possible times for this event.',
                                    icon: <InfoCircleOutlined />,
                                }}
                            >
                                <span className="ant-form-text"><b>Date and Time Slot Availability:</b> Please add at least one date and time slot. The more the merrier!</span>
                            </Form.Item>
                            <Form.List 
                                name="slots"
                                rules={[
                                    {
                                        validator: async (_, names) => {
                                        if ((!names || names.length < 1) && key === "list") {
                                            return Promise.reject(new Error('Must include at least one availability slot!'));
                                        }
                                        },
                                    },
                                ]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                    <Space key={field.key} className={classes.space} align="end">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'dates']}
                                            fieldKey={[field.fieldKey, 'dates']}
                                            rules={[{ required: true, message: 'Missing date' }]}
                                        >
                                            <DatePicker onChange={setSelectedDates} format="MM/DD/YYYY" allowClear={false}/>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'times']}
                                            fieldKey={[field.fieldKey, 'times']}
                                            rules={[{ required: true, message: 'Missing time slot' }]}
                                        >
                                            <TimePicker.RangePicker onChange={handleSelectedTimes} format="h:mm A" use12Hours allowClear={false}/>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(field.name)} className={classes.deleteField} />
                                    </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add field
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                                )}
                            </Form.List>
                        </Tab>
                    </Tabs>
                        
                    <Button type="primary" htmlType="submit" className={classes.formButton}>Submit</Button>

                </Form>
            </div>
        </div>
    );
};

export default AcceptInvite;