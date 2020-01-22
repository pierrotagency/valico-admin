import { useReducer, useCallback } from "react";


const initialState = {  
  past: [],   // Current state value
  present: null, // Future states if we undo
	future: [],
	start: null // initial state for clear (remember dispatch init)
};

const reducer = (state, action) => {

	const { past, present, future, start } = state;

  switch (action.type) {
		case "INIT":			
			return {
        ...state,
        start: action.firstState
			};
			
    case "UNDO":
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
				...state,
        past: newPast,
        present: previous,
        future: [present, ...future]
			};
			
    case "REDO":
      const next = future[0];
      const newFuture = future.slice(1);
      return {
				...state,
        past: [...past, present],
        present: next,
        future: newFuture
			};
			
    case "SET":
      const { newPresent } = action;
      if (newPresent === present) {
        return state;
      }
      return {
				...state,
        past: [...past, present],
        present: newPresent,
        future: []
			};
			
    case "CLEAR":
      return {
				...state,
        past: [...past, present],
				present: start,
				future: []
      };

    default:
      return state;
  }
};

const useBack = initialPresent => {

  const [state, dispatch] = useReducer(reducer, {...initialState, present: initialPresent});

  const canUndo = state.past.length > 2;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    if (canUndo) dispatch({ type: "UNDO" });    
  }, [canUndo, dispatch]);

  const redo = useCallback(() => {
    if (canRedo) dispatch({ type: "REDO" });
  }, [canRedo, dispatch]);

  const set = useCallback(newPresent => dispatch({ type: "SET", newPresent }), [ dispatch ]);

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);
	
	const init = useCallback(firstState => dispatch({ type: "INIT", firstState }), [ dispatch]);

  
  return { init, state: state.present, set , undo, redo, clear, canUndo, canRedo };
}

export default useBack;