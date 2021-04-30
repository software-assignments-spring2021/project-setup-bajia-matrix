import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
    // baseURL: "http://localhost:4000"
});

console.log(process.env)

export default instance;