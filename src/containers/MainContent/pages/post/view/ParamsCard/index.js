import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';

import { templates, taxonomies, types } from 'valico-sanmartin'

import { Select, Input } from '../../../../../../components/Form';

export default function ParamsCard({post, setPost}) {

    const templateOptions = Object.keys(templates).map((template) => ({ value: template, label: templates[template].name }))
    const taxonomyOptions = Object.keys(taxonomies).map((taxonomy) => ({ value: taxonomy, label: taxonomies[taxonomy].name }))
    const typeOptions = Object.keys(types).map((type) => ({ value: type, label: types[type].name }))
    
    const [input, setInput] = useState({
        name: '',
        slug: '',
        type: '',
        template: '',
        taxonomy: ''
    })

    useEffect(() => {
        setInput(post)     
        // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [post]);
    
    const handleInputChange = (name, value) => setInput({...input, [name]: value})
    const handleSelectChange = (name, value) => setPost({...post, [name]: value.value})
    const handleInputBlur = (name) => setPost(input)

    return (           
        <>
            <h4 className="mt-0 header-title">Basic Properties</h4>
            <p className="text-muted mb-4">Common to all posts</p>

            {input &&
                <Row>
                    <Col sm="6">
                        <Input
                            name="name" 
                            label="Name" 
                            onChange={handleInputChange} 
                            onBlur={handleInputBlur} 
                            value={input.name}
                        />
                        <Input 
                            name="slug" 
                            label="Slug" 
                            onBlur={handleInputBlur} 
                            onChange={handleInputChange}
                            value={input.slug}                            
                        />
                    </Col>
                    <Col sm="6">                                 
                        <div className="form-group">
                            <label className="control-label">Type</label>
                            <Select 
                                name="type"
                                options={typeOptions} 
                                placeholder={''}
                                onChange={handleSelectChange}
                                value={typeOptions.find(item => item.value === input.type)}                                     
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Taxonomy</label>
                            <Select 
                                name="taxonomy"
                                options={taxonomyOptions} 
                                placeholder={''}           
                                onChange={handleSelectChange}
                                value={taxonomyOptions.find(item => item.value === input.taxonomy)}                               
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Template</label>
                            <Select 
                                name="template"
                                options={templateOptions} 
                                placeholder={''}              
                                onChange={handleSelectChange}
                                value={templateOptions.find(item => item.value === input.template)}                              
                            />
                        </div>
                    </Col>
                </Row>
            }

        </>
    )

}