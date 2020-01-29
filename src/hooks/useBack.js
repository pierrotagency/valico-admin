import { useReducer, useCallback } from 'react'

export const REDO = 'back_redo'
export const UNDO = 'back_undo'
export const SET = 'back_set'
export const RESET = 'back_reset'

export function useBack(reducer, initialPresent) {
  const initialState = {
    history: [initialPresent],
    currentIndex: 0
  }

  const [state, dispatch] = useReducer(undoable(reducer), initialState)
  const { history, currentIndex } = state

  const canUndo = currentIndex > 1
  const canRedo = currentIndex < history.length - 1


  const undoState = useCallback(() => {
    if (canUndo) {
      dispatch({ type: UNDO });
    }
  }, [canUndo]);

  const redoState = useCallback(() => {
    if (canRedo) {
      dispatch({ type: REDO });
    }
  }, [canRedo]);

  const setState = useCallback(
    payload => dispatch({ type: SET, payload: payload }),
    []
  );

  const resetState = useCallback(
    payload => dispatch({ type: RESET, payload: payload }),
    []
  );

  return { state: history[currentIndex], dispatch, history, canUndo, canRedo, undoState, redoState, setState, resetState }
}

function undoable(reducer) {
  // Return a reducer that handles undo and redo
  return function(state, action) {
    const { history, currentIndex } = state

    switch (action.type) {
      case UNDO:
        return {
          ...state,
          currentIndex: currentIndex - 1
        }
      case REDO:
        return {
          ...state,
          currentIndex: currentIndex + 1
        }
      default:
        // Delegate handling the action to the passed reducer
        const present = history[currentIndex]
        const newPresent = reducer(present, action)

        // Nothing's changed, don't update history
        if (present === newPresent) {
          return state
        }

        const newIndex = currentIndex + 1
        const newHistory = history.slice(0, newIndex)

        return {
          history: [...newHistory, newPresent],
          currentIndex: newIndex
        }
    }
  }
}
