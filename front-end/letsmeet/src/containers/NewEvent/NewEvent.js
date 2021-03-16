import React, { useState } from 'react';
import 'antd/dist/antd.css';
import classes from '../NewEvent/NewEvent.module.css'
import { Form, Input, Button, Divider, DatePicker, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { EnvironmentOutlined } from '@ant-design/icons';
import ScheduleSelector  from 'react-schedule-selector';

const NewEvent = () => {

    // temporary until authentication is implemented
    const [state, setState] = useState({
        isAuthenticated: true
    });

    // Form
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('*');

    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    // date selction related
    const [startDate, setDate] = useState("01/01");
    const dateFormat = "MM/DD";

    function onChange(date, dateString) {
        setDate(dateString)
        console.log(date, dateString);
    }

    const { Option } = Select;

    if (state.isAuthenticated) {
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
                            title: "Write the event details here. This can be changed later.",
                            icon: <InfoCircleOutlined />,
                        }}
                    >
                        <Input.TextArea autoSize maxLength={300} showCount={true}/>
                    </Form.Item>

                    <Form.Item 
                        label="Location"
                        tooltip={{
                            title: "Where is your event being held? This can be changed later.",
                            icon: <InfoCircleOutlined />,
                        }}
                    >
                        <Input
                        prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                        placeholder="Add event location"
                        />
                    </Form.Item>

                    <Form.Item label="Invite Friends">
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Search friends list"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Form.Item>
                    

                    <Divider orientation="center" className="first">Availability</Divider>

                    <DatePicker format={dateFormat} onChange={onChange}/><br/>

                    <ScheduleSelector
                        hourlyChunks={1}
                        startDate={startDate}
                    />

                    <Form.Item wrapperCol={{ span: 12, offset: 11 }}>
                        <Button type="primary" className={classes.formButton}>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    };
};
export default NewEvent;