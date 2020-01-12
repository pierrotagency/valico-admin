import { GET_POSTS, GET_POSTS_OK, GET_POSTS_ERROR } from './actionTypes';

const initialState = {
    posts: [],      
    loading: null
}

const login = (state = initialState, action) => {
    switch (action.type) {       
        case GET_POSTS:
            state = {
                ...state,                
                loading: true                
            }
            break;
        case GET_POSTS_OK:
            state = {
                ...state,
                posts: action.payload,
                loading: false
            }
            break;
        case GET_POSTS_ERROR:
            state = {
                ...state,
                loading: false
            }
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default login;