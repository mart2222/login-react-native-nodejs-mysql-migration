import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './ducks';
import sagas from './sagas';

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

// const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore;
const createAppropriateStore = createStore;

const store = createAppropriateStore(reducers, applyMiddleware(...middlewares));

sagaMiddleware.run(sagas);

export default store;
