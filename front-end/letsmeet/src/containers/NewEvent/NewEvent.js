import React, { useState } from 'react';
import 'antd/dist/antd.css';
import classes from '../NewEvent/NewEvent.module.css'
import { Form, Input, Button, Divider, DatePicker, TimePicker, Select } from 'antd';
import { InfoCircleOutlined, SecurityScanTwoTone } from '@ant-design/icons';
import { EnvironmentOutlined } from '@ant-design/icons';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
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
    const [disabled, setDisabled] = useState(false);

    function onChange(date, dateString) {
        setDate(dateString)
        console.log(date, dateString);
    }

    const [key, setKey] = useState('weekly');

    console.log("selected dates", selectedDates);

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
            >
                <Divider orientation="center" className="first">Create New Event</Divider>

                <Form.Item 
                    label="Event Title" 
                    required tooltip={{
                        title: "This is a required field.", 
                        icon: <InfoCircleOutlined />,
                    }}
                >
                    <Input.TextArea placeholder="ex. Birthday Party" autoSize maxLength={50} showCount={true}/>
                </Form.Item>

                <Form.Item
                    label="Event Description"
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
                            label="Select start date for availability calendar:">
                                <DatePicker format={dateFormat} onChange={onChange}/>
                            </Form.Item>
                            <ScheduleSelector
                                hourlyChunks={1}
                                startDate={startDate}
                            />
                        </Tab>
                        <Tab eventKey="month" title="Month">
                            <SelectCalendar
                                selectedDates={selectedDates}
                                setSelectedDates={setSelectedDates}
                            />
                        </Tab>
                    </Tabs>
                </>}
                    
                <Button type="primary" htmlType="submit" className={classes.formButton}>Submit</Button>

            </Form>
        </div>
    );
};

export default NewEvent;