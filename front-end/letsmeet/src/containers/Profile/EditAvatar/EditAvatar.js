import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// import custom files and components
import classes from './EditAvatar.module.css';
import axios from '../../../axios';
import red from '../../../assets/Avatars/redavi.png';
import blue from '../../../assets/Avatars/blueavi.png';
import green from '../../../assets/Avatars/greenavi.png';
import orange from '../../../assets/Avatars/orangeavi.png';
import purple from '../../../assets/Avatars/purpleavi.png';
import yellow from '../../../assets/Avatars/yellowavi.png';

/*
    This component renders the Edit Avatar page so that a user can update their avatar.

    Props:
        This component does not accept any custom props
*/

const EditAvatar = (props) => {
    const [editAvatarState, setEditAvatarState] = useState({});

    useEffect(() => {
        setEditAvatarState(props.location.state.profileState);
    }, [props.location.state.profileState]);

    // go through all avis and remove highlighted border
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

    // change background color when an avi is hovered over 
    function highlight(e) {
        e.target.style.background = '#d2dad9';
    }

    // revert background color back to original color when avi is not hovered over
    function unhighlight(e) {
        e.target.style.background = '#dce5e2';
    }

    // apply highlighted border around avi so that user knows that avi is currently selected
    function selectAvi(e) {
        setEditAvatarState(prevState => ({
            ...prevState,
            avatar: e.target.dataset.avi
        }));
        unselectAll(e.target.parentNode.parentNode.parentNode);
        e.target.style.border = '1px solid #1d38ed';
    }

    function updateAvi() {
        axios.post("/profile", editAvatarState)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });

        props.history.push({
            pathname: "/profile",
            state: {editProfileState: editAvatarState}
        });
    }

    // render
    const editAvatarPage = (
        <Container fluid>
            <Row>
                <Col className={classes.Header}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="align-self-baseline">
                            <a href="/profile">Cancel</a>
                        </div>
                        <div className="align-self-baseline">
                            <h6>Edit Avatar</h6>
                        </div>
                        <div className={classes.FlexPadding}>Cancel</div>
                        {/* This is invisible text to center the header */}
                    </div>
                    <hr />
                </Col>
            </Row>

            <Row className="text-center">
                <Col sm className="mt-1">
                    <img src={red} alt="avatar" data-avi='red' className={classes.CardImg} onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi} />
                </Col>
                <Col sm className="mt-1">
                    <img src={orange} alt="avatar" data-avi='orange' className={classes.CardImg}onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi}/>
                </Col>
                <Col sm className="mt-1">
                    <img src={yellow} alt="avatar" data-avi='yellow' className={classes.CardImg} onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi}/>
                </Col>
            </Row>

            <Row className="text-center">
                <Col sm className="mt-1">
                    <img src={green} alt="avatar" data-avi='green' className={classes.CardImg} onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi} />
                </Col>
                <Col sm className="mt-1">
                    <img src={blue} alt="avatar" data-avi='blue' className={classes.CardImg}onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi}/>
                </Col>
                <Col sm className="mt-1">
                    <img src={purple} alt="avatar" data-avi='purple' className={classes.CardImg} onMouseEnter={highlight} onMouseLeave={unhighlight} onClick={selectAvi}/>
                </Col>
            </Row>

            <Row className="justify-content-center mt-5">
                <Button size="lg" onClick={updateAvi}>Update Avatar</Button>
            </Row>
        </Container>
    );
    
    return (
        <div>
            {editAvatarPage}
        </div>
    );
}

export default EditAvatar;