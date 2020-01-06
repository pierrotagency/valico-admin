import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'


const ModuleTemplate = styled.div`
  display: inline-block;
  white-space: normal;
`

const ModuleWrapper = styled.div`
  opacity: 1;
  
  ${({ dragging }) =>
    dragging &&
    `
    opacity: 0.5;
  `}
`


function Module({ children, index, renderModule, disableModuleDrag, module, library }) {

  const Component = library[module.component].component

  return (
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableModuleDrag}>
      {(provided, { isDragging }) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            
            {/* acá esta lo del box */}
            <ModuleTemplate>{renderModule(isDragging)}</ModuleTemplate>           
            
            
            {typeof library[module.component].component !== "undefined" &&
              (
                <ModuleWrapper dragging={isDragging}>
                  <Component fields={module.fields}/>
                </ModuleWrapper>
              )
            }
            
            
          </div>
        )
      }}
    </Draggable>
  )
}

export default Module
