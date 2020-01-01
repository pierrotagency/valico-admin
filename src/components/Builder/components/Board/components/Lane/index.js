import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Module from '../Module'
import withDroppable from '../../../withDroppable'

export const StyledLane = styled.div`
  height: 100%;
  display: inline-block;
  padding: 15px;
  border-radius: 2px;
  background-color: #eee;
  margin: 5px;
  vertical-align: top;
`

const DroppableLane = withDroppable(styled.div`
  min-height: 28px;
`)

function Lane({ children, index: laneIndex, renderModule, renderLaneHeader, disableLaneDrag, disableModuleDrag }) {
  return (
    <Draggable draggableId={`lane-draggable-${children.id}`} index={laneIndex} isDragDisabled={disableLaneDrag}>
      {laneProvided => (
        <StyledLane ref={laneProvided.innerRef} {...laneProvided.draggableProps}>
          <div {...laneProvided.dragHandleProps}>
            {renderLaneHeader(children)}
          </div>
          <DroppableLane droppableId={String(children.id)}>
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
          </DroppableLane>
        </StyledLane>
      )}
    </Draggable>
  )
}

export default Lane
