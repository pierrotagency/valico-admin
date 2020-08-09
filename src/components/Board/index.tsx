import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import { Modal } from "reactstrap";
import cloneDeep from 'lodash.clonedeep';
import { Post } from '../../models/Post'
import { Area } from '../../models/Area'
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

import { Area as AreaComponent } from './components/Area'

import {
  findModuleInPost
} from '../../helpers/post'

import { library, templates, taxonomies } from 'valico-sanmartin'
import { Module } from '../../models/Module';

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

function getCoordinates(event: any) {
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
  onPostUpdated
} : { post: Post, onPostUpdated: any }) {
  
  const [currentModule, setCurrentModule] = useState<Module>()

  // if module is updated, outside a cloned post is saved, so i need to reinstance current module (3 days problem with nested props)
  useEffect(() => {

    if(currentModule){
      const module = findModuleInPost(post, 'id', currentModule.id);
      if(module) setCurrentModule(module);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const handleOnModuleDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveModule  })
  
  const handlePostUpdate = (updatedPost: Post) => {
    if(typeof(onPostUpdated) === 'function'){
      onPostUpdated(updatedPost)       
    }
  }

  function handleOnDragEnd({ source, destination }: any, { moveCallback, notifyCallback }: any) {
    const updatedPost = moveCallback(post, source, destination)
    when(notifyCallback)((callback: any) => callback(updatedPost, source, destination))
    handlePostUpdate(updatedPost)
  }

  function handleModuleAdd(area: Area, module: Module) {
    const updatedPost = addModule(post, library, area, module, true)    
    handlePostUpdate(updatedPost)
  }

  function handleModuleClone(area: Area, module: Module) {
    const updatedPost = cloneModule(post, area, module)           
    handlePostUpdate(updatedPost)
  }

  function handleModuleRemove(area: Area, module: Module) {
    const updatedPost = removeModule(post, area, module)
    handlePostUpdate(updatedPost)   
  }

  function handleModuleEdit(module: Module) {
    setCurrentModule(module);
  }

  function handleModuleFieldsUpdated(fields: any) {
    // cloneDeep or yhe fucnking undo state not working! (3 days with this problem)
    const updatedPost = updateModuleFields(cloneDeep(post), currentModule, fields)  
    handlePostUpdate(updatedPost)
  }

  function handleCloseEditorClick() {
    setCurrentModule(undefined); 
  }
  
  const validationSchema = post && taxonomies[post.taxonomy] ? taxonomies[post.taxonomy].validationSchema : null;
  console.log('validationSchema',validationSchema,post);

  return (
    <>
      <BoardContainer
        onModuleDragEnd={handleOnModuleDragEnd}      
        handleModuleAdd={handleModuleAdd}        
        renderModule={(area: Area, module: Module, dragging: boolean) => {
          
          return (
            <ModuleHandler
              dragging={dragging}              
              onModuleRemove={(module: Module) => handleModuleRemove(area, module)}
              onModuleEdit={(module: Module) => handleModuleEdit(module)}
              onModuleClone={(module: Module) => handleModuleClone(area, module)}
            >
              {module}
            </ModuleHandler>
          )

        }}      
        library={library}
        post={post}
      />        

      <Modal
        className="modal-lg"
        isOpen={currentModule ? true : false}              
      >
        <div className="modal-header">
          <h5
            className="modal-title mt-0"
            id="myLargeModalLabel"
          >
            Edit Module
          </h5>
          <button
            onClick={handleCloseEditorClick}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">

        <ModuleEditor
              fieldsUpdated={handleModuleFieldsUpdated}
              module={currentModule}
              library={library}
              validationSchema={validationSchema}
              
            />  
          <p>
            Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Vivamus sagittis lacus vel augue
            laoreet rutrum faucibus dolor auctor.
          </p>       
        </div>
      </Modal>
    </>
  )
}

function BoardContainer({
  post,
  renderModule, 
  onModuleDragEnd,
  handleModuleAdd,
  library
} : { post: Post, renderModule: any, onModuleDragEnd: any, handleModuleAdd: any, library: any}) {

  function handleOnDragEnd(event: any) {
    const coordinates = getCoordinates(event)
    if (!coordinates.source) return
    onModuleDragEnd(coordinates)
  }

  const Template = post && templates[post.template] ? templates[post.template].view : null;
  
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StyledBoard>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD' style={{width:'100%'}}>
          
          {Template &&
            <Template
                renderModule={renderModule}
                moduleAdded={handleModuleAdd}              
                library={library}
                className={post.template}
                Area={AreaComponent}
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