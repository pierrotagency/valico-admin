import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Foo from "../Foo";
import Bar from "../Bar";

const CardTemplate = styled.div`
  display: inline-block;
  white-space: normal;
`

const Components = {
  foo: Foo,
  bar: Bar
};



function Card({ children, index, renderCard, disableCardDrag, card }) {
  return (
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableCardDrag}>
      {(provided, { isDragging }) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} data-testid='card'>
            <CardTemplate>{renderCard(isDragging)}</CardTemplate>           
            {typeof Components[card.component] !== "undefined" &&
              React.createElement(Components[card.component], {
                key: card.id,
                title: card.title
              })
            }
            
          </div>
        )
      }}
    </Draggable>
  )
}

export default Card
