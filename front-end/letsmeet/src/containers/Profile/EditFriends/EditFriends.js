import React, { useEffect, useState } from 'react';
import classes from './EditFriends.module.css';

const EditFriends = (props) => {

    const dataList = [
        {id: 1, name: "Alexa Taylor", email: "alexa@gmail.com"},
        {id: 2, name: "Timothy Sanders", email: "timothy@gmail.com"},
        {id: 3, name: "Sam Peter", email: "sam@gmail.com"},
        {id: 4, name: "Matthew Fishman", email: "matt@gmail.com"},
        {id: 5, name: "Matthew Fishman", email: "matt2@gmail.com"},
        {id: 6, name: "Matthew Fishman", email: "matt3@gmail.com"},
        {id: 7, name: "Matt Fish", email: "mattf@gmail.com"},
        {id: 8, name: "Matt Fishman", email: "fishmanm@gmail.com"},
        {id: 9, name: "Matt Fishman", email: "fishman1@gmail.com"},
        {id: 10, name: "Matt Fishman", email: "fishmanmatt@gmail.com"},
        {id: 11, name: "Matthew Fishman", email: "matt@gmail.com"},
        {id: 12, name: "Matthew Fishman", email: "matt@gmail.com"},
        {id: 13, name: "Matthew Fishman", email: "matt@gmail.com"},
        {id: 14, name: "Matthew Fishman", email: "matt@gmail.com"},
        {id: 15, name: "Matthew Fishman", email: "matt@gmail.com"},
        {id: 16, name: "Matthew Fishman", email: "matt@gmail.com"},
        {id: 17, name: "Matthew Fishman", email: "matt@gmail.com"}
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
            <h1>Add a friend</h1>
            <p>Search for a friend by email address</p>
            <input
                placeholder="Add user by email"
                value={searchTerm}
                onChange={e => handleChange(e.target.value)}
            />
            <div>
                {data.map((d, i) => {
                    return <div key={i}>
                        <b>Name: </b>{d.name}<br />
                        <b>Email: </b>{d.email}<br />
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

export default EditFriends;