import { store } from '../store';

// Gets the logged in user data from local session 
const getLoggedInUser = () => {
    return store.getState().login.user    
}

//is user is logged in
const isUserAuthenticated = () => {
    return getLoggedInUser() !== null;
}

export { getLoggedInUser, isUserAuthenticated }