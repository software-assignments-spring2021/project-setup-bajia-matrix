import React, { useState } from 'react';
import classes from './AddFriends.module.css';
import 'antd/dist/antd.css';
import { Button, Input, Space } from 'antd';
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
                }
            ]
        },
        {"id": 3, "name": "Sam Peter", "email": "sam@gmail.com", "friend": "false"},
        {"id": 4, "name": "Matthew Fishman", "email": "matt@gmail.com", "friend": "false"},
        {id: 5, name: "Matthew Fishman", email: "matt2@gmail.com", friend: "false"},
        {id: 6, name: "Matthew Fishman", email: "matt3@gmail.com", friend: "false"},
        {id: 7, name: "Matt Fish", email: "mattf@gmail.com", friend: "false"},
        {id: 8, name: "Matt Fishman", email: "fishmanm@gmail.com", friend: "false"},
        {id: 9, name: "Matt Fishman", email: "fishman1@gmail.com", friend: "true"},
        {id: 10, name: "Matt Fishman", email: "fishmanmatt@gmail.com", friend: "true"}
    ]

    const { Search } = Input;

    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState(dataList) // change to props.users

    // Exclude these cols when searching term
    const excludeColumns = ["id", "name"];

    const columns = [
        {
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a>Add</a>
              <a>Delete</a>
            </Space>
          ),
        },
    ];
      
    const handleChange = e => {
        setSearchTerm(e)
        validateFriend(e)
        checkFriendship()
    }

    const [error, setError] = useState()

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
    let isFriend = false;
    function checkFriendship() {
        // if the search term is already a friend's email don't display add button: return false
        console.log(searchTerm)
        for (var friend in me[0].friends) {
            console.log(friend.email)           
        }
        me[0].friends.filter(item => {
            return Object.keys(item).some(searchTerm =>
                excludeColumns.includes(searchTerm) ? isFriend = true : isFriend = false
            )
        })
        console.log(isFriend)
    }

    return (        
        <div className={classes.container}>
            <h1>Add friends</h1>
            <p>Search for a friend by email address</p>
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
                            <div key={i} className={classes.nameDisplay}>
                                {d.name} <br/> 
                                {!isFriend && 
                                    <Button size="small" type="primary" className={classes.button}>add</Button>
                                }
                                <div>{d.email}</div>
                                <br/>
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
    )
}

export default AddFriends;