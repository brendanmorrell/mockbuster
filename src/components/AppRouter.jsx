import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import HomePage from './HomePage.jsx';
import OtherPage from './OtherPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
const history = createHistory();

class AppRouter extends Component {
  render() {
    return (
      <HomePage />
      // <Router history={history}>
      //   <div>
      //     <Switch>
      //       <Route path="/" component={HomePage} exact={true} />
      //       <Route path="/otherpage" component={OtherPage} exact={true} />
      //       <Route component={NotFoundPage} />
      //     </Switch>
      //   </div>
      // </Router>
    );
  }
}

export default AppRouter;

//prod

// <Route path="/authenticated" component={HomePage} exact={true} />
// <Route path="/authenticated/otherpage" component={OtherPage} exact={true} />
