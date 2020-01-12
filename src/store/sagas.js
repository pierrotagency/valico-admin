import { all } from 'redux-saga/effects'

//public
import accountSaga from './auth/register/saga';
import loginSaga from './auth/login/saga';
import forgetSaga from './auth/forgetpwd/saga';

import postSaga from './post/saga';

export default function* rootSaga() {
    yield all([
        
        //public
        accountSaga(),
        loginSaga(),
        forgetSaga(),

        postSaga()
    ])
}