import {   
    GET_POSTS,
    GET_POSTS_OK,
    GET_POSTS_ERROR
} from './actionTypes';

export const getPosts = () => {
    return {
        type: GET_POSTS        
    }
}

export const getPostsOk = (user) => {
    return {
        type: GET_POSTS_OK,
        payload: user
    }
}

export const getPostsError = (error) => {
    return {
        type: GET_POSTS_ERROR,
        payload: error
    }
}