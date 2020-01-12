import { combineReducers  } from 'redux';

// Front
import layout from './layout/reducer';

// Authentication Module
import account from './auth/register/reducer';
import login from './auth/login/reducer';
import forget from './auth/forgetpwd/reducer';

import post from './post/reducer';

const rootReducer = combineReducers({
    layout,
    account,
    login,
    forget,
    post
});

export default rootReducer;