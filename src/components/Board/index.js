import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'

import withDroppable from '../withDroppable'
import { when, partialRight } from '../../helpers/utils'
import ModuleHandler from './components/ModuleHandler'
import ModuleEditor from './components/ModuleEditor'
import { 
  moveModule, 
  addModule, 
  removeModule, 
  cloneModule, 
  updateModuleFields
} from './services'

import Area from './components/Area'

import { library, templates } from 'valico-sanmartin'

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
  post,
  onPostUpdated,  
  disableModuleDrag
}) {
  
  const [currentModule, setCurrentModule] = useState()

  const handleOnModuleDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveModule  })
  
  const handlePostUpdate = (updatedPost) => {
    if(typeof(onPostUpdated) === 'function'){
      onPostUpdated(updatedPost)       
    }
  }

  function handleOnDragEnd({ source, destination }, { moveCallback, notifyCallback }) {
    const updatedPost = moveCallback(post, source, destination)
    when(notifyCallback)(callback => callback(updatedPost, source, destination))
    handlePostUpdate(updatedPost)
  }

  function handleModuleAdd(area, module, options = {}) {
    const updatedPost = addModule(post, library, area, module, options)    
    handlePostUpdate(updatedPost)
  }

  function handleModuleClone(area, module, options = {}) {
    const updatedPost = cloneModule(post, area, module, options)           
    handlePostUpdate(updatedPost)
  }

  function handleModuleRemove(area, module) {
    const updatedPost = removeModule(post, area, module)
    handlePostUpdate(updatedPost)   
  }

  function handleModuleEdit(area, module) {
    setCurrentModule(module); // TODO se salva? se tiene que salvar?
  }

  function handleModuleFielUpdated(fields) {
    const updatedPost = updateModuleFields(post, currentModule, fields)  
    handlePostUpdate(updatedPost)
  }

  return (
    <>

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
        {post}
      </BoardContainer>

    </>
  )
}

function BoardContainer({
  children: post,
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

  const Template = templates[post.template] ? templates[post.template].view : null;

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StyledBoard>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD' style={{width:'100%'}}>
          
          {Template &&
            <Template
                renderModule={renderModule}
                moduleAdded={handleModuleAdd}              
                disableModuleDrag={disableModuleDrag}
                library={library}
                className={post.template}
                Area={Area}
            >
              {post.content}
          </Template>
          }

        </DroppableBoard>
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board