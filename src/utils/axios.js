import axios from 'axios';
import notification from '@ieremeev/notification';
// import { discardToken } from 'reducers/auth';
// import { store } from '../index';


const instance = axios.create({
    baseURL: 'http://localhost:3030',
});

instance.interceptors.response.use(null, (error) => {
    switch (error.response.status) {
        case 401:
            // store.dispatch(discardToken());
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
