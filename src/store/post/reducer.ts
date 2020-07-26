import { GET_POSTS, GET_POSTS_OK, GET_POSTS_ERROR, GET_POST, GET_POST_OK, GET_POST_ERROR, SET_VIEW_POST, RESET_POST, SET_POST_EPP, SET_POST_SORT, SET_POST_PAGE, GET_VIEW_POST, GET_VIEW_POST_OK, GET_VIEW_POST_ERROR, SAVE_VIEW_POST, SAVE_VIEW_POST_OK, SAVE_VIEW_POST_ERROR, CREATE_BLANK_POST, STORE_VIEW_POST, STORE_VIEW_POST_OK, STORE_VIEW_POST_ERROR } from './actionTypes';
import { StoreAction } from '../actions';
import { Post } from '../../models/Post';
import { StorePostState } from './types';

const initialState : StorePostState = {    
    loadingPosts: true,    
    loadingPost: true,
    loadingViewPost: true,
    savingPost: false,
    epp: 10,
    post: {} as Post,
    page: 1,
    tag: null,
    sort: 'created_at-',
    savingPostError: null,
}

const reducer = (state = initialState, action : StoreAction) => {
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
                posts: action.payload as Post[],
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
                post: action.payload as Post,
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
                epp: action.payload as unknown as number
            }
            break;

        case SET_POST_SORT:
            state = {
                ...state,
                sort: action.payload as unknown as string
            }
            break;
        
        case SET_POST_PAGE:
            state = {
                ...state,
                page: action.payload as unknown as number
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
                viewPost: action.payload as Post,
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

        case CREATE_BLANK_POST:
            state = {
                ...state,
                viewPost: action.payload as Post,
                loadingViewPost: false
            }
            break;

        case SET_VIEW_POST:
            state = {
                ...state,
                viewPost: action.payload as Post
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
                viewPost: action.payload as Post,          
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


        case STORE_VIEW_POST:
            state = {
                ...state,                
                savingPost: true,       
                savingPostError: null     
            }
            break;
        case STORE_VIEW_POST_OK:
            state = {
                ...state,      
                viewPost: action.payload as Post,          
                savingPost: false,
                savingPostError: null
            }
            break;
        case STORE_VIEW_POST_ERROR:
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

export default reducer;