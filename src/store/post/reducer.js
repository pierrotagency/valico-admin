import { GET_POSTS, GET_POSTS_OK, GET_POSTS_ERROR, GET_POST, GET_POST_OK, GET_POST_ERROR, SET_VIEW_POST, RESET_POST, SET_POST_EPP, SET_POST_SORT, SET_POST_PAGE, GET_VIEW_POST, GET_VIEW_POST_OK, GET_VIEW_POST_ERROR, SAVE_VIEW_POST, SAVE_VIEW_POST_OK, SAVE_VIEW_POST_ERROR } from './actionTypes';

const initialState = {
    posts: [],    
    loadingPosts: true,
    post: null,
    loadingPost: true,
    viewPost: null,
    loadingViewPost: true,
    savingPost: false,
    epp: 10,
    page: 1,
    sort: 'created_at-'
}

const post = (state = initialState, action) => {
    switch (action.type) {       
        case GET_POSTS:
            state = {
                ...state,                
                loadingPosts: true                
            }
            break;
        case GET_POSTS_OK:
            state = {
                ...state,
                posts: action.payload,
                loadingPosts: false
            }
            break;
        case GET_POSTS_ERROR:
            state = {
                ...state,
                loadingPosts: false
            }
            break;

        case GET_POST:
            state = {
                ...state,                
                loadingPost: true                
            }
            break;
        case GET_POST_OK:
            state = {
                ...state,
                post: action.payload,
                loadingPost: false
            }
            break;
        case GET_POST_ERROR:
            state = {
                ...state,
                post: null,
                loadingPost: false
            }
            break;

        case RESET_POST:
            state = {
                ...state,
                post: null,
                loadingPost: false
            }
            break;

        case SET_POST_EPP:
            state = {
                ...state,
                epp: action.payload
            }
            break;

        case SET_POST_SORT:
            state = {
                ...state,
                sort: action.payload
            }
            break;
        
        case SET_POST_PAGE:
            state = {
                ...state,
                page: action.payload
            }
            break;

        case GET_VIEW_POST:
            state = {
                ...state,                
                loadingViewPost: true                
            }
            break;
        case GET_VIEW_POST_OK:
            state = {
                ...state,
                viewPost: action.payload,
                loadingViewPost: false
            }
            break;
        case GET_VIEW_POST_ERROR:
            state = {
                ...state,
                viewPost: null,
                loadingViewPost: false
            }
            break;

        case SET_VIEW_POST:
            state = {
                ...state,
                viewPost: action.payload
            }
            break;

        case SAVE_VIEW_POST:
            state = {
                ...state,                
                savingPost: true,       
                savingPostError: null     
            }
            break;
        case SAVE_VIEW_POST_OK:
            state = {
                ...state,      
                viewPost: action.payload,          
                savingPost: false,
                savingPostError: null
            }
            break;
        case SAVE_VIEW_POST_ERROR:
            state = {
                ...state,                
                savingPost: false,
                savingPostError: action.payload
            }
            break;

        default:
            // state = { ...state };
            break;
    }
    return state;
}

export default post;