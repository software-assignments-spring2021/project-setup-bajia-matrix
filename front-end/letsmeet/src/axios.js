import axios from 'axios';

const instance = axios.create({
    // TODO: replace url with backend server url
    baseURL: 'http://localhost:4000'
});

export default instance;