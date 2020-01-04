import React, { useState, useEffect } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap';

import Form from "react-jsonschema-form";

export default function({ 
  module,
  moduleUpdated,
  libraryDefinition
}) {

  const [state, setState] = useState({})

  async function updateInput({ name, value }) {
    
    setState(state => ({
      ...state,
      module: {
        ...state.module,
        fields: {       
          ...state.module.fields,
          [name]: value
          }      
        }
      }
      
    ));


  }



  useEffect(() => {
    console.log('1111')
    // console.log(libraryDefinition)
    
    
  }, [libraryDefinition]);



  useEffect(() => {

    setState(state => ({
      ...state,
      module: module
    }));
    
    
  }, [module]);


  const handleSaveChanges = () =>{

    moduleUpdated(state.module)
    
  }


  const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
      title: {type: "string", title: "Title", default: "A new task"},
      done: {type: "boolean", title: "Done?", default: false}
    }
  };
  
  const log = (type) => console.log.bind(console, type);


  return (
    <>
    {state.module &&     
      <Card>
        <CardBody>

          <h4 className="mt-0 header-title">{state.module && state.module.title}</h4>
          <p className="text-muted mb-4">Here are examples of <code>.form-control</code> applied to each
              textual HTML5 <code>&lt;input&gt;</code> <code>type</code>.</p>

          <Row className="form-group">
            <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Text</label>
            <Col sm="10">
              
              <input className="form-control" type="text" 
                name="title"   
                value={state.module.fields.title}
                onChange={e => updateInput({ name: e.target.name, value: e.target.value })}                      
              />

            </Col>
          </Row>

          <Row className="form-group">                
            <Col sm="10">
              <button type="button" className="btn btn-primary" onClick={handleSaveChanges}> Save</button>
            </Col>
          </Row>
            
        </CardBody>
      </Card>
    }

      <Form schema={schema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}    
      />

    </>
  )
}
