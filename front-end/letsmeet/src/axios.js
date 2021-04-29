import axios from 'axios';

const instance = axios.create({
    // TODO: replace url with backend server url
    baseURL: process.env.REACT_CLIENT_BASE_URL
});

export default instance;