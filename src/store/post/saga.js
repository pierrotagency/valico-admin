import { takeEvery, fork, put, all, call, delay } from 'redux-saga/effects';

import { GET_POSTS } from './actionTypes';
import {  getPostsOk, getPostsError } from './actions';
import { apiGet } from '../../services/api';


function* getPosts({ payload: { father } }) {
    
    yield delay(500)
    
    try {
        const response = yield call(apiGet, '/posts', {father: father});           
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
