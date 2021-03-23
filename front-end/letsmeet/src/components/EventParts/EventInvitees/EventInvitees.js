import React from "react";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./EventInvitees.module.css";

import { Form, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const EventInvitees = (props) => {
  console.log(props.friends);
  const { Option } = Select;

  let options = props.friends.map((friend, index) => (
    <Option value={friend}>{friend}</Option>
  ));

  return (
        {options}
  );
};

export default EventInvitees;
