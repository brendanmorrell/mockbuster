import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import moviesReducer from '../reducers/moviesReducer';
import usersReducer from '../reducers/usersReducer';
import filtersReducer from '../reducers/filtersReducer';
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
