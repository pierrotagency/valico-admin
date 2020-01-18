import React, { useEffect, useState } from 'react';
import { Row, Col, Alert } from 'reactstrap';

import { Input, Tags } from '../../../../../../components/Form';
import img1 from '../../../../../../images/products/1.jpg';


export default function MetaCard ({post, setPost}) {

    const [input, setInput] = useState({
        meta_title: '',
        meta_keywords: '',
        meta_description: '',
        meta_image: null     
    })

    useEffect(() => {
        setInput(post)     
        // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [post]);

    
    const handleInputChange = (name, value) => setInput({...input, [name]: value})
    const handleInputBlur = (name) => setPost(input)


    const handleTagsChange = (name, value) => {
        console.log(value)
    }

    // const handleOnChange = (e) => (typeof(onChange) === 'function') ? onChange(name,e) : false
        
    return (           
        <>
            <h4 className="mt-0 header-title">Meta Data</h4>
            <p className="text-muted mb-4">SEO and Social Sharing</p>

            {input ?

                <Row>
                    <Col sm="6">

                        <Input
                            name="meta_title" 
                            label="Title" 
                            onChange={handleInputChange} 
                            onBlur={handleInputBlur} 
                            value={input.meta_title || ''}
                        />

                        <Tags 
                            name="meta_keywords" 
                            label="Keywords" 
                            onChange={handleTagsChange}                             
                            value={input.meta_keywords || []}
                        />

                        <div className="form-group">
                            <label htmlFor="metadescription">Meta Description</label>
                            <textarea className="form-control" id="metadescription" rows="5"></textarea>
                        </div>
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