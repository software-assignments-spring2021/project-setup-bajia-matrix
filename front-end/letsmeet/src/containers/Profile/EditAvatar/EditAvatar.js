import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './EditAvatar.module.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import red from '../../../assets/Avatars/redavi.png';
import blue from '../../../assets/Avatars/blueavi.png';
import green from '../../../assets/Avatars/greenavi.png';
import orange from '../../../assets/Avatars/orangeavi.png';
import purple from '../../../assets/Avatars/purpleavi.png';
import yellow from '../../../assets/Avatars/yellowavi.png';
import Spinner from '../../../components/UI/Spinner/Spinner';

const EditAvatar = (props) => {
    const [loading, setLoading] = useState(true);

    const [editAvatar, setEditAvatar] = useState({});
    useEffect(() => {
        setEditAvatar(props.location.state.profileState);
        setLoading(false);
    }, []);

    //go through all avis and remove highlighted border
    function unselectAll(parent) {
        let children1 = parent.children[1].children;
        let children2 = parent.children[2].children;
        for (let i = 0; i < children1.length; i++) {
            children1[i].children[0].style.border = 'transparent';
        }
        for (let i = 0; i < children2.length; i++) {
            children2[i].children[0].style.border = 'transparent';
        }
    }

    //change background color when an avi is hovered over 
    function highlight(e) {
        e.target.style.background = '#d2dad9';
    }

    //revert background color back to original color when avi is not hovered over
    function unhighlight(e) {
        e.target.style.background = '#dce5e2';
    }

    //apply highlighted border around avi so that user knows that avi is currently selected
    function selectAvi(e) {
        setEditAvatar(prevState => ({
            ...prevState,
            avatar: e.target.dataset.avi
        }));
        unselectAll(e.target.parentNode.parentNode.parentNode);
        e.target.style.border = '1px solid #1d38ed';
    }

    //TODO: handle updating user's avi with currently selected avi 
    function updateAvi() {
        // axios.post("/users/" + editAvatar.id + ".json?key=5942cd70", editAvatar)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
        console.log(editAvatar); //this outputs the color of the selected avatar
        props.history.push({
            pathname: "/profile",
            state: {editState: editAvatar}
        });
    }

    let editAvatarPage = <Spinner />;
    if (!loading) {
        editAvatarPage = (
        <Container fluid>
            <Row>
                <Col className="md-12">
                    <Navbar>
                        <Link to="/profile" exact>
                            <Navbar.Text>Cancel</Navbar.Text>
                        </Link>
                        
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
                <Col sm className="mt-1">
                    <img src={red} data-avi='red' className={classes.CardImg} onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi} />
                </Col>
                <Col sm className="mt-1">
                    <img src={orange} data-avi='orange' className={classes.CardImg}onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi}/>
                </Col>
                <Col sm className="mt-1">
                    <img src={yellow} data-avi='yellow' className={classes.CardImg} onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi}/>
                </Col>
            </Row>

            <Row className="text-center mt-5">
                <Col sm className="mt-1">
                    <img src={green} data-avi='green' className={classes.CardImg} onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi} />
                </Col>
                <Col sm className="mt-1">
                    <img src={blue} data-avi='blue' className={classes.CardImg}onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi}/>
                </Col>
                <Col sm className="mt-1">
                    <img src={purple} data-avi='purple' className={classes.CardImg} onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi}/>
                </Col>
            </Row>

            <Row className="justify-content-center mt-5">
                <Button size="lg" onClick={updateAvi}>Update Avatar</Button>
            </Row>
        </Container>
        )
    }

    return (
        <div>
            {editAvatarPage}
        </div>
    );
}

export default EditAvatar;