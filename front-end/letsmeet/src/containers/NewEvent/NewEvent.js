import React, { useState } from 'react';
import 'antd/dist/antd.css';
import classes from '../NewEvent/NewEvent.module.css'
import { Alert, Button, DatePicker, Divider, Form, Input, Modal, Select, Space, TimePicker, Tag} from 'antd';
import { CopyOutlined, EnvironmentOutlined, InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Tab, Tabs } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ScheduleSelector  from 'react-schedule-selector';
import EventTitle from '../../components/EventParts/EventTitle/EventTitle';
import moment from 'moment';

const NewEvent = (props) => {

    // Variables for the form
    const [form] = Form.useForm()
    const [requiredMark, setRequiredMarkType] = useState('*')

    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    // Used to select friends
    const { Option } = Select;

    // Used to select date for verified users
    // Week view
    const [startDate, setDate] = useState()
    const dateFormat = "MM/DD"
    const [schedule, setSchedule] = useState()
    // List view
    // let selectedDates = []
    let selectedStartTimes = []
    let selectedEndTimes = []
    const [selectedDates, setSelectedDates] = useState([])
    // const [selectedStartTimes, setSelectedStartTimes] = useState([]) 
    // const [selectedEndTimes, setSelectedEndTimes] = useState([])
   
    function handleSelectedTimes(date, dateString) {
        // setSelectedStartTimes(date[0].format('LT'))
        // setSelectedEndTimes(date[1].format('LT'))
        selectedStartTimes.push(date[0].format('LT'))
        selectedEndTimes.push(date[1].format('LT'))
        //console.log(selectedStartTimes)
        //console.log(selectedEndTimes)
    }

    //Used to select date for non-users
    const [finalDate, setFinalDate] = useState(Date())
    const [finalStartTime, setFinalStartTime] = useState(Date())
    const [finalEndTime, setFinalEndTime] = useState(Date())
    const [finalDay, setFinalDay] = useState(Date())

    function handleFinalDate(date, dateString) {
        setFinalDate(dateString)
        setFinalDay(moment(dateString).format('dddd'))
        console.log(finalDate)
    }

    function handleFinalTime(date, dateString) {
        setFinalStartTime(date[0].format('LT'))
        setFinalEndTime(date[1].format('LT'))
    }
    
    function onChange(date, dateString) {
        setDate(dateString)
    }

    function handleChangeSchedule(e) {
        setSchedule(e)
        console.log(schedule)
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    // Used for tab display
    const [key, setKey] = useState('week')

    // Event pop-up after pressing submit
    const [isModalVisible, setIsModalVisible] = useState(false)
    //const copy = require('clipboard-copy')
    const showModal = () => {
        setIsModalVisible(true)
    };
    const handleOk = () => {
        setIsModalVisible(false)
        // TO-DO: Add path
    };
    const handleCancel = () => {
        setIsModalVisible(false)
    };

    return (
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
                <Divider orientation="center">Create New Event</Divider>

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
                        />
                    </Form.Item>
                </>}

                {props.isAuthenticated && <>
                    <Form.Item 
                        label="Invite Friends" 
                        tooltip={{
                            title: "Invite people from your friends list. You can add more friends later.",
                            icon: <InfoCircleOutlined />,
                        }}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select from Friends List"
                            style={{ width: '100%' }}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
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
                        <span className="ant-form-text">Select your availability using the calendar in "Week View", or manually select dates and time slots using "List View".</span>
                    </Form.Item>

                    {/* Availability for verified users*/}
                    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>

                        <Tab eventKey="week" title="Week View">
                            <Form.Item 
                                className={classes.dateSelect}
                                label="Select start date for availability calendar."
                                name="Calendar Start Date"
                                required
                                rules={[
                                    {
                                        validator: async () => {
                                        if (key === "week" && !startDate) {
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
                                        if (key === "week" && !schedule) {
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
                                />
                            </Form.Item>
                        </Tab>

                        <Tab eventKey="list" title="List View">
                            <Form.Item>
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
                                    <Space key={field.key} style= {{display: 'flex', alignContent: 'center'}} align="end">
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
                                        <MinusCircleOutlined onClick={() => remove(field.name)} style={{marginBottom: '32px'}}/>
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
                </>}
                    
                <Button type="primary" htmlType="submit" className={classes.formButton}>Submit</Button>
                {/* why doesn't this button have a  bottom margin */}

                <Modal title="Event created successfully!" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} centered>
                    {props.isAuthenticated && <EventTitle title={form.getFieldValue('Event Title')} newEventAuthentication={true} description={form.getFieldValue('Event Description')} location={form.getFieldValue('Location')}/>}
                    {!props.isAuthenticated && <EventTitle title={form.getFieldValue('Event Title')} day={finalDay} date={finalDate} time={finalStartTime + ' - ' + finalEndTime} description={form.getFieldValue('Event Description')} location={form.getFieldValue('Location')}></EventTitle>}
                    <CopyToClipboard text='link generated w/ event id'>
                        <Tag icon={<CopyOutlined/>}>link generated w/ event id</Tag>
                    </CopyToClipboard>
                    <div style={{height: "20px"}}></div> {/* TO-DO: figure out how to add padding */}
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
    );
};

export default NewEvent;
