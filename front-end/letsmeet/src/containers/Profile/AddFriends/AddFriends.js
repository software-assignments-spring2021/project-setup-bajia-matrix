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
    
    const [data, setData] = useState()
    const [user, setUser] = useState({
        name: "",
        friends: [],
        email: ""
    });

    // Get profile of current user
    useEffect(() => {
        // TODO: change user id to currently logged in user
        const id = "6071f92b7278a8a7c6d70217";
        axios.get("/profile?userid=" + id)
            .then(response => {
                setUser(response.data);
                console.log(response.data.friends);
            })
            .catch(error => {
                console.log(error);
            })
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
            setError("Please enter valid email address!")
        } else {
            setError()
        }
        if(lowercaseSearch === "") {
            setData()
        } else {
            const filteredData = user.friends.filter(item => {
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
                return
            }
        }
        // Check MongoDB to see if email is associated with a user
        if (!isFriend) {
            axios.get("/profile?findUser=true&searchEmail=" + e.toLowerCase().trim())
                .then(response => {
                    setData(response.data)
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const [buttonText, setButtonText] = useState("Add Friend")
    const changeText = (text) => setButtonText(text)

    let addFriend = param => e => {
        changeText("Added")
        user.friends.push(param)

        axios.post("/profile", user)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            })
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
                        <p className={classes.errorMessage}>{error}</p>
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
                                        <Button size="small" danger className={classes.inviteButton}>
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