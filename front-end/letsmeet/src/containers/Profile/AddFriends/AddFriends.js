import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Alert, Button, Divider, Input } from 'antd';

import classes from './AddFriends.module.css';
import axios from '../../../axios';

/*
    TODO: comment about component

    Props:
        This component does not accept any custom props
*/

const AddFriends = (props) => {

    // uncomment this for hardcoded data for all users to test add functionality
    // const dataList = [
    //     {
    //         "id": 1, 
    //         "name": "Alexa Taylor", 
    //         "email": "alexa@gmail.com", 
    //         "friends": [
    //             {
    //             "id": 2,
    //             "name": "Timothy Sanders",
    //             "email": "timothy@gmail.com"
    //             }
    //         ]
    //     },
    //     {"id": 2, "name": "Timothy Sanders", "email": "timothy@gmail.com",
    //         "friends": [
    //             {
    //                 "id": 1,
    //                 "name": "Alexa Taylor",
    //                 "email": "alexa@gmail.com"
    //             },
    //             {
    //                 "id": 11,
    //                 "name": "Test", 
    //                 "email": "me@gmail.com", 
    //             }
    //         ]
    //     },
    //     {
    //         "id": 3, 
    //         "name": "Sam Peter", 
    //         "email": "sam@gmail.com", 
    //         "friend": [
    //             {
    //                 "id": 11,
    //                 "name": "Test", 
    //                 "email": "me@gmail.com", 
    //             }
    //         ]
    //     },
    //     {"id": 4, "name": "Matthew Fishman", "email": "matt@gmail.com"},
    //     {id: 5, name: "Matthew Fishman", email: "matt2@gmail.com"},
    //     {id: 6, name: "Matthew Fishman", email: "matt3@gmail.com"},
    //     {id: 7, name: "Matt Fish", email: "mattf@gmail.com"},
    //     {id: 8, name: "Matt Fishman", email: "fishmanm@gmail.com"},
    //     {id: 9, name: "Matt Fishman", email: "fishman1@gmail.com"},
    //     {id: 10, name: "Matt Fishman", email: "fishmanmatt@gmail.com"}
    // ]


    const [data, setData] = useState()
    // const [data, setData] = useState(dataList) // uncomment this for hard coded data for all users
    const [user, setUser] = useState({
        name: "",
        friends: [],
        email: ""
    });

    useEffect(() => {
        setUser(props.location.state.friendState);
        console.log(props.location.state.friendState);
        /*
        axios.get('/profile')
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setUser(prevState => ({
                    ...prevState,
                    name: response.data.name,
                    friends: response.data.friends,
                    email: response.data.email
                }));
            })
            .catch((error) => {
                console.log(error);
            });
        */
    }, []);

    const { Search } = Input;
    const [searchTerm, setSearchTerm] = useState("")
    const [error, setError] = useState()

    const handleChange = e => {
        setSearchTerm(e)
        validateFriend(e)
        checkFriendship(e)
    }

    // Exclude these cols when searching term
    const excludeColumns = ["id", "name"];

    const validateFriend = (e) => {
        const lowercaseSearch = e.toLowerCase().trim()
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(e)) {
            setError("Please enter valid email address")
        } else {
            setError()
        }
        if(lowercaseSearch === "") {
            setData()
        } else {
            const filteredData = user.friends.filter(item => {
            // const filteredData = dataList.filter(item => { // uncomment for harded data; searches through hardcoded data of users
                return Object.keys(item).some(e =>
                    excludeColumns.includes(e) ? false : item[e].toString().toLowerCase().includes(lowercaseSearch)
                )
            })
            setData(filteredData)
        }
    }

    const [isFriend, setIsFriend] = useState(false)

    function checkFriendship(e) {
        for (let friend of user.friends) {
            if(friend.email === e) {
                setIsFriend(true)
                break
            }
        }
    }

    const [buttonText, setButtonText] = useState("Add Friend")
    const changeText = (text) => setButtonText(text)

    let addFriend = param => e => { // param is the argument you passed to the function; e is the event object that returned
        changeText("Added")
        user.friends.push(param)
        // setUser(prevState => ({
        //     ...prevState,
        //     friends: 
        // }))
        // axios.post("/profile", setUser)
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     });
        // console.log(setUser)
        // props.history.push({
        //     pathname: "/profile",
        //     state: {editState: setUser}
        // });
    }

    // Line for alert
    let description = "Would you like to invite " + searchTerm + "?"

    return (   
        <>
            <div className={classes.subheader}>
                    <center><h6>Edit Friends</h6></center>
                    <div className={classes.cancelButton}>
                        <a href="/profile">Cancel</a>
                    </div>
            </div>     
            <div className={classes.container}>
                <div className>
                    <Divider orientation="center">Add Friends</Divider>
                    <p>Search for a user by email address</p>
                    <Search
                        name="search"
                        placeholder="Add user by email"
                        onSearch={handleChange}
                        enterButton
                    />
                    {(searchTerm && error) &&
                        <p className={classes.errorMessage}>Enter a valid email address!</p>
                    }
                    {(searchTerm && !error) &&
                        <div>
                            {data.map((d, i) => {
                                return (
                                    <div key={i} className={classes.nameContainer}>
                                        <div className={classes.nameDisplay}> {d.name} <br/>
                                            {!isFriend &&
                                                <button size="small" type="primary" className={classes.addButton} onClick={addFriend(d)}>{buttonText}</button>
                                            }
                                            <div>{d.email}</div>
                                            <br/>                      
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="clearboth"></div>
                            {data.length === 0 && <>
                                <Alert
                                    message="Sorry, no user found."
                                    description={description}
                                    type="error"
                                    action={
                                        <Button size="small" danger>
                                          Invite
                                        </Button>
                                    }
                                />
                            </>}
                        </div>
                    }
                </div>
                <br />
                <Divider orientation="center">Current Friends List</Divider>
                <div className={classes.friendsList}>
                    {user.friends.map(i => <div> {i.name} </div>)}
                </div>
            </div>
        </>
    )
}

export default AddFriends;