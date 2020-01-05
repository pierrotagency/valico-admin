import React, { useState, useEffect } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap';

import Form from "react-jsonschema-form";

export default function({ 
  module,
  fieldsUpdated  
}) {

  const [schema, setSchema] = useState({})


  useEffect(() => {

    if(module){
      console.log(module)
      const loadschema = import(`../../modules/${module.component}/schema.js`).then(mod => setSchema(mod.schema))      
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


  return (
    <>
    {module &&     
      <Card>
        <CardBody>

          <h4 className="mt-0 header-title">{module && module.component}</h4>
          <p className="text-muted mb-4">Here are examples of <code>.form-control</code> applied to each.</p>

          <Row className="form-group">                
            <Col sm="10">

              <Form schema={schema}
                onChange={log("changed")}
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
