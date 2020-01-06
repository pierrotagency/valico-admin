import React from 'react'
import styled from 'styled-components'

const ModuleHandler = styled.div`  
  margin-bottom: 0px;

  ${({ dragging }) =>
    dragging &&
    `
    opacity: 0;
  `}
`

const ModuleTitle = styled.div`    
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`

export default function({ 
  children: module, 
  dragging, 
  onModuleRemove,
  onModuleEdit,
  onModuleClone
}) {
  return (
    <ModuleHandler dragging={dragging}>      
        <ModuleTitle>             
          <div className="btn-group mb-2 mb-sm-0">
              <button type="button" className="btn btn-primary waves-light waves-effect" onClick={() => onModuleClone(module)}><i className="far fa-copy"></i></button>
              <button type="button" className="btn btn-primary waves-light waves-effect" onClick={() => onModuleEdit(module)}><i className="fas fa-pencil-alt"></i></button>
              <button type="button" className="btn btn-primary waves-light waves-effect" onClick={() => onModuleRemove(module)}><i className="far fa-trash-alt"></i></button>
          </div>               
        </ModuleTitle>      
    </ModuleHandler>
  )
}
