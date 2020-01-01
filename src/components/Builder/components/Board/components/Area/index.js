import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Module from '../Module'
import withDroppable from '../../../withDroppable'

import AreaHandler from '../AreaHandler'

export const StyledArea = styled.div`
  height: 100%;
  display: inline-block;
  padding: 15px;
  border-radius: 2px;
  background-color: #eee;
  margin: 5px;
  vertical-align: top;
`

const DroppableArea = withDroppable(styled.div`
  min-height: 28px;
`)

function Area({ children: area, index: areaIndex, renderModule, moduleAdded, disableModuleDrag }) {
  return (
    <Draggable draggableId={`area-draggable-${area.id}`} index={areaIndex} isDragDisabled={true}>
      {areaProvided => (
        <StyledArea ref={areaProvided.innerRef} {...areaProvided.draggableProps}>
          <div {...areaProvided.dragHandleProps}>
            
              <AreaHandler >
                {area}
              </AreaHandler>
              <button onClick={() => moduleAdded(area, { title: 'New module', description: 'Module content', component: "foo" })}>New module</button>  
            
          </div>
          <DroppableArea droppableId={String(area.id)}>
            {(area.modules && area.modules.length) && (
              area.modules.map((module, index) => (
                <Module
                  key={module.id}
                  module={module}
                  index={index}
                  renderModule={dragging => renderModule(area, module, dragging)}
                  disableModuleDrag={disableModuleDrag}
                >
                  {module}
                </Module>
              ))
            )}
          </DroppableArea>
        </StyledArea>
      )}
    </Draggable>
  )
}

export default Area
