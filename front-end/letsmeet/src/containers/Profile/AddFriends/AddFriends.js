import React, { useState } from 'react';
import classes from './AddFriends.module.css';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import avi from '../../../assets/Avatars/redavi.png';

const AddFriends = (props) => {

    const dataList = [
        {
            "id": 1, 
            "name": "Alexa Taylor", 
            "email": "alexa@gmail.com", 
            "avatar": {avi}, 
            "friends": [
                {
                "id": 2,
                "name": "Timothy Sanders",
                "email": "timothy@gmail.com"
                }
            ]
        },
        {"id": 2, "name": "Timothy Sanders", "email": "timothy@gmail.com",
            "friends": [
                {
                    "id": 1,
                    "name": "Alexa Taylor",
                    "email": "alexa@gmail.com"
                },
                {
                    "id": 11,
                    "name": "Test", 
                    "email": "me@gmail.com", 
                }
            ]
        },
        {
            "id": 3, 
            "name": "Sam Peter", 
            "email": "sam@gmail.com", 
            "friend": [
                {
                    "id": 11,
                    "name": "Test", 
                    "email": "me@gmail.com", 
                }
            ]
        },
        {"id": 4, "name": "Matthew Fishman", "email": "matt@gmail.com"},
        {id: 5, name: "Matthew Fishman", email: "matt2@gmail.com"},
        {id: 6, name: "Matthew Fishman", email: "matt3@gmail.com"},
        {id: 7, name: "Matt Fish", email: "mattf@gmail.com"},
        {id: 8, name: "Matt Fishman", email: "fishmanm@gmail.com"},
        {id: 9, name: "Matt Fishman", email: "fishman1@gmail.com"},
        {id: 10, name: "Matt Fishman", email: "fishmanmatt@gmail.com"}
    ]

    const { Search } = Input;

    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState(dataList) // change to props.users

    const me = [
        { 
            "id": 11, 
            "name": "Test", 
            "email": "me@gmail.com", 
            "avatar": {avi}, 
            "friends": [
                {
                    "id": 2,
                    "name": "Timothy Sanders",
                    "email": "timothy@gmail.com"
                },
                {
                    "id": 3,
                    "name": "Sam Peters",
                    "email": "sam@gmail.com"
                }
            ]
        }
    ]

    const handleChange = e => {
        setSearchTerm(e)
        validateFriend(e)
        checkFriendship(e)
    }

    const [error, setError] = useState()

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
            const filteredData = dataList.filter(item => {
                return Object.keys(item).some(e =>
                    excludeColumns.includes(e) ? false : item[e].toString().toLowerCase().includes(lowercaseSearch)
                )
            })
            setData(filteredData)
        }
    }

    const [isFriend, setIsFriend] = useState(false)

    function checkFriendship(e) {
        for (var friend of me[0].friends) {
            if(friend.email === e) {
                setIsFriend(true)
                break
            }
        }
    }

    return (        
        <div className={classes.container}>
            <h1 className={classes.subtitle}>Edit Friends</h1>
            <div className={classes.addFriend}>
                <h5>Add Friend</h5>
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
                                        <div>{d.email}</div>
                                        <br/>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="clearboth"></div>
                        {data.length === 0 && 
                            <span> 
                                No user with the email provided was found. <br/> 
                                Would you like to invite a friend? <br/> 
                                <button>Invite</button>
                            </span>
                        }
                    </div>
                }
            </div>
            <div className={classes.friendsList}>
                <h5>Friends List</h5>
            </div>
        </div>
    )
}

export default AddFriends;