import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Foo from "../../modules/Foo";
import Bar from "../../modules/Bar";

const ModuleTemplate = styled.div`
  display: inline-block;
  white-space: normal;
`

const Components = {
  foo: Foo,
  bar: Bar
};



function Module({ children, index, renderModule, disableModuleDrag, module }) {
  return (
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableModuleDrag}>
      {(provided, { isDragging }) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} data-testid='module'>
            
            {/* acá esta lo del box */}
            <ModuleTemplate>{renderModule(isDragging)}</ModuleTemplate>           
            
            {typeof Components[module.component] !== "undefined" &&
              React.createElement(Components[module.component], {
                key: module.id,
                title: module.title
              })
            }
            
          </div>
        )
      }}
    </Draggable>
  )
}

export default Module
