import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateMovie, deleteMovie } from '../actions/actions.js';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.changeStarCount = this.changeStarCount.bind(this);
    this.handleAddToList = this.handleAddToList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      clicked: false,
    };
  }
  changeStarCount(e) {
    let newRating = Number(e.target.id.slice(-1));
    if (this.state.clicked) {
      newRating -= 1;
      console.log(newRating);
    }
    //  else{
    //   console.log(this.state.);

    //   newRating += 1
    // }
    this.setState(prevState => ({ clicked: !prevState.clicked }));

    this.props.dispatch(updateMovie(this.props.title, undefined, undefined, newRating));
  }
  handleAddToList() {
    this.props.dispatch(updateMovie(this.props.title, undefined, !!!this.props.onWatchList));
  }
  handleDelete() {
    this.props.dispatch(deleteMovie(this.props.title));
  }
  render() {
    let starCount = 0;
    const stars = [];
    while (starCount < 5) {
      const key = `${this.props.title.replace(/\s/g, '-')}-${starCount + 1}`;
      starCount < this.props.rating
        ? stars.push(
            <button
              id={key}
              onClick={e => {
                this.changeStarCount(e);
              }}
              key={key}
            >
              ⭐
            </button>
          )
        : stars.push(
            <button
              id={key}
              key={key}
              onClick={e => {
                this.changeStarCount(e);
              }}
            >
              ☆
            </button>
          );
      starCount += 1;
    }
    return (
      <div className="movie-container">
        <h1>{this.props.title}</h1>
        <h3>{this.props.genre}</h3>
        {stars}
        <button onClick={this.handleAddToList}>
          {this.props.onWatchList ? (
            <span>remove from {this.props.watched && <span>re</span>}watch list</span>
          ) : (
            <span>add to {this.props.watched && <span>re</span>}watch list</span>
          )}
        </button>
        <button onClick={this.handleDelete}>Delete from movies</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMovie: () => {
      dispatch(updateMovie);
    },
    deleteMovie: () => {
      dispatch(deleteMovie);
    },
  };
};

export default connect(mapDispatchToProps)(Movie);
