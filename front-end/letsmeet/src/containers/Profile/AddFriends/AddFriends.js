import React, { useEffect, useState } from 'react';
import classes from './AddFriends.module.css';
import 'antd/dist/antd.css';
import { Input, Table } from 'antd';
import axios from '../../../axios';

const AddFriends = (props) => {
    const [data, setData] = useState()
    const [user, setUser] = useState({
        name: "",
        friends: new Array(),
        email: ""
    });

    useEffect(() => {
        axios.get(`/users/123.json?key=4ca99a60`)
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
                return Object.keys(item).some(e =>
                    excludeColumns.includes(e) ? false : item[e].toString().toLowerCase().includes(lowercaseSearch)
                )
            })
            setData(filteredData)
        }
    }

    const [isFriend, setIsFriend] = useState(false)

    function checkFriendship(e) {
        for (var friend of user.friends) {
            if(friend.email === e) {
                setIsFriend(true)
                break
            }
        }
    }

    const [buttonText, setButtonText] = useState("Add Friend")
    const changeText = (text) => setButtonText(text)

    return (        
        <div className={classes.container}>
            <div className={classes.cancelButton}>
                <a href="/profile">Cancel</a>
            </div>
            <br/>
            <br/>
            <h1 className={classes.subtitle}>Edit Friends</h1>
            <div className>
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
                                        {!isFriend &&
                                            <button size="small" type="primary" className={classes.button} onClick={() => changeText("Added")} >{buttonText}</button>
                                        }
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
                {user.friends.map(i => <div> {i.name} </div>)}
            </div>
        </div>
    )
}

export default AddFriends;