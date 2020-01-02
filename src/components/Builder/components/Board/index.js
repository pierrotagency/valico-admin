import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'

import withDroppable from '../withDroppable'
import { when, partialRight } from '../../../../helpers/utils'
import ModuleHandler from './components/ModuleHandler'
import { moveModule, addModule, removeModule } from './services'

import Layout1 from './layouts/Layout1'

import { library } from "./ModuleLibraryLoader";


import { Row, Col, Card, CardBody } from 'reactstrap';


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

  return (
    <>


      <Card>
        <CardBody>

            <h4 className="mt-0 header-title">Textual Inputs</h4>
            <p className="text-muted mb-4">Here are examples of <code>.form-control</code> applied to each
                textual HTML5 <code>&lt;input&gt;</code> <code>type</code>.</p>

            <Row className="form-group">
                <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Text</label>
                <Col sm="10">
                    <input className="form-control" type="text" value="Artisanal kale" id="example-text-input" />
                </Col>
            </Row>
            
        </CardBody>
      </Card>


      <BoardContainer
        onModuleDragEnd={handleOnModuleDragEnd}      
        handleModuleAdd={handleModuleAdd}
        renderModule={(area, module, dragging) => {
          
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
