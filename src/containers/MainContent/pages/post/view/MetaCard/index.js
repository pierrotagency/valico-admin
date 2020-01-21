import React from 'react';
import { Row, Col, Alert } from 'reactstrap';

import { Input, Tags, TextArea, FileUpload } from '../../../../../../components/Form';

export default function MetaCard ({ handleInputChange, handleInputBlur, form, errors, tags, parseBackendValidations }) {

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
                    isInvalid={errors.meta_title.invalid}
                    message={errors.meta_title.message}
                />
                <Tags 
                    name="meta_keywords" 
                    label="Keywords" 
                    onChange={handleInputBlur}                             
                    value={form.meta_keywords || []}
                    options={tags}
                    isInvalid={errors.meta_keywords.invalid}
                    message={errors.meta_keywords.message}
                />
                <TextArea
                    name="meta_description" 
                    label="Description" 
                    rows="4"
                    onChange={handleInputChange} 
                    onBlur={handleInputBlur} 
                    value={form.meta_description || ''}
                    isInvalid={errors.meta_description.invalid}
                    message={errors.meta_description.message}
                />                                        
            </Col>
            <Col sm="6">
                
                <FileUpload 
                    name="meta_image"
                    label="Cover Image"
                    key='ex1' 
                    url='http://localhost:3333/api/v1/media/file/upload'
                    method='post'
                    backendValidations={parseBackendValidations('meta_image')}                   
                    // onProgress={(e, request, progress) => {console.log('progress', name, progress);}}
                    onChange={handleInputBlur}
                    value={form.meta_image || {}}
                    // onError={ (e, request) => {console.log('error', e, request);}}
                    // onAbort={ (e, request) => {console.log('abort', e, request);}}                    
                    // isInvalid={false}
                    // message="errors.meta_keywords.message"
                />
                
            </Col>
        </Row>
    )

}