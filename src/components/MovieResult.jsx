import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { startAddMovie, startUpdateMovie, startDeleteMovie } from '../actions/actions.js';

class MovieResult extends Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.showSummary = this.showSummary.bind(this);

    this.changeStarCount = this.changeStarCount.bind(this);
    this.handleAddToList = this.handleAddToList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);

    this.state = {
      inFavorites: null,
      hovering: false,
      hoveringSummary: false,
      title: this.props.movie ? this.props.movie.title : null,
      url: this.props.url ? this.props.url : this.props.movie.poster_path || null,
      onWatchList: false,
      genre: this.props.movie ? this.props.movie.genre_id : null,
      watched: false,
      rating: this.props.rating ? this.props.rating : this.props.movie.vote_average / 2,
      release_date: this.props.movie ? this.props.movie.release_date : null,
    };
  }
  componentDidMount() {
    console.log(this.state.url);

    let inFavorites = this.props.favorites.some(movie => movie.title === this.props.movie.title);
    let movieState;
    if (inFavorites) {
      movieState = this.props.favorites.filter(movie => movie.title === this.props.movie.title)[0];
      console.log('rating');

      console.log(movieState.rating);

      this.setState({ ...movieState });
    }

    this.setState({ inFavorites });
  }
  handleHover() {
    this.setState(prevState => ({ hovering: !prevState.hovering }));
  }
  showSummary() {
    this.setState(prevState => ({ hoveringSummary: !prevState.hoveringSummary }));
  }
  changeStarCount(e) {
    const movie = {
      title: this.state.title ? this.state.title : this.props.movie.title,
      watched: this.state.watched,
      onWatchList: this.state.onWatchList,
      rating: e,
      genre: this.state.genre ? this.state.genre : this.props.movie.genre_id,
      url: this.state.url ? this.state.url : this.props.movie.poster_path,
      release_date: this.state.release_date
        ? this.state.release_date
        : this.props.movie.release_date,
    };
    if (this.state.inFavorites) {
      this.props.dispatch(startUpdateMovie(movie));
    } else {
      this.props.dispatch(startAddMovie(movie));
    }
    this.setState({ rating: e });
  }
  handleAddToList() {
    const movie = {
      title: this.state.title ? this.state.title : this.props.movie.title,
      watched: this.state.watched,
      onWatchList: !!!this.state.onWatchList,
      rating: this.state.rating ? this.state.rating : this.props.movie.vote_average,
      genre: this.state.genre ? this.state.genre : this.props.movie.genre_id,
      url: this.state.url ? this.state.url : this.props.movie.poster_path,
      release_date: this.state.release_date
        ? this.state.release_date
        : this.props.movie.release_date,
    };
    if (this.state.inFavorites) {
      this.props.dispatch(startUpdateMovie(movie));
    } else {
      this.props.dispatch(startAddMovie(movie));
    }
    this.setState(prevState => ({ onWatchList: !!!prevState.onWatchList }));
  }
  handleDelete() {
    if (this.state.inFavorites) {
      this.props.dispatch(
        startDeleteMovie(this.state.title ? this.state.title : this.props.movie.title)
      );
    }
  }
  handleAddMovie() {
    const movie = {
      title: this.state.title ? this.state.title : this.props.movie.title,
      watched: this.state.watched,
      onWatchList: this.state.onWatchList,
      rating: this.state.rating ? this.state.rating : this.props.movie.vote_average,
      genre: this.state.genre ? this.state.genre : this.props.movie.genre_id,
      url: this.state.url ? this.state.url : this.props.movie.poster_path,
      release_date: this.state.release_date
        ? this.state.release_date
        : this.props.movie.release_date,
    };
    this.props.dispatch(startAddMovie(movie));
  }
  render() {
    return (
      <div className="movie-result-container">
        <div className="button-container">
          <button className="button left-border" onClick={this.handleAddToList}>
            {/*   {this.props.onWatchList ? (
              <span>
                Remove from {this.props.watched && <span>re</span>}
                watch list
              </span>
            ) : ( */}
            <span>
              Add {/* to {this.props.watched && <span>re</span>}
              watch list */}
            </span>
            {/* )} */}
          </button>
          <button className="button--secondary right-border" onClick={this.handleDelete}>
            Remove
          </button>
        </div>
        <div className="button-container">
          <Rating
            onChange={e => this.changeStarCount(e)}
            start={0}
            fractions={100}
            initialRating={
              this.state.rating ? this.state.rating : this.props.movie.vote_average / 2
            }
            emptySymbol={<img src="../../public/img/star-empty-yellow.png" />}
            fullSymbol={<img src="../../public/img/star-full-yellow.png" />}
            placeholderSymbol={<img src="../../public/img/star-red.png" />}
          />
        </div>
        {this.props.movie ? (
          <div
            className="movie-container"
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleHover}
          >
            {this.state.hovering && (
              <div className="movie-info-container">
                <span>title: {this.props.movie.title}</span>
                <span>Genre: {this.props.movie.genre_ids}</span>
                <button className="info--summary" onClick={this.showSummary}>
                  Synopsis
                </button>
                {this.state.hoveringSummary && (
                  <div className="info--summary_content">{this.props.movie.overview}</div>
                )}
                <span>Release: {this.props.movie.release_date}</span>
              </div>
            )}
            {this.state.hovering ? (
              <div
                className="dvd-image-container"
                style={{
                  background:
                    `linear-gradient(rgba(0, 130, 170, 0.5), rgba(0, 130, 170, 0.5)), url(${
                      this.props.url ? this.props.url : this.props.movie.poster_path
                    })` + '0% 0% / 23rem',
                }}
              />
            ) : (
              <div
                className="dvd-image-container"
                style={{
                  background:
                    `url(${this.props.url ? this.props.url : this.props.movie.poster_path})` +
                    '0% 0% / 23rem',
                }}
              />
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startAddMovie: () => {
      dispatch(startAddMovie);
    },
    startUpdateMovie: () => {
      dispatch(startUpdateMovie);
    },
    startDeleteMovie: () => {
      dispatch(startDeleteMovie);
    },
  };
};

export default connect(mapDispatchToProps)(MovieResult);

// <button className="button" onClick={this.handleAddMovie}>
//   + Favorites
// </button>
