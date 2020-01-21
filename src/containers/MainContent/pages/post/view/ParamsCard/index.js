import React from 'react';
import { Row, Col , Alert} from 'reactstrap';

import { Select, Input } from '../../../../../../components/Form';

export default function ParamsCard({ form, handleInputChange, handleSelectChange, handleInputBlur, typeOptions, taxonomyOptions, templateOptions, validations }) {

    const typeValue = form && form.type ? typeOptions.find(item => item.value === form.type) : null
    const templateValue = form && form.template ? templateOptions.find(item => item.value === form.template) : null
    const taxonomyValue = form && form.taxonomy ? taxonomyOptions.find(item => item.value === form.taxonomy) : null


    if(!form) return(<Alert color="danger" className="bg-white border border-danger">Couldn't get post info</Alert>)

    return (           
        <Row>
            <Col sm="6">
                <Input
                    name="name" 
                    label="Name" 
                    onChange={handleInputChange} 
                    onBlur={handleInputBlur} 
                    value={form.name || ''}
                    isInvalid={validations.name.invalid}
                    message={validations.name.message}
                />
                <Input 
                    name="slug" 
                    label="Slug" 
                    onBlur={handleInputBlur} 
                    onChange={handleInputChange}
                    value={form.slug || ''} 
                    isInvalid={validations.slug.invalid}
                    message={validations.slug.message}                           
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
                    isInvalid={validations.type.invalid}
                    message={validations.type.message}
                />                                            
                <Select 
                    name="taxonomy"
                    label="Taxonomy" 
                    options={taxonomyOptions} 
                    placeholder={''}           
                    onChange={handleSelectChange}
                    value={taxonomyValue}
                    isInvalid={validations.taxonomy.invalid}
                    message={validations.taxonomy.message}
                />
                <Select 
                    name="template"
                    label="Template" 
                    options={templateOptions} 
                    placeholder={''}              
                    onChange={handleSelectChange}
                    value={templateValue}
                    isInvalid={validations.template.invalid}
                    message={validations.template.message}
                />
            </Col>
        </Row>
    )

}