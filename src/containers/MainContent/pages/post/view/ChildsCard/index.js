import React from 'react';
import { Row, Col , Alert } from 'reactstrap';

import { Select, Toggle } from '../../../../../../components/Form';

export default function ChildsCard({ form, errors, handleSwitchToggle, handleSelectChange, typeOptions, taxonomyOptions, templateOptions }) {

    const childsTypeValue = form && form.childs_type ? typeOptions.find(item => item.value === form.childs_type) : null
    const childsTemplateValue = form && form.childs_template ? templateOptions.find(item => item.value === form.childs_template) : null
    const childsTaxonomyValue = form && form.childs_taxonomy ? taxonomyOptions.find(item => item.value === form.childs_taxonomy) : null

    if(!form) return(<Alert color="danger" className="bg-white border border-danger">Couldn't get post info</Alert>)

    return (           
        <Row>
            <Col sm="6">
                <Toggle 
                    name="childs_allowed"
                    checked={form.childs_allowed || false}
                    label='Allow Childs'
                    onChange={handleSwitchToggle}
                />
                
            </Col>
            <Col sm="6">                                                                             
                <Select 
                    name="childs_type"
                    label="Childs Type"
                    options={typeOptions} 
                    placeholder={''}
                    onChange={handleSelectChange}
                    value={childsTypeValue}
                    isInvalid={errors.childs_type!==''}
                    message={errors.childs_type}                                
                />                                                                                    
                <Select 
                    name="childs_taxonomy"
                    label="Childs Taxonomy"
                    options={taxonomyOptions} 
                    placeholder={''}           
                    onChange={handleSelectChange}
                    value={childsTaxonomyValue}
                    isInvalid={errors.childs_taxonomy!==''}
                    message={errors.childs_taxonomy}                               
                />                                                                          
                <Select 
                    name="childs_template"
                    label="Childs Tempplate"
                    options={templateOptions} 
                    placeholder={''}              
                    onChange={handleSelectChange}
                    value={childsTemplateValue}
                    isInvalid={errors.childs_template!==''}
                    message={errors.childs_template}                             
                />                                           
            </Col>
        </Row>
    )

}