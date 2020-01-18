import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import { GET_TAGS, ADD_TAGS } from './actionTypes';
import { getTagsOk, getTagsError, addTagsOk, addTagsError  } from './actions';
import { apiGet, apiPut } from '../../services/api';


function* getTags() {    
    try {
        const response = yield call(apiGet, '/tags', {});           
        yield put(getTagsOk(response));        
    } catch (error) {
        console.log(error)
        yield put(getTagsError(error));
    }
}
export function* watchGetTags() {
    yield takeEvery(GET_TAGS, getTags)
}


function* addTags({ payload: { tags } }) {    
    try {
        const response = yield call(apiPut, '/tags', { tags });           
        yield put(addTagsOk(response));        
    } catch (error) {
        console.log(error)
        yield put(addTagsError(error));
    }
}
export function* watchAddTags() {
    yield takeEvery(ADD_TAGS, addTags)
}

export default function* loginSaga() {
    yield all([        
        fork(watchGetTags),       
        fork(watchAddTags)
    ]);
}
