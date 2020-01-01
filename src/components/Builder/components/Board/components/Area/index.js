import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Module from '../Module'
import withDroppable from '../../../withDroppable'

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

function Area({ children, index: areaIndex, renderModule, renderAreaHandler, disableAreaDrag, disableModuleDrag }) {
  return (
    <Draggable draggableId={`area-draggable-${children.id}`} index={areaIndex} isDragDisabled={disableAreaDrag}>
      {areaProvided => (
        <StyledArea ref={areaProvided.innerRef} {...areaProvided.draggableProps}>
          <div {...areaProvided.dragHandleProps}>
            {renderAreaHandler(children)}
          </div>
          <DroppableArea droppableId={String(children.id)}>
            {(children.modules && children.modules.length) && (
              children.modules.map((module, index) => (
                <Module
                  key={module.id}
                  module={module}
                  index={index}
                  renderModule={dragging => renderModule(children, module, dragging)}
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
