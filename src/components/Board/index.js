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
  updateModuleFields,
  changeTemplate
 } from './services'

 import MenuSettings from './components/MenuSettings';

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
  initialPost,
  onModuleDragEnd,
  onModuleRemove,
  onModuleEdit,
  onModuleAdded,
  onPostSave,
  disableModuleDrag
}) {

  const [post, setPost] = useState(initialPost)
  
  const [currentModule, setCurrentModule] = useState()

  const handleOnModuleDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveModule, notifyCallback: onModuleDragEnd })
  

  function handleOnDragEnd({ source, destination }, { moveCallback, notifyCallback }) {
    const reorderedBoard = moveCallback(post, source, destination)
    when(notifyCallback)(callback => callback(reorderedBoard, source, destination))
    setPost(reorderedBoard)
  }

  function handleModuleAdd(area, module, options = {}) {
    const postWithNewModule = addModule(post, library, area, module, options)    
    onModuleAdded(
      postWithNewModule,
      postWithNewModule.content.find(({ id }) => id === area.id),
      module
    )
    setPost(postWithNewModule)
  }

  function handleModuleClone(area, module, options = {}) {
    const postWithNewModule = cloneModule(post, area, module, options)        
    // onModuleCloned(
    //   postWithNewModule,
    //   postWithNewModule.content.find(({ id }) => id === area.id),
    //   module
    // )
    setPost(postWithNewModule)
  }

  function handleModuleRemove(area, module) {
    const postWithoutModule = removeModule(post, area, module)
    onModuleRemove(
      postWithoutModule,
      postWithoutModule.content.find(({ id }) => id === area.id),
      module
    )
    setPost(postWithoutModule)
  }

  function handleModuleEdit(area, module) {
    setCurrentModule(module);
  }

  function handleModuleFielUpdated(fields) {
    const postModified = updateModuleFields(post, currentModule, fields)  
    // console.log(postModified)
    setPost(postModified)
  }


  function handleTemplateChange(templateName) {
    const postWithSetTemplate = changeTemplate(post,templateName)        
    setPost(postWithSetTemplate)
  }

  function handlePostSave() {
    onPostSave(post)    
  }


  return (
    <>

      <StyledMenuSettings>
        <MenuSettings                                           
          onChangeTemplate={(templateName) => handleTemplateChange(templateName)}
          onClickSave={() => handlePostSave()}
          currentTemplate={post.template}
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

  const Template = templates[post.template].view;

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StyledBoard>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD' style={{width:'100%'}}>
          
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

        </DroppableBoard>
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board
