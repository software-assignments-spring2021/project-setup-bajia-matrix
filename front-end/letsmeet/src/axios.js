import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://my.api.mockaroo.com'
    baseURL: 'http://localhost:4000'
});

export default instance;