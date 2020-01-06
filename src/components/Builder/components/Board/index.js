import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'

import withDroppable from '../withDroppable'
import { when, partialRight } from '../../../../helpers/utils'
import ModuleHandler from './components/ModuleHandler'
import ModuleEditor from './components/ModuleEditor'
import { 
  moveModule, 
  addModule, 
  removeModule, 
  cloneModule, 
  updateModuleFields,
  changeLayout
 } from './services'

 import MenuSettings from './components/MenuSettings';

import Area from './components/Area'

import { library, layouts } from 'valico-sanmartin'

const StyledBoard = styled.div`
  padding: 5px;
  overflow-y: hidden;
  display: flex;
  align-items: flex-start;
`

const Areas = styled.div`
  white-space: nowrap;
  width: 100%; 
`


const StyledMenuSettings = styled.div`
  text-align: right;
  display: block;
  width: 100%;
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
  initialPage,
  onModuleDragEnd,
  onModuleRemove,
  onModuleEdit,
  onModuleAdded,
  disableModuleDrag
}) {

  const [page, setPage] = useState(initialPage)
  
  const [currentModule, setCurrentModule] = useState()

  const handleOnModuleDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveModule, notifyCallback: onModuleDragEnd })
  

  function handleOnDragEnd({ source, destination }, { moveCallback, notifyCallback }) {
    const reorderedBoard = moveCallback(page, source, destination)
    when(notifyCallback)(callback => callback(reorderedBoard, source, destination))
    setPage(reorderedBoard)
  }

  function handleModuleAdd(area, module, options = {}) {
    const pageWithNewModule = addModule(page, library, area, module, options)    
    onModuleAdded(
      pageWithNewModule,
      pageWithNewModule.areas.find(({ id }) => id === area.id),
      module
    )
    setPage(pageWithNewModule)
  }

  function handleModuleClone(area, module, options = {}) {
    const pageWithNewModule = cloneModule(page, area, module, options)        
    // onModuleCloned(
    //   pageWithNewModule,
    //   pageWithNewModule.areas.find(({ id }) => id === area.id),
    //   module
    // )
    setPage(pageWithNewModule)
  }

  function handleModuleRemove(area, module) {
    const pageWithoutModule = removeModule(page, area, module)
    onModuleRemove(
      pageWithoutModule,
      pageWithoutModule.areas.find(({ id }) => id === area.id),
      module
    )
    setPage(pageWithoutModule)
  }

  function handleModuleEdit(area, module) {
    setCurrentModule(module);
  }

  function handleModuleFielUpdated(fields) {
    const pageModified = updateModuleFields(page, currentModule, fields)  
    // console.log(pageModified)
    setPage(pageModified)
  }


  function handleLayoutChange(layoutName) {
    const pageWithSetLayout = changeLayout(page,layoutName)        
    setPage(pageWithSetLayout)
  }


  return (
    <>

      <StyledMenuSettings>
        <MenuSettings                                           
          onChangeLayout={(layoutName) => handleLayoutChange(layoutName)}
        />
      </StyledMenuSettings>

      <ModuleEditor
        fieldsUpdated={handleModuleFielUpdated}
        module={currentModule}
        library={library}
      >
      </ModuleEditor>

      <BoardContainer
        onModuleDragEnd={handleOnModuleDragEnd}      
        handleModuleAdd={handleModuleAdd}        
        renderModule={(area, module, dragging) => {
          
          return (
            <ModuleHandler
              dragging={dragging}              
              onModuleRemove={module => handleModuleRemove(area, module)}
              onModuleEdit={module => handleModuleEdit(area, module)}
              onModuleClone={module => handleModuleClone(area, module)}
            >
              {module}
            </ModuleHandler>
          )

        }}      
        disableModuleDrag={disableModuleDrag}
        library={library}
      >
        {page}
      </BoardContainer>

    </>
  )
}

function BoardContainer({
  children: page,
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

  const Layout = layouts[page.layout].view;

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StyledBoard>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD' style={{width:'100%'}}>
          
          <Layout
              renderModule={renderModule}
              moduleAdded={handleModuleAdd}              
              disableModuleDrag={disableModuleDrag}
              library={library}
              className={page.layout}
              Area={Area}
          >
            {page.areas}
          </Layout>

        </DroppableBoard>
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board
