import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my.api.mockaroo.com'
});

export default instance;