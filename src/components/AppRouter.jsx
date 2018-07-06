import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import createHistory from 'history/createBrowserHistory';

import HomePage from './HomePage.jsx';
import OtherPage from './OtherPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import SearchMoviePage from './SearchMoviePage.jsx';
import LoginPage from './LoginPage.jsx';
import { addHistoryToStore } from '../actions/historyActions.js';

const history = createHistory();

class AppRouter extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(addHistoryToStore(history));
  }
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/authenticated/" component={HomePage} exact={true} />
            <Route path="/authenticated/search" component={SearchMoviePage} exact={true} />
            <Route path="/authenticated/otherpage" component={OtherPage} exact={true} />
            <Route exact path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });
const mapDispatchToProps = dispatch => {
  return {
    addHistoryToStore: () => {
      dispatch(addHistoryToStore);
    },
  };
};

export default connect(mapStateToProps)(AppRouter);
