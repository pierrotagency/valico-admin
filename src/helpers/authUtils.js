import axios from 'axios';


import {store} from '../store';


import { api } from '../services/api';


// Gets the logged in user data from local session 
const getLoggedInUser = () => {
    return store.getState().login.user    
}

//is user is logged in
const isUserAuthenticated = () => {
    return getLoggedInUser() !== null;
}

// Register Method
const postRegister = (url, data) => {
    return axios.post(url, data).then(response => {
        if (response.status >= 200 || response.status <= 299)
            return response.data;
        throw response.data;
    }).catch(err => {
        var message;
        if (err.response && err.response.status ) {
            switch (err.response.status) {
                case 404: message = "Sorry! the page you are looking for could not be found"; break;
                case 500: message = "Sorry! something went wrong, please contact our support team"; break;
                case 401: message = "Invalid credentials"; break;
                default: message = err[1]; break;
            }
        }
        throw message;
    });

}

// Login Method
const postLogin = (action, data) => {

    return api.post(action, data)
        .then(res => {
            return res.data;
        })
        .catch(err => {

            if(err.response){
                
                const { data } = err.response;

                let errDescription = '';
                if(data[0] && data[0].message) errDescription = data[0].message
                else if(data.error) errDescription = data.error
                
                throw errDescription; // TODO check other API response taxonomies         

            }
            else{
                const defaultError = 'API response error' 
                throw defaultError;
            }

        });

}



// MMMMM REDUNDANCIA
// Info Method
const requestGetUserInfo = (action, data) => {

    return api.get(action, data)
        .then(res => {

            console.log(res)

            // TODO it shoulnt arrive here because of the try catch
            // if (res.status === 400 || res.status === 500){
            //     throw res.data;
            // }
                
            return res.data;
        })
        .catch(err => {

            const { status, data } = err.response;

            console.log(status)
            console.log(data)
        
            let errDescription = '';
            if(data[0] && data[0].message) errDescription = data[0].message
            else if(data.error) errDescription = data.error
            
            throw errDescription; // TODO check other API response taxonomies         
        });

}



// postForgetPwd 
const postForgetPwd = (url, data) => {
    return axios.post(url, data).then(res => {
        if (res.status === 400 || res.status === 500)
            throw res.data;
        return res.data;
    }).catch(err => {
        throw err[1];
    });
}


export { getLoggedInUser, isUserAuthenticated, postRegister, postLogin, postForgetPwd, requestGetUserInfo }