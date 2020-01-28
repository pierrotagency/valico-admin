import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap';
import DynamicForm from '../../../DynamicForm'

import {log} from '../../../../helpers/log'
import "react-toggle/style.css";
import './index.scss'


export default function ModuleEditor({ 
  module,
  fieldsUpdated,
  library
}) {

  // const [live, setLive] = useState(true)
  
  const formSubmit = (e) => fieldsUpdated(e.formData)

  // const handleFormChange = (e) => live && formSubmit(e) 
  const handleFormChange = (e) => formSubmit(e) 
  
  // const handleLiveReloadToggle = (e) => setLive(e.target.checked) 

  function validate(formData, errors) {
    if (formData.pass1 !== formData.pass2) {
      errors.pass2.addError("Passwords don't match");
    }
    return errors;
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
                  onChange={handleFormChange}
                  onSubmit={formSubmit}
                  onError={log("form error")}    
                  validate={validate}
                  liveValidate={false}
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
