import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import moviesReducer from '../reducers/moviesReducer.js';
import usersReducer from '../reducers/usersReducer.js';
import filtersReducer from '../reducers/filtersReducer.js';
import historyReducer from '../reducers/historyReducer.js';

export default () => {
  const store = createStore(
    combineReducers({
      movies: moviesReducer,
      users: usersReducer,
      filters: filtersReducer,
      history: historyReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
