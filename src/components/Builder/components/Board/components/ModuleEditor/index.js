import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Row, Col, Card, CardBody } from 'reactstrap';

const ModuleEditor = styled.div`
  margin-bottom: 7px;
`


export default function({ 
  module,
  moduleUpdated
}) {


  const [state, setState] = useState({})

  // const handleInputChange = (e) => setInput({
  //   ...input,
  //   [e.currentTarget.name]: e.currentTarget.value
  // })


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
    console.log('componentDidUpdate')
    

      setState(state => ({
        ...state,
        module: module
      }));
      
    
  }, [module]);


  const handleSaveChanges = () =>{
    
    moduleUpdated(state.module)
    


  }

  return (
    <ModuleEditor>

    {state.module &&     
     <Card>
        <CardBody>

            <h4 className="mt-0 header-title">{state.module && state.module.title}</h4>
            <p className="text-muted mb-4">Here are examples of <code>.form-control</code> applied to each
                textual HTML5 <code>&lt;input&gt;</code> <code>type</code>.</p>

            <Row className="form-group">
                <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Text</label>
                <Col sm="10">
                    {/* <input className="form-control" type="text" name="title" onChange={handleInputChange}  /> */}
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


    </ModuleEditor>
  )
}
