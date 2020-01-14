import { GET_POSTS, GET_POSTS_OK, GET_POSTS_ERROR, GET_POST, GET_POST_OK, GET_POST_ERROR, RESET_POST, SET_POST_EPP, SET_POST_SORT, SET_POST_PAGE} from './actionTypes';

export const getPosts = (father,page=1,epp=5,sort='name') => {
    return {
        type: GET_POSTS,
        payload: {
            father: father,
            page: page,
            epp: epp,
            sort: sort
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


export const getPost = (uuid) => {
    return {
        type: GET_POST,
        payload: {
            uuid: uuid
        }     
    }
}

export const getPostOk = (payload) => {
    return {
        type: GET_POST_OK,
        payload: payload
    }
}

export const getPostError = (error) => {
    return {
        type: GET_POST_ERROR,
        payload: error
    }
}

export const resetPost = () => {
    return {
        type: RESET_POST             
    }
}

export const setPostEpp = (payload) => {
    return {
        type: SET_POST_EPP,
        payload: payload
    }
}

export const setPostSort = (payload) => {
    return {
        type: SET_POST_SORT,
        payload: payload
    }
}

export const setPostPage = (payload) => {
    return {
        type: SET_POST_PAGE,
        payload: payload
    }
}