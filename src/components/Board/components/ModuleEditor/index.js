import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap';

import DynamicForm from '../../../DynamicForm'
import "react-toggle/style.css";
import './index.scss'


export default function ModuleEditor({ 
  module,
  fieldsUpdated,
  library
}) {

  // const [live, setLive] = useState(true)
  
  // const handleFormChange = (e) => live && formSubmit(e) 
  const handleFormChange = (e) => fieldsUpdated(e.formData)
  
  // const handleLiveReloadToggle = (e) => setLive(e.target.checked) 


// TODO $·%$·%$·%$·%·%$·%$·$·$·%·%$·%·%$·%$·%$· VALIDATIONS AND UNDO RESTATE

  const handleDynamicFormValidate = async (formData, errors) => {
        
    // const validationSchema = taxonomies[form.taxonomy].validationSchema

    // if(!formData || Object.keys(formData).length === 0) return errors

    // // TODO set all errrors at once in state
    // Object.keys(validationSchema).forEach(async (name) => {
    //     // if (!prevForm.data || !prevForm.data[name] || formData[name] !== prevForm.data[name]) { // only validate the fields that changed (except validateAllFields is true)
    //         const error = await validateField(name, formData[name], validationSchema);                
    //         const valid = (typeof error === 'undefined' || error === '') ? true:false
    //         // console.log(name, ' Valid:', valid)
    //         if(!valid) errors[name].addError(error);
    //     // }
    // })

    return errors
}
  
  return (
    <>

      {module &&     


        <Card>
          <CardBody>
            {/* <h4 className="mt-0 header-title">{module && module.component}</h4>
            <p className="text-muted mb-4">Fields dynamically loaded according to <code>module</code>.</p> */}
            {/* <Row className="form-group">                
              <Col sm="12">              
                <div className="mb-2 ml-0">
                  <label className="d-flex align-items-center mb-1">
                      <Toggle defaultChecked={live} aria-label='Live Reload' icons={false} onChange={handleLiveReloadToggle} />
                    <span className="ml-2">Live Edit</span>
                  </label>
                </div>
              </Col>
            </Row> */}
            <Row className="form-group">                
              <Col sm="12">
                <DynamicForm schema={library[module.component].schema}
                  onBlur={handleFormChange}
                  // onSubmit={handleFormChange}
                  validate={handleDynamicFormValidate}
                  onError={(e) => console.log("form error", e)}  
                  liveValidate={true}
                  formData={module.fields}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      }

    </>
  )
}
