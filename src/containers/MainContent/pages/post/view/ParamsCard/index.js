import React from 'react';
import { Row, Col , Alert} from 'reactstrap';

import { Select, Input } from '../../../../../../components/Form';

export default function ParamsCard({ state, handleInputChange, handleSelectChange, handleInputBlur, typeOptions, taxonomyOptions, templateOptions, errors }) {

    const typeValue = state && state.type ? typeOptions.find(item => item.value === state.type) : null
    const templateValue = state && state.template ? templateOptions.find(item => item.value === state.template) : null
    const taxonomyValue = state && state.taxonomy ? taxonomyOptions.find(item => item.value === state.taxonomy) : null


    if(!state) return(<Alert color="danger" className="bg-white border border-danger">Couldn't get post info</Alert>)

    return (           
        <Row>
            <Col sm="6">
                <Input
                    name="name" 
                    label="Name" 
                    onChange={handleInputChange} 
                    onBlur={handleInputBlur} 
                    value={state.name || ''}
                    isInvalid={errors.name!==''}
                    message={errors.name}
                />
                <Input 
                    name="slug" 
                    label="Slug" 
                    onBlur={handleInputBlur} 
                    onChange={handleInputChange}
                    value={state.slug || ''} 
                    isInvalid={errors.slug!==''}
                    message={errors.slug}                           
                />
            </Col>
            <Col sm="6">                                                                         
                <Select 
                    name="type"
                    label="Type" 
                    options={typeOptions} 
                    placeholder={''}
                    onChange={handleSelectChange}
                    value={typeValue}
                    isInvalid={errors.type!==''}
                    message={errors.type}
                />                                            
                <Select 
                    name="taxonomy"
                    label="Taxonomy" 
                    options={taxonomyOptions} 
                    placeholder={''}           
                    onChange={handleSelectChange}
                    value={taxonomyValue}
                    isInvalid={errors.taxonomy!==''}
                    message={errors.taxonomy}
                />
                <Select 
                    name="template"
                    label="Template" 
                    options={templateOptions} 
                    placeholder={''}              
                    onChange={handleSelectChange}
                    value={templateValue}
                    isInvalid={errors.template!==''}
                    message={errors.template}
                />
            </Col>
        </Row>
    )

}