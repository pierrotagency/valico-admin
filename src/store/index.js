import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from './reducers';
// import rootSaga from './sagas';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['Login', 'Account', 'Layout'],
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.    
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(store);

export { store, persistor, sagaMiddleware };