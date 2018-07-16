import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configure.js';
import AppRouter from './components/AppRouter.jsx';
import { startSetMovies } from './actions/actions';
import './styles/styles.scss';

const store = configureStore();


render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);
store.dispatch(startSetMovies());
