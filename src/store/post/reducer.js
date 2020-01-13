import { GET_POSTS, GET_POSTS_OK, GET_POSTS_ERROR, GET_POST, GET_POST_OK, GET_POST_ERROR, RESET_POST } from './actionTypes';

const initialState = {
    posts: [],      
    loadingPosts: null,
    loadingPost: null
}

const login = (state = initialState, action) => {
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

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default login;