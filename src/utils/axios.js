import axios from 'axios';
import notification from '@ieremeev/notification';
import { browserHistory } from 'react-router';


const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3030',
});

instance.interceptors.response.use(null, (error) => {
    switch (error.response.status) {
        case 401:
            browserHistory.push('/login');
            break;

        default:
            notification({
                message: error.response.status + ': ' + error.message,
                type: 'negative',
                duration: 0,
            });
            break;
    }

    return Promise.reject(error);
});

export default instance;
