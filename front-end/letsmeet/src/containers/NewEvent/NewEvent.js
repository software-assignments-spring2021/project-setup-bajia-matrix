import React, { useState } from 'react';
import 'antd/dist/antd.css';
import classes from '../NewEvent/NewEvent.module.css'
import { Alert, Button, DatePicker, Divider, Form, Input, Modal, Select, TimePicker, Tag} from 'antd';
import { CopyOutlined, EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Row, Col, Tab, Tabs } from 'react-bootstrap'
import ScheduleSelector  from 'react-schedule-selector';
import SelectCalendar from './SelectCalendar';

const NewEvent = (props) => {

    // Variables for the form
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('*');

    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    // Used to select friends
    const { Option } = Select;

    // Used to select date on availability calendar
    const [startDate, setDate] = useState(Date());
    const dateFormat = "MM/DD"
    const [selectedDates, setSelectedDates] = useState([]);
    const [schedule, setSchedule] = useState();

    function onChange(date, dateString) {
        setDate(dateString)
    }

    function handleChangeSchedule(e) {
        setSchedule(e)
    }

    function getSelectedDates(schedule) {
        // TO-DO: isolate the dates selected to display in the modal
        console.log(schedule)
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    // Used for tab display
    const [key, setKey] = useState('weekly');

    // Event pop-up after pressing submit
    const [isModalVisible, setIsModalVisible] = useState(false);
    const copy = require('clipboard-copy')

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        // TO-DO: Add path
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
            >
                <Divider orientation="center" className="first">Create New Event</Divider>

                <Form.Item 
                    label="Event Title" 
                    name="Event Title"
                    required tooltip={{
                        title: "This is a required field.", 
                        icon: <InfoCircleOutlined />,
                    }}
                    rules={[{required:true}]}
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
                >
                    <Input.TextArea autoSize maxLength={300} showCount={true} placeholder="Write event details here"/>
                </Form.Item>

                <Form.Item 
                    label="Location"
                    required tooltip={{
                        title: "Where is your event being held?",
                        icon: <InfoCircleOutlined />,
                    }}
                >
                    <Input
                    prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                    placeholder="Add event location"
                    />
                </Form.Item>

                {!props.isAuthenticated && <>
                    <Form.Item
                        label="Date & Time"
                        required tooltip={{
                            title: "When is your event being held?",
                            icon: <InfoCircleOutlined />,
                        }}
                    >
                        <DatePicker onChange={onChange} format="MM/DD/YYYY"/>
                        <TimePicker.RangePicker format="h:mm A" use12Hours/>
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

                    <Divider orientation="center" className="first">Availability</Divider>

                    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab eventKey="weekly" title="Weekly">
                            <Form.Item className={classes.dateSelect}
                            label="Select start date for availability calendar">
                                <DatePicker format={dateFormat} onChange={onChange}/>
                            </Form.Item>
                            <ScheduleSelector
                                hourlyChunks={1}
                                startDate={startDate}
                                onChange={handleChangeSchedule}
                                selectedColor={"#3D41D8"}
                                selection={schedule}
                            />
                        </Tab>
                        <Tab eventKey="month" title="Month">
                            <Row>
                            <Col>
                                <SelectCalendar
                                    selectedDates={selectedDates}
                                    setSelectedDates={setSelectedDates}
                                />
                            </Col>
                            <Col>
                                <TimePicker.RangePicker format="h:mm A" use12Hours/>
                            </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </>}
                    
                <Button type="primary" htmlType="submit" className={classes.formButton} onClick={showModal}>Submit</Button>
                <Modal title="Event successfully created!" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} centered>
                    <h2>{form.getFieldValue('Event Title')}</h2>
                    <p>Event Date: {getSelectedDates(schedule)}</p>
                    <Tag icon={<CopyOutlined/>} onClick={copy({})}>link to be copied</Tag>
                    <div style={{height: "20px"}}></div> {/* TO-DO: figure out how to add padding */}
                    <Alert
                    message="Want to unlock all features? Create an account now!"
                    type="info"
                    showIcon
                    action={<Button size="small" type="primary">Go</Button>} {/* TO-DO: update altogether to add path */}
                    />
                </Modal>
            </Form>
        </div>
    );
};

export default NewEvent;