import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import dataReducer from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(dataReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;