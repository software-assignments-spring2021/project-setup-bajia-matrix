import React, { useState } from 'react';
import classes from './AddFriends.module.css';
import 'antd/dist/antd.css';
import { Alert, Button} from 'antd';

const AddFriends = (props) => {

    const dataList = [
        {id: 1, name: "Alexa Taylor", email: "alexa@gmail.com", friend: "false"},
        {id: 2, name: "Timothy Sanders", email: "timothy@gmail.com", friend: "true"},
        {id: 3, name: "Sam Peter", email: "sam@gmail.com", friend: "false"},
        {id: 4, name: "Matthew Fishman", email: "matt@gmail.com", friend: "false"},
        {id: 5, name: "Matthew Fishman", email: "matt2@gmail.com", friend: "false"},
        {id: 6, name: "Matthew Fishman", email: "matt3@gmail.com", friend: "false"},
        {id: 7, name: "Matt Fish", email: "mattf@gmail.com", friend: "false"},
        {id: 8, name: "Matt Fishman", email: "fishmanm@gmail.com", friend: "false"},
        {id: 9, name: "Matt Fishman", email: "fishman1@gmail.com", friend: "true"},
        {id: 10, name: "Matt Fishman", email: "fishmanmatt@gmail.com", friend: "true"}
    ]

    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState(dataList)

    // Exclude these cols when searching term
    const excludeColumns = ["id", "name"];

    const handleChange = e => {
        setSearchTerm(e)
        filterData(e)
    }

    const filterData = (e) => {
        const lowercaseSearch = e.toLowerCase().trim()
        if(lowercaseSearch === "") {
            setData(dataList)
        } else {
            const filteredData = dataList.filter(item => {
                return Object.keys(item).some(key =>
                    excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercaseSearch)
                )
            })
            setData(filteredData)
        }
    }
    
    return (        
        <div className={classes.container}>
            <h1>Add friends</h1>
            <p>Search for a friend by email address</p>
            <input
                placeholder="Add user by email"
                value={searchTerm}
                onChange={e => handleChange(e.target.value)}
            />
            <div>
                {data.map((d, i) => {
                    return <div key={i} className={classes.nameDisplay}>
                        {d.name}<br/> <Button size="small" type="primary" className={classes.button}>add</Button>
                        <div>{d.email}</div>
                        <br/>
                    </div>
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
        </div>
    )
}

export default AddFriends;