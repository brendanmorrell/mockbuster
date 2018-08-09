import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';

import { startUpdateMovie, startDeleteMovie } from '../actions/actions.js';
class Movie extends Component {
  constructor(props) {
    super(props);
    this.changeStarCount = this.changeStarCount.bind(this);
    this.handleAddToList = this.handleAddToList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  changeStarCount(e) {
    const movie = {
      title: this.props.title,
      length: this.props.length,
      watched: this.props.watched,
      onWatchList: this.props.onWatchList,
      rating: e,
      genre: this.props.genre,
      url: this.props.url,
    };
    this.props.dispatch(startUpdateMovie(movie));
  }
  handleAddToList() {
    const movie = {
      title: this.props.title,
      length: this.props.length,
      watched: this.props.watched,
      onWatchList: !!!this.props.onWatchList,
      rating: this.props.rating,
      genre: this.props.genre,
      url: this.props.url,
    };
    this.props.dispatch(startUpdateMovie(movie));
  }
  handleDelete() {
    console.log('clicked delete');

    this.props.dispatch(startDeleteMovie(this.props.title));
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
          />
        ) : (
          <Rating
            onChange={e => this.changeStarCount(e)}
            start={0}
            fractions={1}
            placeholderRating={3}
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
        <button onClick={this.handleDelete}>Delete me from movies</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMovie: () => {
      dispatch(startUpdateMovie);
    },
    deleteMovie: () => {
      dispatch(startDeleteMovie);
    },
  };
};

export default connect(mapDispatchToProps)(Movie);
