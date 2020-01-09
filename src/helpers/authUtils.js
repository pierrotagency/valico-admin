import axios from 'axios';


import {store} from '../store';

// Gets the logged in user data from local session 
const getLoggedInUser = () => {
    return store.getState().login.user
    // const user = localStorage.getItem('user');
    // if (user)
    //     return JSON.parse(user);
    // return null;
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

    const url = process.env.REACT_APP_API_URL + action;

    console.log(url)

    return axios.post(url, data).then(res => {

        console.log(res)

        if (res.status === 400 || res.status === 500)
            throw res.data;
        return res.data;
    }).catch(err => {
        throw err[1];
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


export { getLoggedInUser, isUserAuthenticated, postRegister, postLogin, postForgetPwd }