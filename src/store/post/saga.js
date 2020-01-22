import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import { GET_POSTS, GET_POST, GET_VIEW_POST, SAVE_VIEW_POST, STORE_VIEW_POST } from './actionTypes';
import { getPostsOk, getPostsError, getViewPostOk, getViewPostError, getPostOk, getPostError, saveViewPostOk, saveViewPostError, storeViewPostOk, storeViewPostError  } from './actions';
import { apiGet, apiPut, apiPost } from '../../services/api';


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
        const response = yield call(apiGet, '/posts/' + uuid + '/peep', {});           
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

function* saveViewPost({ payload: { post, validations } }) {
    try {
        const response = yield call(apiPut, '/posts/' + post.uuid, { ...post, _validations: validations });           
        yield put(saveViewPostOk(response));        
    } catch (error) {        
        yield put(saveViewPostError(error));
    }
}
export function* watchSaveViewPost() {
    yield takeEvery(SAVE_VIEW_POST, saveViewPost)
}


function* storeViewPost({ payload: { post, validations } }) {
    try {
        const response = yield call(apiPost, '/posts', { ...post, _validations: validations });           
        yield put(storeViewPostOk(response));        
    } catch (error) {        
        yield put(storeViewPostError(error));
    }
}
export function* watchStoreViewPost() {
    yield takeEvery(STORE_VIEW_POST, storeViewPost)
}


export default function* loginSaga() {
    yield all([        
        fork(watchGetPosts),
        fork(watchGetPost),
        fork(watchGetViewPost),
        fork(watchSaveViewPost),
        fork(watchStoreViewPost)
    ]);
}
