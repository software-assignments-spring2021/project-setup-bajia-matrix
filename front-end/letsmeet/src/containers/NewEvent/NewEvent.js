import React, { useState } from 'react';
import 'antd/dist/antd.css';
import classes from '../NewEvent/NewEvent.module.css'
import { Form, Input, Button, Divider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { EnvironmentOutlined } from '@ant-design/icons';

const NewEvent = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
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
            <Form.Item name="invite" label="Invite">
                <Input placeholder="..." />
            </Form.Item>
            <Form.Item>
                <Button type="primary">Submit</Button>
            </Form.Item>
        </Form>
    </div>
  );
};

export default NewEvent;