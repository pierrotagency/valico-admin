import { combineReducers  } from 'redux';

// Front
import layoutReducer from './layout/reducer';

// Authentication Module
import accountReducer from './auth/register/reducer';
import loginReducer from './auth/login/reducer';
import forgetReducer from './auth/forgetpwd/reducer';

import postReducer from './post/reducer';
import tagReducer from './tag/reducer';

import { StorePostState } from './post/types';

export interface AppState {
    layout: any,
    account: any,
    login: any,
    forget: any,
    post: StorePostState,
    tag: any
}

// const rootReducer = combineReducers({
//     layout: layoutReducer,
//     account: accountReducer,
//     login: loginReducer,
//     forget: forgetReducer,
//     post: postReducer,
//     tag: tagReducer
// });


// export default rootReducer;
// export type RootState = StoreState<typeof rootReducer>

export const reducers = combineReducers<AppState>({
    layout: layoutReducer,
    account: accountReducer,
    login: loginReducer,
    forget: forgetReducer,
    post: postReducer,
    tag: tagReducer
  });