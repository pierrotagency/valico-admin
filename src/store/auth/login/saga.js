import { takeEvery, fork, put, all, call, delay } from 'redux-saga/effects';

// Login Redux States
import { CHECK_LOGIN } from './actionTypes';
import {  apiLoginError, loginUserSuccessful } from './actions';

// AUTH related methods
import { postLogin } from '../../../helpers/authUtils';

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { username, password, history } }) {

    // console.log('loginUser')
    // yield delay(2000)
    // console.log('loginUser.......')


        try {
            const response = yield call(postLogin, '/auth/login', {username: username, password: password});           
            yield put(loginUserSuccessful(response));
            history.push('/dashboard');
        } catch (error) {
            yield put(apiLoginError(error));
        }
}

export function* watchUserLogin() {
    yield takeEvery(CHECK_LOGIN, loginUser)
}

function* loginSaga() {
    yield all([fork(watchUserLogin)]);
}

export default loginSaga;
