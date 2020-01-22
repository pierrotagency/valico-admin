import axios from 'axios';

import { getLoggedInUser, isUserAuthenticated } from '../helpers/auth';

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
    console.log('API interceptor response error.')
    
    const originalRequest = error.config;

    if (error.response.status === 422) { // validation 
        console.log('API: 422 - Validation thing')
        
        if(error.response && error.response.data){                        
            const res = {
                code: error.response.status,
                type: 'validation',
                validations: error.response.data
            }
            return Promise.reject(res);
        }
        else{

            
            const res = {
                code: error.response.status,
                type: 'validation',
                message: 'API validation response error' 
            }
            return Promise.reject(res);
        }

    }
    else if (error.response.status === 401 && !originalRequest._retry) { // refresh token
        originalRequest._retry = true;

        console.log('API: 401 - Refreshing token')

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
    else if(error.response.status === 500){

        const res = {
            code: error.response.status,
            type: 'error',
            message: error.response.statusText,
            details: error.response.data.error ? error.response.data.error.message : error.response.data.message,
            where: error.response.data.error ? error.response.data.error.frames[0].file + '... line: ' + error.response.data.error.frames[0].line : null
        }
        return Promise.reject(res);
    }

    return Promise.reject(error);
});



const apiPost = (action, data) => {

    return api.post(action, data)
        .then(res => {
            return res.data;
        })
        .catch(err => {

            if(err.response){
                
                const { data } = err.response;

                let errDescription = '';
                if(data[0] && data[0].message) errDescription = data[0].message // pick first validation element of the backend (controller error response)
                else if(data.error) errDescription = data.error
                
                throw errDescription; // TODO check other API response taxonomies         

            }
            else{
                const defaultError = 'API POST response error' 
                throw defaultError;
            }

        });

}


const apiPut = (action, data) => {

    return api.put(action, data)
        .then(res => {
            return res.data;
        })
        .catch(err => {

            console.log(err)

            throw err

        });

}



const apiGet = (action, data) => {

    return api.get(action, {
        params: data
    })
        .then(res => {
            return res.data;
        })
        .catch(err => {

            if(err.response){
                
                const { data } = err.response;

                let errDescription = '';
                if(data[0] && data[0].message) errDescription = data[0].message // pick first validation element of the backend (controller error response)
                else if(data.error) errDescription = data.error
                
                throw errDescription; // TODO check other API response taxonomies         

            }
            else{
                const defaultError = 'API GET response error' 
                throw defaultError;
            }

        });

}


export { api, apiPost, apiGet, apiPut };