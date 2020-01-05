import React from 'react'
import styled from 'styled-components'

const ModuleHandler = styled.div`
  border-radius: 3px;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 7px;

  ${({ dragging }) =>
    dragging &&
    `
    box-shadow: 2px 2px grey;
  `}
`

const ModuleTitle = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`

const CursorPointer =  styled.span`
  cursor: pointer;
`


export default function({ 
  children: module, 
  dragging, 
  allowRemoveModule, 
  onModuleRemove,
  onModuleEdit
}) {
  return (
    <ModuleHandler dragging={dragging}>      
        <ModuleTitle>         
          {allowRemoveModule && <CursorPointer onClick={() => onModuleRemove(module)}>DEL</CursorPointer>}
          <CursorPointer onClick={() => onModuleEdit(module)}>EDIT</CursorPointer>
        </ModuleTitle>      
    </ModuleHandler>
  )
}
