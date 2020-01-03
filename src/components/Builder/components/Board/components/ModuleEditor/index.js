import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Row, Col, Card, CardBody } from 'reactstrap';



const ModuleEditor = styled.div`
  margin-bottom: 7px;
`



export default function({ 
  children: module,
  moduleUpdated
}) {


  const [state, setState] = useState({
    fields: {
      title: {
        value: ""
      } 
    }
  })

  // const handleInputChange = (e) => setInput({
  //   ...input,
  //   [e.currentTarget.name]: e.currentTarget.value
  // })


  async function updateInput({ name, value }) {
    let hasError;
    // if (!validateAgainst) hasError = await inputValidations({ name, value });
    setState(state => ({
      ...state,
      fields: {       
        ...state.fields,
        [name]: {
          value: value,
          error: hasError ? hasError : "",
          completed: hasError ? false : true
        }      
      }
    }));
  }



  useEffect(() => {

    console.log('fields');

    moduleUpdated(state)

  },[moduleUpdated, state, state.fields])




  return (
    <ModuleEditor>
     
     <Card>
        <CardBody>

            <h4 className="mt-0 header-title">{module && module.title}</h4>
            <p className="text-muted mb-4">Here are examples of <code>.form-control</code> applied to each
                textual HTML5 <code>&lt;input&gt;</code> <code>type</code>.</p>

            <Row className="form-group">
                <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Text</label>
                <Col sm="10">
                    {/* <input className="form-control" type="text" name="title" onChange={handleInputChange}  /> */}
                    <input className="form-control" type="text" 
                      name="title"   
                      value={state.fields.title.value}
                      onChange={e => updateInput({ name: e.target.name, value: e.target.value })}
                      error={state.fields.title.error ? state.fields.title.error : null}
                    />
                </Col>
            </Row>
            
        </CardBody>
      </Card>


    </ModuleEditor>
  )
}
