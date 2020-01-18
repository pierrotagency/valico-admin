import { combineReducers  } from 'redux';

// Front
import layoutReducer from './layout/reducer';

// Authentication Module
import accountReducer from './auth/register/reducer';
import loginReducer from './auth/login/reducer';
import forgetReducer from './auth/forgetpwd/reducer';

import postReducer from './post/reducer';
import tagReducer from './tag/reducer';


const rootReducer = combineReducers({
    layout: layoutReducer,
    account: accountReducer,
    login: loginReducer,
    forget: forgetReducer,
    post: postReducer,
    tag: tagReducer
});


export default rootReducer;