import React, { Component } from 'react';

import ContentContainer from './ContentContainer.jsx';
import Header from './Header.jsx';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <Header />
        <ContentContainer />
      </div>
    );
  }
}

export default HomePage;
