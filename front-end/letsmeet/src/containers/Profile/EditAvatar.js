import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './EditAvatar.module.css';

const editAvatar = () => {
    return (
        <Container fluid>
            <Row>
                <Col className="md-12">
                    <Navbar>
                        <Navbar.Text href="#home">Cancel</Navbar.Text>
                        
                        <Navbar.Collapse className="justify-content-center">
                            <Navbar.Brand>
                            <h4>Edit Avatar</h4>
                            </Navbar.Brand>
                        </Navbar.Collapse>
                    </Navbar>
                    <hr />
                </Col>
            </Row>

            <Row className="text-center">
                <Col className="md-12">

                <CardDeck>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
  </Card>
</CardDeck>
                    
                </Col>
            </Row>

            <Row>
                
            </Row>
        </Container>
    )
}

export default editAvatar;