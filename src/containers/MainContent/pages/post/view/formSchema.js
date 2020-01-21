import { api } from '../../../../../services/api';


const fieldsSchema = {
    name: '',
    slug: '',
    template: null,
    type: null,
    taxonomy: null,
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
    meta_image: null,
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


const validationsSchema = {
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
                type: 'function',
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
    },
    meta_image: {
        required: true,
        rules: [
            {
                type: 'backend',
                object: {
                    file: 'required|file|file_ext:png,gif,jpg,jpeg,tiff,bmp|file_size:1mb|file_types:image'
                },
                messages: ['xxxxxxx extensions'],
            }
        ]        
    }
};

export {fieldsSchema, validationsSchema } 