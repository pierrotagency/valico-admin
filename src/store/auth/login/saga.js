import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { CHECK_LOGIN, GET_USER_INFO } from './actionTypes';
import {  apiLoginError, loginUserSuccessful, getUserInfoOk, getUserInfoError } from './actions';

import { apiGet, apiPost } from '../../../services/api';

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { email, password, history } }) {

    try {
        const response = yield call(apiPost, '/auth/login', {email: email, password: password});           
        yield put(loginUserSuccessful(response));
        history.push('/dashboard');
    } catch (error) {        
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

function* loginSaga() {
    yield all([fork(watchUserLogin),fork(watchGetUserInfo)]);
}

export default loginSaga;
