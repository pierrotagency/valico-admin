import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import { GET_POSTS } from './actionTypes';
import {  getPostsOk, getPostsError } from './actions';
import { apiGet, apiPost } from '../../services/api';


function* getPosts() {
    try {
        const response = yield call(apiGet, '/posts', {});           
        yield put(getPostsOk(response));        
    } catch (error) {
        console.log(error)
        yield put(getPostsError(error));
    }
}

export function* watchGetPosts() {
    yield takeEvery(GET_POSTS, getPosts)
}

export default function* loginSaga() {
    yield all([        
        fork(watchGetPosts)
    ]);
}
