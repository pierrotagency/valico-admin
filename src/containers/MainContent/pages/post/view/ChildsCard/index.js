import React from 'react';
import { Row, Col , Alert } from 'reactstrap';

import { Select, Toggle } from '../../../../../../components/Form';

export default function ChildsCard({ form, validationStatus, handleSwitchToggle, handleSelectChange, typeOptions, taxonomyOptions, templateOptions, validationSchema }) {

    const childsTypeValue = form && form.childs_type ? typeOptions.find(item => item.value === form.childs_type) : null
    const childsTemplateValue = form && form.childs_template ? templateOptions.find(item => item.value === form.childs_template) : null
    const childsTaxonomyValue = form && form.childs_taxonomy ? taxonomyOptions.find(item => item.value === form.childs_taxonomy) : null

    const isRequired = (field) => (validationSchema[field] && validationSchema[field].required) ? true : false

    if(!form) return(<Alert color="danger" className="bg-white border border-danger">Couldn't get post info</Alert>)

    return (           
        <Row>
            <Col xl="4" lg="6" sm="12">
                <Toggle 
                    name="childs_allowed"
                    checked={form.childs_allowed || false}
                    label='Allow Childs'
                    onChange={handleSwitchToggle}
                />                
            </Col>
            <Col xl="4" lg="6" sm="12">                                                                             
                <Select 
                    name="childs_type"
                    label="Childs Type"
                    options={typeOptions} 
                    placeholder={''}
                    onChange={handleSelectChange}
                    value={childsTypeValue}
                    isInvalid={validationStatus.childs_type.invalid}
                    message={validationStatus.childs_type.message}
                    required={isRequired('childs_type')}                             
                />                                                                                    
                <Select 
                    name="childs_taxonomy"
                    label="Childs Taxonomy"
                    options={taxonomyOptions} 
                    placeholder={''}           
                    onChange={handleSelectChange}
                    value={childsTaxonomyValue}
                    isInvalid={validationStatus.childs_taxonomy.invalid}
                    message={validationStatus.childs_taxonomy.message}    
                    required={isRequired('childs_taxonomy')}                           
                />                                                                          
                <Select 
                    name="childs_template"
                    label="Childs Tempplate"
                    options={templateOptions} 
                    placeholder={''}              
                    onChange={handleSelectChange}
                    value={childsTemplateValue}
                    isInvalid={validationStatus.childs_template.invalid}
                    message={validationStatus.childs_template.message}        
                    required={isRequired('childs_template')}                     
                />                                           
            </Col>
        </Row>
    )

}