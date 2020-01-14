import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import { GET_POSTS, GET_POST, GET_VIEW_POST } from './actionTypes';
import { getPostsOk, getPostsError, getViewPostOk, getViewPostError, getPostOk, getPostError } from './actions';
import { apiGet } from '../../services/api';


function* getPosts({ payload: { father, page, epp, sort } }) {
    
    // if (process.env.NODE_ENV === 'development') yield delay(500)
    
    try {
        const response = yield call(apiGet, '/posts', {father: father, page: page, epp: epp, sort: sort});           
        yield put(getPostsOk(response));        
    } catch (error) {
        console.log(error)
        yield put(getPostsError(error));
    }
}
export function* watchGetPosts() {
    yield takeEvery(GET_POSTS, getPosts)
}


function* getPost({ payload: { uuid } }) {
    
    // if (process.env.NODE_ENV === 'development') yield delay(500)

    try {
        const response = yield call(apiGet, '/posts/' + uuid, {});           
        yield put(getPostOk(response));        
    } catch (error) {
        console.log(error)
        yield put(getPostError(error));
    }
}
export function* watchGetPost() {
    yield takeEvery(GET_POST, getPost)
}


function* getViewPost({ payload: { uuid } }) {
    
    // if (process.env.NODE_ENV === 'development') yield delay(500)

    try {
        const response = yield call(apiGet, '/posts/' + uuid, {});           
        yield put(getViewPostOk(response));        
    } catch (error) {
        console.log(error)
        yield put(getViewPostError(error));
    }
}
export function* watchGetViewPost() {
    yield takeEvery(GET_VIEW_POST, getViewPost)
}

export default function* loginSaga() {
    yield all([        
        fork(watchGetPosts),
        fork(watchGetPost),
        fork(watchGetViewPost)
    ]);
}
