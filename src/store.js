import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import * as reducers from './reducers';

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(
        reduxThunk
    )
)

export default store;
