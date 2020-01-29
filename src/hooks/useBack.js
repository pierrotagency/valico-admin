import { useReducer, useCallback } from 'react';

const UNDO = 'UNDO';
const REDO = 'REDO';
const SET = 'SET';
const RESET = 'RESET';

const initialState = {
  past: [],
  present: null,
  future: [],
};

const reducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case UNDO: {
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case REDO: {
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case SET: {
      const { newPresent } = action;

      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    case RESET: {
      const { newPresent } = action;

      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
};

const useBack = initialPresent => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent,
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: UNDO });
    }
  }, [canUndo]);
  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: REDO });
    }
  }, [canRedo]);
  const set = useCallback(
    newPresent => dispatch({ type: SET, newPresent }),
    []
  );
  const reset = useCallback(
    newPresent => dispatch({ type: RESET, newPresent }),
    []
  );

  return [state, { set, reset, undo, redo, canUndo, canRedo }];
};

export default useBack;


// import { useReducer, useCallback } from "react";

// import { get } from '../helpers/utils'

// const initialState = {  
//   past: [],   // Current state value
//   present: null, // Future states if we undo
// 	future: [],
// 	start: null // initial state for clear (remember dispatch init)
// };

// const reducer = (state, action) => {

//   switch (action.type) {
//     case "INIT":			
//     console.log('INIT')
// 			return {
//         ...state,
//         start: action.firstState
// 			};
			
//     case "UNDO":
//       const previous = st.past[st.past.length - 1];
//       const newPast = st.past.slice(0, st.past.length - 1);

//       // console.log(previous)
//       console.log('UNDO')
//       console.log(previous.content[0].modules[0].fields.title)
//       console.log(previous._revision)

//       return {
// 				...state,
//         past: newPast,
//         present: previous,
//         future: [state.present, ...state.future]
// 			};
			
//     case "REDO":    
//     console.log('REDO')        
//       return {
// 				...state,
//         past: [...state.past, state.present],
//         present: state.future[0],
//         future: state.future.slice(1)
// 			};
			
//     case "SET":
//       // const { newPresent } = action;
//       // if (newPresent === state.present) {
//       //   return state;
//       // }

//       console.group('SET')
//       console.log(action.newPresent && action.newPresent.content[0].modules[0].fields.title)
//       console.log(action.newPresent && action.newPresent._revision)

//       console.log('PAST >>')
//       console.log(get(['present','content',0,'modules',0,'fields','title'],st))
//       console.log(st && state.present && state.present._revision)

//       console.groupEnd();

//       return {        
// 				...state,
//         past: [...state.past, state.present],
//         present: action.newPresent,
//         future: []
// 			};
			
//     case "CLEAR":
//       console.log('CLEAR')
//       return {
// 				...state,
//         past: [...state.past, state.present],
// 				present: state.start,
// 				future: []
//       };

//     default:
//       return state;
//   }
// };

// const useBack = initialPresent => {

//   const [state, dispatch] = useReducer(reducer, {...initialState, present: initialPresent});

//   const canUndo = state.past.length > 2;
//   const canRedo = state.future.length !== 0;

//   const undoState = useCallback(() => {
//     if (canUndo) dispatch({ type: "UNDO" });    
//   }, [canUndo, dispatch]);

//   const redoState = useCallback(() => {
//     if (canRedo) dispatch({ type: "REDO" });
//   }, [canRedo, dispatch]);

//   const setState = useCallback(newPresent => {
    
//     if(newPresent) {
//       newPresent._revision = typeof newPresent._revision === 'number' ? newPresent._revision + 1 : 1;
//       dispatch({ type: "SET", newPresent })
//     }
    
//   }, [ dispatch ]);

//   const clearState = useCallback(() => dispatch({ type: "CLEAR" }), [ dispatch ]);
	
// 	const initState = useCallback(firstState => dispatch({ type: "INIT", firstState }), [ dispatch]);

  
//   return { initState, state: state.present, setState , undoState, redoState, clearState, canUndo, canRedo };
// }

// export default useBack;