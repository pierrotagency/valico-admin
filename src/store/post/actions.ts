import { GET_POSTS, GET_POSTS_OK, GET_POSTS_ERROR, GET_POST, GET_POST_OK, GET_POST_ERROR, SET_VIEW_POST, RESET_POST, SET_POST_EPP, SET_POST_SORT, SET_POST_PAGE, GET_VIEW_POST, GET_VIEW_POST_OK, GET_VIEW_POST_ERROR, SAVE_VIEW_POST, SAVE_VIEW_POST_OK, SAVE_VIEW_POST_ERROR, CREATE_BLANK_POST, STORE_VIEW_POST, STORE_VIEW_POST_OK, STORE_VIEW_POST_ERROR} from './actionTypes';
import { Post } from '../../models/Post';

export const getPosts = (father : any,page=1,epp=5,sort='name') => {
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

export const getPostsOk = (posts: Post[]) => {
    return {
        type: GET_POSTS_OK,
        payload: posts
    }
}

export const getPostsError = (error: any) => {
    return {
        type: GET_POSTS_ERROR,
        payload: error
    }
}

export const getViewPost = (uuid: string) => {
    return {
        type: GET_VIEW_POST,
        payload: {
            uuid: uuid
        }     
    }
}

export const getViewPostOk = (post: Post) => {
    return {
        type: GET_VIEW_POST_OK,
        payload: post
    }
}

export const getViewPostError = (error: any) => {
    return {
        type: GET_VIEW_POST_ERROR,
        payload: error
    }
}

export const getPost = (uuid: string) => {
    return {
        type: GET_POST,
        payload: {
            uuid: uuid
        }     
    }
}

export const getPostOk = (post: Post) => {
    return {
        type: GET_POST_OK,
        payload: post
    }
}

export const getPostError = (error: any) => {
    return {
        type: GET_POST_ERROR,
        payload: error
    }
}

export const setViewPost = (post: Post) => {
    return {
        type: SET_VIEW_POST,
        payload: post
    }
}

export const saveViewPost = (post: Post, validations?: any) => {
    return {
        type: SAVE_VIEW_POST,
        payload: {
            post: post,
            validations: validations
        }
    }
}

export const saveViewPostOk = (post: Post) => {
    return {
        type: SAVE_VIEW_POST_OK,
        payload: post
    }
}

export const saveViewPostError = (error: any) => {
    return {
        type: SAVE_VIEW_POST_ERROR,
        payload: error
    }
}


export const storeViewPost = (post: Post, validations: any) => {
    return {
        type: STORE_VIEW_POST,
        payload: {
            post: post,
            validations: validations
        }
    }
}

export const storeViewPostOk = (post: Post) => {
    return {
        type: STORE_VIEW_POST_OK,
        payload: post
    }
}

export const storeViewPostError = (error: any) => {
    return {
        type: STORE_VIEW_POST_ERROR,
        payload: error
    }
}




export const resetPost = () => {
    return {
        type: RESET_POST             
    }
}

export const setPostEpp = (epp : number) => {
    return {
        type: SET_POST_EPP,
        payload: epp
    }
}

export const setPostSort = (sort: string) => {
    return {
        type: SET_POST_SORT,
        payload: sort
    }
}

export const setPostPage = (sort: string) => {
    return {
        type: SET_POST_PAGE,
        payload: sort
    }
}

export const createBlankPost = (payload: any) => {
    return {
        type: CREATE_BLANK_POST,
        payload: payload
    }
}