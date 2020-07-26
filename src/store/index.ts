import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createFilter } from 'redux-persist-transform-filter';
import { reducers, AppState } from './reducers';  
// import { PersistState } from 'redux-persist';

// import {StorePostState} from './post/types'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// avoid saving other login store properties (used for login flow, just keep the user for now)
const filterLoginStore = createFilter(
    'login',
    ['user'] // ['user', 'keyYouWantToSave2']
);

const filterPostStore = createFilter(
    'post',
    ['sort','epp'] // ['user', 'keyYouWantToSave2']
);


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['login', 'account', 'layout', 'post'],
    stateReconciler: autoMergeLevel2,   
    transforms: [
        filterLoginStore,
        filterPostStore
    ]
};

const persistedReducer = persistReducer<AppState>(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialPersistedState: any = {};

const store = createStore(persistedReducer, initialPersistedState , composeEnhancers(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(store);

export { store, persistor, sagaMiddleware };