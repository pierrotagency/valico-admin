import React, { useState, useEffect } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap';
import Form from "react-jsonschema-form";

import Toggle from 'react-toggle';
import "react-toggle/style.css";

import './index.scss'


export default function({ 
  module,
  fieldsUpdated  
}) {

  const [schema, setSchema] = useState({})

  const [state, setState] = useState({
    liveReload: true
  })


  useEffect(() => {
    console.log('Module reload')

    if(module){
      console.log(module)
      import(`../../modules/${module.component}/schema.js`).then(mod => setSchema(mod.schema))      
    }
    
  }, [module]);


  const log = (type) => console.log.bind(console, type);

  function validate(formData, errors) {
    if (formData.pass1 !== formData.pass2) {
      errors.pass2.addError("Passwords don't match");
    }
    console.log(errors)
    return errors;
  }

  const formSubmit = (e) =>{
    fieldsUpdated(e.formData)
    console.log(e.formData)
  }

  const handleFormChange = (e) => {
    if(state.liveReload) formSubmit(e)
  }

  function handleToggleChange (key, event) {
    setState({ [key]: event.target.checked })
  }

  const handleLiveReloadToggle = handleToggleChange.bind(this, 'liveReload')

  return (
    <>
    {module &&     
      <Card>
        <CardBody>

          <h4 className="mt-0 header-title">{module && module.component}</h4>
          <p className="text-muted mb-4">Fields dynamically loaded according to <code>module</code>.</p>

          <Row className="form-group">                
            <Col sm="12">
              
              <div className="mb-2 ml-0">
                <label className="d-flex align-items-center mb-1">
                    <Toggle                      
                      defaultChecked={state.liveReload}
                      aria-label='Live Reload'
                      icons={false}
                      onChange={handleLiveReloadToggle}                    
                    />
                  <span className="ml-2">Live Edit</span>
                </label>
              </div>

            </Col>
          </Row>

          <Row className="form-group">                
            <Col sm="12">

              <Form schema={schema}
                onChange={handleFormChange}
                onSubmit={formSubmit}
                onError={log("errors")}    
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
