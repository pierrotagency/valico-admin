import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from './components/Lane'
import withDroppable from '../withDroppable'
import { when, partialRight } from '../../../../helpers/utils'
import LaneHeader from './components/LaneHeader'
import ModuleHandler from './components/ModuleHandler'
import { moveModule, addModule, removeModule } from './services'

const StyledBoard = styled.div`
  padding: 5px;
  overflow-y: hidden;
  display: flex;
  align-items: flex-start;
`

const Lanes = styled.div`
  white-space: nowrap;
`

function isALaneMove(type) {
  return type === 'BOARD'
}

function getCoordinates(event) {
  if (event.destination === null) return {}

  const laneSource = { fromPosition: event.source.index }
  const laneDestination = { toPosition: event.destination.index }

  if (isALaneMove(event.type)) {
    return { source: laneSource, destination: laneDestination }
  }

  return {
    source: { ...laneSource, fromLaneId: parseInt(event.source.droppableId) },
    destination: { ...laneDestination, toLaneId: parseInt(event.destination.droppableId) }
  }
}

const DroppableBoard = withDroppable(Lanes)


function Board({
  initialBoard,
  onModuleDragEnd,
  onModuleNew,
  renderModule,
  allowRemoveModule,
  onModuleRemove,
  onModuleAdded,
  disableModuleDrag,
  disableLaneDrag
}) {

  const [board, setBoard] = useState(initialBoard)

  const handleOnModuleDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveModule, notifyCallback: onModuleDragEnd })
  
  function handleOnDragEnd({ source, destination }, { moveCallback, notifyCallback }) {
    const reorderedBoard = moveCallback(board, source, destination)
    when(notifyCallback)(callback => callback(reorderedBoard, source, destination))
    setBoard(reorderedBoard)
  }


  function handleModuleAdd(lane, module, options = {}) {

    const boardWithNewModule = addModule(board, lane, module, options)
    
    onModuleAdded(
      boardWithNewModule,
      boardWithNewModule.lanes.find(({ id }) => id === lane.id),
      module
    )

    setBoard(boardWithNewModule)
  
  }

  function handleModuleRemove(lane, module) {
    const boardWithoutModule = removeModule(board, lane, module)
    onModuleRemove(
      boardWithoutModule,
      boardWithoutModule.lanes.find(({ id }) => id === lane.id),
      module
    )
    setBoard(boardWithoutModule)
  }

  return (
    <BoardContainer
      onModuleDragEnd={handleOnModuleDragEnd}      
      handleModuleAdd={handleModuleAdd}
      renderModule={(lane, module, dragging) => {
        
        // if (renderModule) return renderModule(module, { removeModule: handleModuleRemove.bind(null, lane, module), dragging })
        
        return (
          <ModuleHandler
            dragging={dragging}
            allowRemoveModule={allowRemoveModule}
            onModuleRemove={module => handleModuleRemove(lane, module)}
          >
            {module}
          </ModuleHandler>
        )

      }}
      disableLaneDrag={disableLaneDrag}
      disableModuleDrag={disableModuleDrag}
    >
      {board}
    </BoardContainer>
  )
}

function BoardContainer({
  children: board,
  renderModule,
  disableLaneDrag,
  disableModuleDrag,
  renderLaneHeader,
  onLaneDragEnd,
  onModuleDragEnd,
  handleModuleAdd
}) {

  function handleOnDragEnd(event) {
    const coordinates = getCoordinates(event)
    if (!coordinates.source) return

    isALaneMove(event.type) ? onLaneDragEnd(coordinates) : onModuleDragEnd(coordinates)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StyledBoard>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD'>
          {board.lanes.map((lane, index) => (              
            <Lane
              key={lane.id}
              index={index}
              renderModule={renderModule}
              renderLaneHeader={lane =>
                renderLaneHeader ? (
                  renderLaneHeader(lane)
                ) : (
                  <>
                    <LaneHeader >
                      {lane}
                    </LaneHeader>
                    <button onClick={() => handleModuleAdd(lane, { title: 'New module', description: 'Module content', component: "foo" })}>New module</button>  
                  </>
                )
              }
              disableLaneDrag={disableLaneDrag}
              disableModuleDrag={disableModuleDrag}
            >
              {lane}
            </Lane>            
          ))}
          
        </DroppableBoard>
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board
