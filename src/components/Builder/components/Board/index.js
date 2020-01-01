import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Area from './components/Area'
import withDroppable from '../withDroppable'
import { when, partialRight } from '../../../../helpers/utils'

import ModuleHandler from './components/ModuleHandler'
import { moveModule, addModule, removeModule } from './services'

const StyledBoard = styled.div`
  padding: 5px;
  overflow-y: hidden;
  display: flex;
  align-items: flex-start;
`

const Areas = styled.div`
  white-space: nowrap;
`

function getCoordinates(event) {
  if (event.destination === null) return {}

  const areaSource = { fromPosition: event.source.index }
  const areaDestination = { toPosition: event.destination.index }

  return {
    source: { ...areaSource, fromAreaId: parseInt(event.source.droppableId) },
    destination: { ...areaDestination, toAreaId: parseInt(event.destination.droppableId) }
  }
}

const DroppableBoard = withDroppable(Areas)


function Board({
  initialBoard,
  onModuleDragEnd,
  onModuleRemove,
  onModuleAdded,
  allowRemoveModule,
  disableModuleDrag
}) {

  const [board, setBoard] = useState(initialBoard)

  const handleOnModuleDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveModule, notifyCallback: onModuleDragEnd })
  
  function handleOnDragEnd({ source, destination }, { moveCallback, notifyCallback }) {
    const reorderedBoard = moveCallback(board, source, destination)
    when(notifyCallback)(callback => callback(reorderedBoard, source, destination))
    setBoard(reorderedBoard)
  }


  function handleModuleAdd(area, module, options = {}) {

    const boardWithNewModule = addModule(board, area, module, options)
    
    onModuleAdded(
      boardWithNewModule,
      boardWithNewModule.areas.find(({ id }) => id === area.id),
      module
    )

    setBoard(boardWithNewModule)
  
  }

  function handleModuleRemove(area, module) {
    const boardWithoutModule = removeModule(board, area, module)
    onModuleRemove(
      boardWithoutModule,
      boardWithoutModule.areas.find(({ id }) => id === area.id),
      module
    )
    setBoard(boardWithoutModule)
  }

  return (
    <BoardContainer
      onModuleDragEnd={handleOnModuleDragEnd}      
      handleModuleAdd={handleModuleAdd}
      renderModule={(area, module, dragging) => {
        
        // if (renderModule) return renderModule(module, { removeModule: handleModuleRemove.bind(null, area, module), dragging })
        
        return (
          <ModuleHandler
            dragging={dragging}
            allowRemoveModule={allowRemoveModule}
            onModuleRemove={module => handleModuleRemove(area, module)}
          >
            {module}
          </ModuleHandler>
        )

      }}      
      disableModuleDrag={disableModuleDrag}
    >
      {board}
    </BoardContainer>
  )
}

function BoardContainer({
  children: board,
  renderModule,
  disableModuleDrag,   
  onModuleDragEnd,
  handleModuleAdd
}) {

  function handleOnDragEnd(event) {
    const coordinates = getCoordinates(event)
    if (!coordinates.source) return
    onModuleDragEnd(coordinates)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StyledBoard>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD'>
          
          
          {board.areas.map((area, index) => (              
            <Area
              key={area.id}
              index={index}
              renderModule={renderModule}
              moduleAdded={handleModuleAdd}              
              disableModuleDrag={disableModuleDrag}
            >
              {area}
            </Area>            
          ))}
          
          
        </DroppableBoard>
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board
