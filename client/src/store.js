import {createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; //index.js is rootReducer

const middleware= [thunk];
const initialState ={}; 

const store=createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    ); //we use compose to apply more enhancement one is middleware and other is devtools

    export default store;