import React from 'react';
import { Row, Col , Alert } from 'reactstrap';

import { Select, Toggle } from '../../../../../../components/Form';

export default function ChildsCard({ state, errors, handleSwitchToggle, handleSelectChange, typeOptions, taxonomyOptions, templateOptions }) {

    const childsTypeValue = state && state.childs_type ? typeOptions.find(item => item.value === state.childs_type) : null
    const childsTemplateValue = state && state.childs_template ? templateOptions.find(item => item.value === state.childs_template) : null
    const childsTaxonomyValue = state && state.childs_taxonomy ? taxonomyOptions.find(item => item.value === state.childs_taxonomy) : null

    if(!state) return(<Alert color="danger" className="bg-white border border-danger">Couldn't get post info</Alert>)

    return (           
        <Row>
            <Col sm="6">
                <Toggle 
                    name="childs_allowed"
                    checked={state.childs_allowed || false}
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