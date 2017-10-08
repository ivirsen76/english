import axios from 'axios'
import notification from '@ieremeev/notification'
import { history } from '../store/configureStore'

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3030',
})

instance.interceptors.response.use(null, error => {
    switch (error.response.status) {
        case 401:
            if (!/auth\/local$/.test(error.response.config.url)) {
                history.push('/login')
            }
            break

        default:
            notification({
                message: error.response.status + ': ' + error.message,
                type: 'negative',
                duration: 0,
            })
            break
    }

    return Promise.reject(error)
})

export default instance
