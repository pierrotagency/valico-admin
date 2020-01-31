import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap';

import DynamicForm from '../../../DynamicForm'
import "react-toggle/style.css";
import './index.scss'
import { validateField } from '../../../../helpers/validation';


export default function ModuleEditor({ 
  module,
  fieldsUpdated,
  library,
  validationSchema
}) {

  const handleFormBlur = (formData) => {
    // console.log('handleFormBlur', formData)
    fieldsUpdated(formData)
  }

  const handleDynamicFormValidate = async (formData, errors) => {
  
    if(!formData || Object.keys(formData).length === 0) return errors

    Object.keys(validationSchema).forEach(async name => {
        // // if (!prevForm.data || !prevForm.data[name] || formData[name] !== prevForm.data[name]) { // only validate the fields that changed (except validateAllFields is true)
            const error = await validateField(name, formData[name], validationSchema);                
            const valid = (typeof error === 'undefined' || error === '') ? true:false
            // console.log(name, ' Valid:', valid)
            if(!valid) errors[name].addError(error);
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
                  onError={(e) => console.log("form error", e)}  
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
