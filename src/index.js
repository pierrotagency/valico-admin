import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import rootSaga from './store/sagas';

import {persistor, store, sagaMiddleware} from './store';

sagaMiddleware.run(rootSaga);



const app = (
    <Provider store={store}>
    
        <PersistGate loading={<h1>Loadinggggggggggg</h1>} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
