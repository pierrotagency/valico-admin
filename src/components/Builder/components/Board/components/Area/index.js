import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import Module from '../Module'
import withDroppable from '../../../withDroppable'
import AreaHandler from '../AreaHandler'

export const StyledArea = styled.div`  
  background-color: #eee;  
  vertical-align: top;
`

const DroppableArea = withDroppable(styled.div`
  min-height: 28px; 
`)

function Area({ 
  children: areas, 
  index: areaIndex, 
  renderModule, 
  moduleAdded, 
  disableModuleDrag, 
  library, 
  name ,
  className
}) {

  const area = areas.find(e => e.name === name)

  return (
    <Draggable draggableId={`area-draggable-${area.id}`} index={areaIndex} isDragDisabled={true}>
      {areaProvided => (
        <StyledArea ref={areaProvided.innerRef} {...areaProvided.draggableProps} className={className}>
          
          <div {...areaProvided.dragHandleProps}>            
              <AreaHandler
                moduleAdded={moduleAdded}
                library={library}
              >
                {area}
              </AreaHandler>
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
                  library={library}
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
