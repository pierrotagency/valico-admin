import { GET_TAGS, GET_TAGS_OK, GET_TAGS_ERROR, ADD_TAGS, ADD_TAGS_OK, ADD_TAGS_ERROR} from './actionTypes';

export const getTags = () => {
    return {
        type: GET_TAGS
    }
}

export const getTagsOk = (payload) => {
    return {
        type: GET_TAGS_OK,
        payload: payload
    }
}

export const getTagsError = (error) => {
    return {
        type: GET_TAGS_ERROR,
        payload: error
    }
}

export const addTags = (tags) => {
    return {
        type: ADD_TAGS,
        payload: {
            tags: tags
        }
    }
}

export const addTagsOk = () => {
    return {
        type: ADD_TAGS_OK
    }
}

export const addTagsError = (error) => {
    return {
        type: ADD_TAGS_ERROR,
        payload: error
    }
}
