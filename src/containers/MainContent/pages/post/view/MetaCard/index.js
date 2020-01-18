import React, { useEffect, useState } from 'react';
import { Row, Col, Alert } from 'reactstrap';

import { Input, Tags, TextArea } from '../../../../../../components/Form';
import img1 from '../../../../../../images/products/1.jpg';

import useForm from '../../../../../../components/Form/useForm';

const stateSchema = {
    meta_title: '',
    meta_description: '',
    meta_keywords: []
};

const validationStateSchema = {
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

export default function MetaCard ({post, setPost, tags}) {

    const { state, setState, errors, handleOnChange, isValid, disable } = useForm(stateSchema, validationStateSchema);

    // const [state, setState] = useState({
    //     meta_title: '',
    //     meta_keywords: [],
    //     meta_description: '',
    //     meta_image: null     
    // })

    useEffect(() => {
        setState(post)     
        // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [post]);

    // const handleInputChange = (name, value) => setState({...state, [name]: value})

    const handleInputChange = (name, value) => handleOnChange(name, value)
    
    const handleInputBlur = (name, value) => fieldUpdated(name,value) 

    const fieldUpdated = (name, value) => {
        console.log('fieldUpdated')

        handleOnChange(name, value)

        if(isValid()){
            console.log('VALID')
            setPost({...post, [name]: value})
        }
        
    }

        
    return (           
        <>
            <h4 className="mt-0 header-title">Meta Data</h4>
            <p className="text-muted mb-4">SEO and Social Sharing</p>

            {state ?

                <Row>
                    <Col sm="6">

                        <Input
                            name="meta_title" 
                            label="Title" 
                            onChange={handleInputChange} 
                            onBlur={handleInputBlur} 
                            value={state.meta_title || ''}
                            isInvalid={errors.meta_title!==''}
                            message={errors.meta_title}
                        />

                        <Tags 
                            name="meta_keywords" 
                            label="Keywords" 
                            onChange={handleInputChange}                             
                            value={state.meta_keywords || []}
                            options={tags}
                            isInvalid={errors.meta_keywords!==''}
                            message={errors.meta_keywords}
                        />

                        <TextArea
                            name="meta_description" 
                            label="Description" 
                            rows="4"
                            onChange={handleInputChange} 
                            onBlur={handleInputBlur} 
                            value={state.meta_description || ''}
                            isInvalid={errors.meta_description!==''}
                            message={errors.meta_description}
                        />
                        
                    </Col>
                    <Col sm="6">
                        <div className="form-group">
                            <label>Image</label> <br />
                            <img src={img1} alt="product img" className="img-fluid rounded" style={{ maxWidth: "200px" }} />
                            <br />
                            <button type="button" className="btn btn-info mt-2 waves-effect waves-light">Change Image</button>
                        </div>
                    </Col>
                </Row>
            :
                <Alert color="danger" className="bg-white border border-danger">Couldn't get post info</Alert>                
            }

        </>
    )

}