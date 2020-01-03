import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'

import withDroppable from '../withDroppable'
import { when, partialRight } from '../../../../helpers/utils'
import ModuleHandler from './components/ModuleHandler'
import ModuleEditor from './components/ModuleEditor'
import { moveModule, addModule, removeModule } from './services'

import Layout1 from './layouts/Layout1'

import { library } from "./ModuleLibraryLoader";


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
  onModuleEdit,
  onModuleAdded,
  allowRemoveModule,
  disableModuleDrag
}) {

  const [board, setBoard] = useState(initialBoard)
  
  const [currentModule, setCurrentModule] = useState(initialBoard)

  const handleOnModuleDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveModule, notifyCallback: onModuleDragEnd })
  

  useEffect(() => {

      console.log(library);

  },[])



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


  function handleModuleEdit(area, module) {

    setCurrentModule(module);

    // const boardWithoutModule = removeModule(board, area, module)
    // onModuleRemove(
    //   boardWithoutModule,
    //   boardWithoutModule.areas.find(({ id }) => id === area.id),
    //   module
    // )
    // setBoard(boardWithoutModule)
  }


  function handleModuleUpdated(module) {

    console.log(module)
    
    // const boardWithoutModule = removeModule(board, area, module)
    // onModuleRemove(
    //   boardWithoutModule,
    //   boardWithoutModule.areas.find(({ id }) => id === area.id),
    //   module
    // )
    // setBoard(boardWithoutModule)
  }


  return (
    <>

      <ModuleEditor
        moduleUpdated={handleModuleUpdated}
      >
        {currentModule}
      </ModuleEditor>

      <BoardContainer
        onModuleDragEnd={handleOnModuleDragEnd}      
        handleModuleAdd={handleModuleAdd}
        renderModule={(area, module, dragging) => {
          
          return (
            <ModuleHandler
              dragging={dragging}
              allowRemoveModule={allowRemoveModule}
              onModuleRemove={module => handleModuleRemove(area, module)}
              onModuleEdit={module => handleModuleEdit(area, module)}
            >
              {module}
            </ModuleHandler>
          )

        }}      
        disableModuleDrag={disableModuleDrag}
        library={library}
      >
        {board}
      </BoardContainer>



    </>
  )
}

function BoardContainer({
  children: board,
  renderModule,
  disableModuleDrag,   
  onModuleDragEnd,
  handleModuleAdd,
  library
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
          
          <Layout1
              renderModule={renderModule}
              moduleAdded={handleModuleAdd}              
              disableModuleDrag={disableModuleDrag}
              library={library}
          >
            {board.areas}
          </Layout1>

        </DroppableBoard>
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board
