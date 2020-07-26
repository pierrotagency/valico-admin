import { store } from '../store';

// Gets the logged in user data from local session 
const getLoggedInUser = () => {
    console.log(store.getState());
    return store.getState().login.user    
}

//is user is logged in
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    return user !== null && typeof user !== "undefined"
}

export { getLoggedInUser, isUserAuthenticated }