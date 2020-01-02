import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'


const ModuleTemplate = styled.div`
  display: inline-block;
  white-space: normal;
`
function Module({ children, index, renderModule, disableModuleDrag, module, modules }) {

  const Component = modules[module.component]

  return (
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableModuleDrag}>
      {(provided, { isDragging }) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} data-testid='module'>
            
            {/* acá esta lo del box */}
            <ModuleTemplate>{renderModule(isDragging)}</ModuleTemplate>           
            
            {typeof modules[module.component] !== "undefined" &&
              <Component title={module.title} />
            }
            
          </div>
        )
      }}
    </Draggable>
  )
}

export default Module
