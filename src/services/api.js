import axios from 'axios';

import { getLoggedInUser, isUserAuthenticated } from '../helpers/authUtils';

import {store} from '../store';
import { refreshToken } from '../store/actions';


const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


api.interceptors.request.use(config => {
    
    if(isUserAuthenticated()){            
        config.headers['Authorization'] = 'Bearer ' + getLoggedInUser().token;            
    }

    return config;
},
error => {        
    return Promise.reject(error);
});


api.interceptors.response.use((response) => {
    return response
}, 
error => {
    console.log('Axios interceptor response error: ', error)
    
    const originalRequest = error.config;


    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        return axios.post('/auth/token/refresh',
        {
            "refresh_token": getLoggedInUser().refreshToken
        })
        .then(res => {
            if (res.status === 201) {

                // save new token and refres token
                store.dispatch(refreshToken(res.data.token,res.data.refreshToken))

                // change authorization header with the new retrieved token
                const token = res.data.token;
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                // return originalRequest object with Axios.
                return axios(originalRequest);
            }
        })
        
    }

    return Promise.reject(error);
});



export { api };