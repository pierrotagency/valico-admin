import { api } from '../../../../../services/api';


const validateSlug = async value =>{
    
    console.log('>>>>> validateSlug', value)

    return await api.post('/posts/exists/slug/', {
        slug: value
    })
    .then(res => {

        let result = true;
        if(res.data && res.data.found) result = false    

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
                method: validateSlug,
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
    childs_template: {
        required: true
    },
    childs_type: {
        required: true
    },
    childs_taxonomy: {
        required: true
    },
    meta_title: {
        required: true,
        rules: [
            {
                type: 'regex',
                regex: /^[a-zA-Z]+$/,
                message: 'Invalid meta Title.',
            },
        ]
    },
    meta_description: {
        required: true,
        rules: [
            {
                type: 'regex',
                regex: /^[a-zA-Z]+$/,
                message: 'Invalid meta descripcion.',
            },
        ]
    },
    meta_keywords: {
        required: true
    }
};


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

export { fields, validations } 