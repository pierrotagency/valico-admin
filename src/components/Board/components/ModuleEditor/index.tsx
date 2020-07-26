import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap';

import DynamicForm, { ErrorSchema } from '../../../DynamicForm'
import "react-toggle/style.css";
import './index.scss'
import { validateField } from '../../../../helpers/validation';


export default function ModuleEditor({ 
  module,
  fieldsUpdated,
  library,
  validationSchema
} : { 
  module : any,
  fieldsUpdated : any,
  library: any,
  validationSchema: object
}) {

  const handleFormBlur = (formData: Record<string, any>, errors: ErrorSchema[]) => {
    // console.log('handleFormBlur', formData, errors)
    if(errors.length===0) fieldsUpdated(formData)
  }

  const handleDynamicFormValidate = async (formData: Record<string, any>, errors: ErrorSchema[]) => {
    if(!formData || Object.keys(formData).length === 0) return errors

    Object.keys(validationSchema).forEach(async (name: any) => {
        console.log('formData', formData);
        // // if (!prevForm.data || !prevForm.data[name] || formData[name] !== prevForm.data[name]) { // only validate the fields that changed (except validateAllFields is true)
            const error = await validateField(name, formData[name], validationSchema);                
            const valid = (typeof error === 'undefined' || error === '') ? true:false
            console.log('errors[name]', errors, name, error);
            if(!valid) errors[name]?.__addError(error);
        // }
    })

    return errors
  }
  

  return (
    <>
      {module &&     
        <Card>
          <CardBody>
            <Row className="form-group">                
              <Col sm="12">
                <DynamicForm
                  schema={library[module.component].schema}
                  formData={module.fields}
                  onBlur={handleFormBlur}
                  // onSubmit={handleFormBlur}
                  validate={handleDynamicFormValidate}
                  onError={(e: any) => console.log("form error", e)}  
                  liveValidate={true}                  
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      }
    </>
  )
}
