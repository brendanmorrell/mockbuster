import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import moviesReducer from '../reducers/moviesReducer';
import listsReducer from '../reducers/moviesReducer';

// import { adsCard, addMarket, setNewLocation, deleteCard } from './actions/actions.js';

export default () => {
  const store = createStore(
    combineReducers({
      movies: moviesReducer,
    }),
    composeWithDevTools()
  );

  return store;
};
