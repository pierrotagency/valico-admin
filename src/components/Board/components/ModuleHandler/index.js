import React from 'react'
import styled from 'styled-components'

const StyledModuleHandler = styled.div` 
  position: absolute;
  right: 0;

  ${({ dragging }) =>
    dragging &&
    `
    opacity: 0;
  `}
`


export default function ModuleHandler({ 
  children: module, 
  dragging, 
  onModuleRemove,
  onModuleEdit,
  onModuleClone
}) {
  return (
    <StyledModuleHandler dragging={dragging}>                      
      <div className="btn-group mb-2 mb-sm-0">
          <button type="button" className="btn btn-primary waves-light waves-effect" onClick={() => onModuleClone(module)}><i className="far fa-copy"></i></button>
          <button type="button" className="btn btn-primary waves-light waves-effect" onClick={() => onModuleEdit(module)}><i className="fas fa-pencil-alt"></i></button>
          <button type="button" className="btn btn-primary waves-light waves-effect" onClick={() => onModuleRemove(module)}><i className="far fa-trash-alt"></i></button>
      </div>                         
    </StyledModuleHandler>
  )
}
