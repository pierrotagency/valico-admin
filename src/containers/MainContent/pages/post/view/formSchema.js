import { api } from '../../../../../services/api';


const fields = {
    name: '',
    slug: '',
    template: null,
    type: null,
    taxonomy: null,
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
    childs_template: null,
    childs_type: null,
    childs_taxonomy: null,
    childs_allowed: false
};

const validateUniqueSlug = async (params) =>{
    
    const { value, form } = params;

    return await api.post('/posts/exists/slug/', {
        slug: value
    })
    .then(res => {
        const result = ( res.data && res.data.found && res.data.id !== form.uuid ) ? false : true    
        return {
            validated: true,
            valid: result            
        }
    })
    .catch(err => {        
        return {
            validated: false,
            message: err.response
        }        
    });
    
}


const validations = {
    name: {
        required: true
    },
    slug: {
        required: true,
        rules: [
            {
                type: 'regex',
                regex: /^[a-zA-Z0-9_.-]+$/,
                message: 'Invalid slug format.',
            },
            {
                type: 'remote',
                method: validateUniqueSlug,
                message: 'Slug already exists.',
            },
        ]
    },
    type: {
        required: true
    },
    taxonomy: {
        required: true
    },
    template: {
        required: true
    }   
};

export { fields, validations } 