import React from 'react';
import { Row, Col , Alert} from 'reactstrap';

import { Select, Input } from '../../../../../../components/Form';

export default function ParamsCard({ form, handleInputChange, handleSelectChange, handleInputBlur, typeOptions, taxonomyOptions, templateOptions, validationStatus, validationSchema }) {

    const typeValue = form && form.type ? typeOptions.find(item => item.value === form.type) : null
    const templateValue = form && form.template ? templateOptions.find(item => item.value === form.template) : null
    const taxonomyValue = form && form.taxonomy ? taxonomyOptions.find(item => item.value === form.taxonomy) : null

    const isRequired = (field) => (validationSchema[field] && validationSchema[field].required) ? true : false

    if(!form) return(<Alert color="danger" className="bg-white border border-danger">Couldn't get post info</Alert>)

    return (           
        <Row>
            <Col xl="4" lg="6" sm="12">
                <Input
                    name="name" 
                    label="Name" 
                    onChange={handleInputChange} 
                    onBlur={handleInputBlur} 
                    value={form.name || ''}
                    isInvalid={validationStatus.name.invalid}
                    message={validationStatus.name.message}
                    required={isRequired('name')}
                />
                <Input 
                    name="slug" 
                    label="Slug" 
                    onBlur={handleInputBlur} 
                    onChange={handleInputChange}
                    value={form.slug || ''} 
                    isInvalid={validationStatus.slug.invalid}
                    message={validationStatus.slug.message}
                    required={isRequired('slug')}                           
                />
            </Col>
            <Col xl="4" lg="6" sm="12">                                                                         
                <Select 
                    name="type"
                    label="Type" 
                    options={typeOptions} 
                    placeholder={''}
                    onChange={handleSelectChange}
                    value={typeValue}
                    isInvalid={validationStatus.type.invalid}
                    message={validationStatus.type.message}
                    required={isRequired('type')}
                />                                            
                <Select 
                    name="taxonomy"
                    label="Taxonomy" 
                    options={taxonomyOptions} 
                    placeholder={''}           
                    onChange={handleSelectChange}
                    value={taxonomyValue}
                    isInvalid={validationStatus.taxonomy.invalid}
                    message={validationStatus.taxonomy.message}
                    required={isRequired('taxonomy')}
                />
                <Select 
                    name="template"
                    label="Template" 
                    options={templateOptions} 
                    placeholder={''}              
                    onChange={handleSelectChange}
                    value={templateValue}
                    isInvalid={validationStatus.template.invalid}
                    message={validationStatus.template.message}
                    required={isRequired('template')}
                />
            </Col>
        </Row>
    )

}