import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from './components/Lane'
import withDroppable from '../withDroppable'
import { when, partialRight } from '../../../../helpers/utils'
import DefaultLaneHeader from './components/DefaultLaneHeader'
import DefaultCard from './components/DefaultCard'
import { moveCard, addCard, removeCard } from './services'

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
  onCardDragEnd,
  onCardNew,
  renderCard,
  allowRemoveCard,
  onCardRemove,
  onCardAdded,
  disableCardDrag,
  disableLaneDrag
}) {

  const [board, setBoard] = useState(initialBoard)

  const handleOnCardDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveCard, notifyCallback: onCardDragEnd })
  
  function handleOnDragEnd({ source, destination }, { moveCallback, notifyCallback }) {
    const reorderedBoard = moveCallback(board, source, destination)
    when(notifyCallback)(callback => callback(reorderedBoard, source, destination))
    setBoard(reorderedBoard)
  }


  function handleCardAdd(lane, card, options = {}) {

    const boardWithNewCard = addCard(board, lane, card, options)
    
    onCardAdded(
      boardWithNewCard,
      boardWithNewCard.lanes.find(({ id }) => id === lane.id),
      card
    )

    setBoard(boardWithNewCard)
  
  }

  function handleCardRemove(lane, card) {
    const boardWithoutCard = removeCard(board, lane, card)
    onCardRemove(
      boardWithoutCard,
      boardWithoutCard.lanes.find(({ id }) => id === lane.id),
      card
    )
    setBoard(boardWithoutCard)
  }

  return (
    <BoardContainer
      onCardDragEnd={handleOnCardDragEnd}      
      handleCardAdd={handleCardAdd}
      renderCard={(lane, card, dragging) => {

        // if (renderCard) return renderCard(card, { removeCard: handleCardRemove.bind(null, lane, card), dragging })
        
        return (
          <DefaultCard
            dragging={dragging}
            allowRemoveCard={allowRemoveCard}
            onCardRemove={card => handleCardRemove(lane, card)}
          >
            {card}
          </DefaultCard>
        )

      }}
      disableLaneDrag={disableLaneDrag}
      disableCardDrag={disableCardDrag}
    >
      {board}
    </BoardContainer>
  )
}

function BoardContainer({
  children: board,
  renderCard,
  disableLaneDrag,
  disableCardDrag,
  renderLaneHeader,
  onLaneDragEnd,
  onCardDragEnd,
  handleCardAdd
}) {

  function handleOnDragEnd(event) {
    const coordinates = getCoordinates(event)
    if (!coordinates.source) return

    isALaneMove(event.type) ? onLaneDragEnd(coordinates) : onCardDragEnd(coordinates)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StyledBoard>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD'>
          {board.lanes.map((lane, index) => (              
            <Lane
              key={lane.id}
              index={index}
              renderCard={renderCard}
              renderLaneHeader={lane =>
                renderLaneHeader ? (
                  renderLaneHeader(lane)
                ) : (
                  <>
                    <DefaultLaneHeader >
                      {lane}
                    </DefaultLaneHeader>
                    <button onClick={() => handleCardAdd(lane, { title: 'New card', description: 'Card content', component: "foo" })}>New card</button>  
                  </>
                )
              }
              disableLaneDrag={disableLaneDrag}
              disableCardDrag={disableCardDrag}
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
