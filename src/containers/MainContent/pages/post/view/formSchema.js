export const fields = {
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

export const validations = {
    name: {
        required: true
    },
    slug: {
        required: true,
        validator: {
            regEx: /^[a-zA-Z]+$/,
            error: 'Invalid slug format.',
        },
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
        validator: {
            regEx: /^[a-zA-Z]+$/,
            error: 'Invalid first name format.',
        },
    },
    meta_description: {
        required: true,
        validator: {
            regEx: /^[a-zA-Z]+$/,
            error: 'Invalid last name format.',
        },
    },
    meta_keywords: {
        required: true
    }
};