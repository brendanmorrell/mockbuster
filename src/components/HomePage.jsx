import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContentContainer from './ContentContainer.jsx';
import Header from './Header.jsx';
import { logoutUser } from '../actions/userActions.js';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <button
          onClick={() => {
            this.props.history.push('/authenticated/search');
          }}
        >
          Find more movies
        </button>
        <ContentContainer />
      </div>
    );
  }
}

export default HomePage;
