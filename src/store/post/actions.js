import {   
    GET_POSTS,
    GET_POSTS_OK,
    GET_POSTS_ERROR
} from './actionTypes';

export const getPosts = (father) => {
    return {
        type: GET_POSTS,
        payload: {
            father: father
        }     
    }
}

export const getPostsOk = (payload) => {
    return {
        type: GET_POSTS_OK,
        payload: payload
    }
}

export const getPostsError = (error) => {
    return {
        type: GET_POSTS_ERROR,
        payload: error
    }
}