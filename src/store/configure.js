import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import moviesReducer from '../reducers/moviesReducer';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

export default () => {
  const store = createStore(
    combineReducers({
      movies: moviesReducer,
    }),
    /* composeEnhancers */ composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
