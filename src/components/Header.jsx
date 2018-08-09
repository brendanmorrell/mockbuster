import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { logoutUser } from '../actions/userActions.js';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    axios.post('/logout');
    this.props.dispatch(logoutUser(this.props.user._id));
    this.props.history.history.push('/login');
  }

  render() {
    const username = this.props.user.githubInfo ? this.props.user.githubInfo.login : '';
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <NavLink className="header__title " to="/authenticated/" exact={true}>
              <div className="mockbuster-div">
              </div>
            </NavLink>
            <div className="header_logout-justify">
              <span className="header__displayName">{username}</span>
              <br />
              <button className="button button--link" onClick={this.handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ users, history }) => ({ user: users, history });
const mapDispatchToProps = dispatch => ({ logoutUser: () => dispatch(logoutUser) });
export default connect(mapStateToProps)(Header);

// // <header className="header">
// //   <span>MockBuster Video</span>
// //   <button onClick={this.handleSwitchPage}>Add Movie To Collection</button>
// //   <div>{username}</div>
// //   <button onClick={this.handleLogout}>Logout</button>
// // </header>

//   handleSwitchPage() {
//     this.props.history.history.push('/authenticated/search');
//   }
// this.handleSwitchPage = this.handleSwitchPage.bind(this);
