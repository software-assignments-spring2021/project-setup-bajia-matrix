import React, { useState } from 'react';
import 'antd/dist/antd.css';
import classes from '../NewEvent/NewEvent.module.css'
import { Form, Input, Button, Divider, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { EnvironmentOutlined } from '@ant-design/icons';
import ScheduleSelector  from 'react-schedule-selector';

const NewEvent = (props) => {
    // Form
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');

    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    // Date selction related
    const [startDate, setDate] = useState("01/01");
    const dateFormat = "MM/DD";

    function onChange(date, dateString) {
        setDate(dateString)
        console.log(date, dateString);
    }

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
                <Divider orientation="left" className="first">Create New Event</Divider>
                <Form.Item label="Event Title" required tooltip="This is a required field">
                    <Input placeholder="ex. birthday party" />
                </Form.Item>
                <Form.Item
                    label="Event Description"
                    tooltip={{
                    title: 'Write the event details here',
                    icon: <InfoCircleOutlined />,
                    }}
                >
                    <Input.TextArea autoSize />
                </Form.Item>
                <Form.Item name="location" label="Location">
                    <Input
                    prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                    placeholder="Add a place"
                    />
                </Form.Item>
                {props.isAuthenticated && <>
                <Form.Item name="invite" label="Invite">
                    <Input placeholder="..." />
                </Form.Item>
                <Divider orientation="left" className="first">Availability</Divider>
                <DatePicker format={dateFormat} onChange={onChange}/><br/>
                <ScheduleSelector
                    hourlyChunks={1}
                    startDate={startDate}
                    dateFormat={'ddd'}
                />
                <Form.Item wrapperCol={{ span: 12, offset: 11 }}>
                    <Button type="primary" className={classes.formButton}>Submit</Button>
                </Form.Item>
                </>}
            </Form>
        </div>
    );
};
export default NewEvent;