import { GET_TAGS, GET_TAGS_OK, GET_TAGS_ERROR, ADD_TAGS, ADD_TAGS_OK, ADD_TAGS_ERROR, ADD_LOCAL_TAGS } from './actionTypes';

const initialState = {
    tags: [],    
    loading: true,    
    saving: false, 
}

const tag = (state = initialState, action) => {
    switch (action.type) {       
        case GET_TAGS:
            state = {
                ...state,                
                loading: true                
            }
            break;
        case GET_TAGS_OK:
            state = {
                ...state,
                tags: action.payload,
                loading: false
            }
            break;
        case GET_TAGS_ERROR:
            state = {
                ...state,
                loading: false
            }
            break;

        case ADD_LOCAL_TAGS:
            state = {
                ...state,   
                tags: [...state.tags, ...action.payload.tags]
            }
            break;

        case ADD_TAGS:
            state = {
                ...state,                
                saving: true                
            }
            break;
        case ADD_TAGS_OK:
            state = {
                ...state,           
                tags: [...state.tags, action.payload],     
                saving: false
            }
            break;
        case ADD_TAGS_ERROR:
            state = {
                ...state,                
                saving: false
            }
            break;

        default:
            // state = { ...state };
            break;
    }
    return state;
}

export default tag;