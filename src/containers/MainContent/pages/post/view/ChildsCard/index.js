import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';

import { templates, taxonomies, types } from 'valico-sanmartin'

import { Select, Toggle } from '../../../../../../components/Form';

export default function ChildsCard({post, setPost}) {

    const templateOptions = Object.keys(templates).map((template) => ({ value: template, label: templates[template].name }))
    const taxonomyOptions = Object.keys(taxonomies).map((taxonomy) => ({ value: taxonomy, label: taxonomies[taxonomy].name }))
    const typeOptions = Object.keys(types).map((type) => ({ value: type, label: types[type].name }))
    
    const [input, setInput] = useState({
        childs_template: '',
        childs_type: '',
        childs_taxonomy: '',
        childs_allowed: false
    })

    useEffect(() => {
        setInput(post)     
        // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [post]);

    const handleSelectChange = (name, value) => setPost({...post, [name]: value.value})
    const handleSwitchToggle = (name, value) => setPost({...post, [name]: value})
    
    return (           
        <>
            <h4 className="mt-0 header-title">Childs</h4>
            <p className="text-muted mb-4">sdadaasdaa</p>

            {input &&

                <Row>

                    <Col sm="6">

                        <Toggle 
                            name="childs_allowed"
                            checked={input.childs_allowed}
                            label='Allow Childs'
                            onChange={handleSwitchToggle}
                        />
                        
                    </Col>

                    <Col sm="6">                                 
                        <div className="form-group">
                            <label className="control-label">Type</label>
                            <Select 
                                name="childs_type"
                                options={typeOptions} 
                                placeholder={''}
                                onChange={handleSelectChange}
                                value={typeOptions.find(item => item.value === input.childs_type)}                                     
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Taxonomy</label>
                            <Select 
                                name="childs_taxonomy"
                                options={taxonomyOptions} 
                                placeholder={''}           
                                onChange={handleSelectChange}
                                value={taxonomyOptions.find(item => item.value === input.childs_taxonomy)}                               
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Template</label>
                            <Select 
                                name="childs_template"
                                options={templateOptions} 
                                placeholder={''}              
                                onChange={handleSelectChange}
                                value={templateOptions.find(item => item.value === input.childs_template)}                              
                            />
                        </div>
                    </Col>
                </Row>

                
            }

        </>
    )

}