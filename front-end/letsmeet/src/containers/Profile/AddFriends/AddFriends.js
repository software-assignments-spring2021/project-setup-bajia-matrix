import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Alert, Button, Divider, Input } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

// import custom files and components
import classes from './AddFriends.module.css';
import axios from '../../../axios';

require('dotenv').config()

/*
    This component displays the Add Friends page where users
    can search for existing users and add them as friends or invite
    users without an account to try out the app.

    Props:
        This component does not accept any custom props
*/

const AddFriends = (props) => {
    
    const [data, setData] = useState() // References all the registered users
    const [user, setUser] = useState({
        name: "",
        friends: [],
        email: ""
    });

    // Get profile of current user
    useEffect(() => {
        const id = localStorage.getItem("userID");

        axios.get("/profile?userid=" + id)
            .then(response => {
                setUser(response.data);
                console.log(response.data.friends);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }, []);

    const { Search } = Input;
    const [searchTerm, setSearchTerm] = useState("")

    const [error, setError] = useState() // Error for displaying searched user
    const [disabled, setDisabled] = useState(false); // Displayed when searched user is already a friend

    /**
     * Called when searching items (onSearch)
     * @param {*} e 
     */
    const handleChange = e => {
        const lowercaseSearchTerm = e.toLowerCase()
        setButtonText("Add Friend")
        setDisabled(false)
        setIsFriend(false)
        setSearchTerm(lowercaseSearchTerm)
        validateFriend(lowercaseSearchTerm)
        checkFriendship(lowercaseSearchTerm)
    }

    // Exclude these cols when searching term
    const excludeColumns = ["id", "name"];

    /** 
     * Confirms if the search term is in valid email format and exists in the user's current friend list
     * 
     * @param {*} e searchTerm when triggered in onSearch
     */
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

    /**
     * Searches through current user's friends and sets 'setIsFriend' state to be true
     * if the searchTerm matches with e
     * 
     * @param {*} e searchTerm when triggered in onSearch
     */
    const [isFriend, setIsFriend] = useState(false)

    function checkFriendship(e) {
        // console.log("Im checking friendship with " + e)
        for (let friend of user.friends) {
            if(friend.email === e) {
                // console.log("already friends with " + e)
                setIsFriend(true)
                return
            }
        }
        // Check MongoDB to see if email is associated with a user
        if (!isFriend) {
            // console.log("Im checking Mongo for " + e)
            axios.get("/profile?findUser=true&searchEmail=" + e.trim())
                .then(response => {
                    setData(response.data)
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        }
    }

    // Add friend button
    const [buttonText, setButtonText] = useState("Add Friend")
    const changeText = (text) => setButtonText(text)

    const userFriends = user.friends.map(i => <div key={i.id}> {i.name} </div>);

    /**
     * Called when add friend button is clicked; adds new friend to the user's friend list
     * 
     * @param {*} param 
     */
    let addFriend = param => e => {
        changeText("Added")
        setDisabled(true);
        
        // Update friends list immutably
        const userCopy = { ...user };
        const friendsList = [ ...userCopy.friends ];
        
        console.log(param)
        const newFriend = {
            id: param._id,
            name: param.name,
            email: param.email
        }
        
        friendsList.push(newFriend);
        userCopy.friends = friendsList;
        setUser(userCopy);
        
        axios.post("/profile", userCopy)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            })

        // Update new friend's friends list as well
        const friendCopy = { ...param }
        const friendsFriendsList = [ ...friendCopy.friends ];

        const updateFriend = {
            id: userCopy._id,
            name: userCopy.name,
            email: userCopy.email
        }

        friendsFriendsList.push(updateFriend);
        friendCopy.friends = friendsFriendsList;
        
        axios.post("/profile", friendCopy)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }

    // Line for alert
    let description = "Would you like to invite " + searchTerm + "?"

    const [inviteText, setInviteText] = useState("Invite")
    function sendEmail() {
        // Send email
        axios.post("/profile/sendmail?searchTerm=" + searchTerm + "&name=" + user.name.split(' ')[0])
            .then(response => {
                console.log(response.data);
                setInviteText("Sent!")
            })
            .catch(error => {
                console.log(error);
            })
    }  

    return (   
        <>
            <div className={classes.Header}>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="align-self-baseline">
                        <a href="/profile">Cancel</a>
                    </div>
                    <div className="align-self-baseline">
                        <h6>Edit Friends</h6>
                    </div>
                    <div className={classes.FlexPadding}>Cancel</div>
                    {/* This is invisible text to center the header */}
                </div>
                <hr/>
            </div>
            
            <div className={classes.container}>
                <div>
                    {/* <Divider orientation="center"></Divider> */}
                    <p>Search for a user by email address</p>
                    <Search
                        name="search"
                        placeholder="Add user by email"
                        onSearch={handleChange}
                        enterButton
                        allowClear
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
                                                <button size="small" type="primary" className={classes.addButton} disabled={disabled} onClick={addFriend(d)}>{buttonText}</button>
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
                                        <Button size="small" danger className={classes.inviteButton} onClick={sendEmail}>
                                          {inviteText}
                                        </Button>
                                    }
                                />
                            </>}
                        </div>
                    }
                </div>
                <br/>
                <Divider orientation="center">Current Friends List</Divider>
                <div className={classes.friendsList}>
                    {userFriends}
                </div>
            </div>
        </>
    )
}

export default AddFriends;