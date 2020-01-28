import { api } from '../../../../../../services/api';


const fieldSchema = {
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
    
    const { value, currentElement } = params;

    return await api.post('/posts/exists/slug/', {
        slug: value
    })
    .then(res => {
        const result = ( res.data && res.data.found && res.data.id !== currentElement.uuid ) ? false : true    
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


const validationSchema = {
    name: {
        required: true,
        rules: [
            {
                onSubmit: true,
                type: 'backend',
                object: {
                    name: 'required|min:6'
                },
                messages: {
                    'name.min': 'Shorty nammme'
                },
            }
        ]
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
                onSubmit: false, 
                type: 'backend',
                object: { // TODO custom messages not supported in backend due to file validation custom methodf
                    types: ['jpeg', 'jpg', 'png'],
                    size: '2mb'
                    // fileobj: 'required|file|file_ext:png,jpg,gif|file_size:1mb|file_types:image' // before file put as stream in back
                },
                messages: {
                    // 'fileobj.file_ext': 'Wrong extension', // TODO ustom messagges for FILES not working on AdonisJS/Indicative 
                    // 'fileobj.file_size': 'Too heavy'
                },
            }
        ]        
    }
};

export { fieldSchema, validationSchema } 