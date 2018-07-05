import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';

import { updateMovie, deleteMovie } from '../actions/actions.js';
class Movie extends Component {
  constructor(props) {
    super(props);
    this.changeStarCount = this.changeStarCount.bind(this);
    this.handleAddToList = this.handleAddToList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  changeStarCount(e) {
    this.props.dispatch(updateMovie(this.props.title, undefined, undefined, e));
  }
  handleAddToList() {
    this.props.dispatch(updateMovie(this.props.title, undefined, !!!this.props.onWatchList));
  }
  handleDelete() {
    this.props.dispatch(deleteMovie(this.props.title));
  }
  render() {
    return (
      <div className="movie-container">
        {this.props.rating ? (
          <Rating
            onChange={e => this.changeStarCount(e)}
            start={0}
            fractions={100}
            initialRating={this.props.rating}
            emptySymbol={<img src="../../public/img/star-empty.png" />}
            fullSymbol={<img src="../../public/img/star-full.png" />}
            placeholderSymbol={<img src="../../public/img/star-red.png" />}
          />
        ) : (
          <Rating
            onChange={e => this.changeStarCount(e)}
            start={0}
            fractions={1}
            placeholderRating={3}
            emptySymbol={<img src="../../public/img/star-empty.png" />}
            fullSymbol={<img src="../../public/img/star-full.png" />}
            placeholderSymbol={<img src="../../public/img/star-red.png" />}
          />
        )}

        <h1>{this.props.title}</h1>
        <h3>{this.props.genre}</h3>
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
