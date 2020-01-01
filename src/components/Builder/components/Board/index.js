import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Area from './components/Area'
import withDroppable from '../withDroppable'
import { when, partialRight } from '../../../../helpers/utils'
import AreaHandler from './components/AreaHandler'
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

function isAAreaMove(type) {
  return type === 'BOARD'
}

function getCoordinates(event) {
  if (event.destination === null) return {}

  const areaSource = { fromPosition: event.source.index }
  const areaDestination = { toPosition: event.destination.index }

  if (isAAreaMove(event.type)) {
    return { source: areaSource, destination: areaDestination }
  }

  return {
    source: { ...areaSource, fromAreaId: parseInt(event.source.droppableId) },
    destination: { ...areaDestination, toAreaId: parseInt(event.destination.droppableId) }
  }
}

const DroppableBoard = withDroppable(Areas)


function Board({
  initialBoard,
  onModuleDragEnd,
  onModuleNew,
  renderModule,
  allowRemoveModule,
  onModuleRemove,
  onModuleAdded,
  disableModuleDrag,
  disableAreaDrag
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
      disableAreaDrag={disableAreaDrag}
      disableModuleDrag={disableModuleDrag}
    >
      {board}
    </BoardContainer>
  )
}

function BoardContainer({
  children: board,
  renderModule,
  disableAreaDrag,
  disableModuleDrag,
  renderAreaHandler,
  onAreaDragEnd,
  onModuleDragEnd,
  handleModuleAdd
}) {

  function handleOnDragEnd(event) {
    const coordinates = getCoordinates(event)
    if (!coordinates.source) return

    isAAreaMove(event.type) ? onAreaDragEnd(coordinates) : onModuleDragEnd(coordinates)
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
              renderAreaHandler={area =>
                renderAreaHandler ? (
                  renderAreaHandler(area)
                ) : (
                  <>
                    <AreaHandler >
                      {area}
                    </AreaHandler>
                    <button onClick={() => handleModuleAdd(area, { title: 'New module', description: 'Module content', component: "foo" })}>New module</button>  
                  </>
                )
              }
              disableAreaDrag={disableAreaDrag}
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
