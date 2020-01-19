import React from 'react';
import { Row, Col, Alert } from 'reactstrap';

import { Input, Tags, TextArea } from '../../../../../../components/Form';
import img1 from '../../../../../../images/products/1.jpg';


export default function MetaCard ({handleInputChange, handleInputBlur, form, errors, tags }) {

    if(!form) return(<Alert color="danger" className="bg-white border border-danger">Couldn't get post info</Alert>)

    return (                  
        <Row>
            <Col sm="6">
                <Input
                    name="meta_title" 
                    label="Title" 
                    onChange={handleInputChange} 
                    onBlur={handleInputBlur} 
                    value={form.meta_title || ''}
                    isInvalid={errors.meta_title!==''}
                    message={errors.meta_title}
                />
                <Tags 
                    name="meta_keywords" 
                    label="Keywords" 
                    onChange={handleInputBlur}                             
                    value={form.meta_keywords || []}
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
                    value={form.meta_description || ''}
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
    )

}