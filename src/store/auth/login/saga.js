import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import { CHECK_LOGIN, GET_USER_INFO } from './actionTypes';
import {  apiLoginError, loginUserSuccessful, getUserInfoOk, getUserInfoError } from './actions';
import { apiGet, apiPost } from '../../../services/api';


function* loginUser({ payload: { email, password, history } }) {
    try {
        const response = yield call(apiPost, '/auth/login', {email: email, password: password});           
        yield put(loginUserSuccessful(response));
        history.push('/dashboard');
    } catch (error) {      
        
        console.log(error)
        yield put(apiLoginError(error));
    }
}

function* getUserInfo() {
    try {
        const response = yield call(apiGet, '/user/me', {});           
        yield put(getUserInfoOk(response));        
    } catch (error) {
        console.log(error)
        yield put(getUserInfoError(error));
    }
}


export function* watchUserLogin() {
    yield takeEvery(CHECK_LOGIN, loginUser)
}

export function* watchGetUserInfo() {
    yield takeEvery(GET_USER_INFO, getUserInfo)
}

export default function* loginSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchGetUserInfo)
    ]);
}

// export default function* loginSaga() {
//     yield takeEvery(CHECK_LOGIN, loginUser);
//     yield takeEvery(GET_USER_INFO, getUserInfo);    
// }

// export default function* loginSaga() {
//     yield fork(takeEvery(CHECK_LOGIN, loginUser))
//     yield fork(takeEvery(GET_USER_INFO, getUserInfo))   
// }