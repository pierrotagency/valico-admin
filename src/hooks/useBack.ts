import { useReducer, useCallback } from 'react'
import { StoreAction, StorePostState } from "../store/actions";
// import cloneDeep from 'lodash.clonedeep';

export const REDO = 'back_redo'
export const UNDO = 'back_undo'
export const SET = 'back_set'
export const RESET = 'back_reset'

interface BackState {
  currentIndex: number,
  history: StorePostState[],  
}

export function useBack(reducer: Object, initialPresent: any ) {
  const initialState: BackState = {
    history: [initialPresent],
    currentIndex: 0
  }

  const [state, dispatch] = useReducer(undoable(reducer), initialState)
  const { history, currentIndex } : BackState = state

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

  // console log dispatching twice? it's ok!!! https://github.com/facebook/react/issues/16295
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

function undoable(reducer: any) {
  // Return a reducer that handles undo and redo
  return function(state: BackState, action: StoreAction) {
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

        // const clonedHistory = cloneDeep(history)
        // const newHistory = clonedHistory.slice(0, newIndex)

        const newHistory = history.slice(0, newIndex)

        return {
          history: [...newHistory, newPresent],
          currentIndex: newIndex
        }
    }
  }
}
