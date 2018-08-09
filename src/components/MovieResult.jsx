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
      <div>
        <button onClick={this.handleAddToList}>
          {this.props.onWatchList ? (
            <span>remove from {this.props.watched && <span>re</span>}watch list</span>
          ) : (
            <span>add to {this.props.watched && <span>re</span>}watch list</span>
          )}
        </button>
        <button onClick={this.handleDelete}>Delete me from movies</button>
        <Rating
          onChange={e => this.changeStarCount(e)}
          start={0}
          fractions={100}
          initialRating={this.state.rating ? this.state.rating : this.props.movie.vote_average / 2}
        />
        <button onClick={this.handleAddMovie}>Add to collection</button>
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
                    })` + '0% 0% / 20rem',
                  // backgroundSize: '20rem',
                }}
              />
            ) : (
              <div
                className="dvd-image-container"
                style={{
                  background:
                    `url(${this.props.url ? this.props.url : this.props.movie.poster_path})` +
                    '0% 0% / 20rem',
                  // backgroundSize: '20rem',
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

// export default Movie;

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Rating from 'react-rating';

// import { startUpdateMovie, startDeleteMovie } from '../actions/actions.js';
// class Movie extends Component {
//   constructor(props) {
//     super(props);
//     this.changeStarCount = this.changeStarCount.bind(this);
//     this.handleAddToList = this.handleAddToList.bind(this);
//     this.handleDelete = this.handleDelete.bind(this);
//   }
//   changeStarCount(e) {
//     const movie = {
//       title: this.props.title,
//       length: this.props.length,
//       watched: this.props.watched,
//       onWatchList: this.props.onWatchList,
//       rating: e,
//       genre: this.props.genre,
//       url: this.props.url,
//     };
//     this.props.dispatch(startUpdateMovie(movie));
//   }
//   handleAddToList() {
//     const movie = {
//       title: this.props.title,
//       length: this.props.length,
//       watched: this.props.watched,
//       onWatchList: !!!this.props.onWatchList,
//       rating: this.props.rating,
//       genre: this.props.genre,
//       url: this.props.url,
//     };
//     this.props.dispatch(startUpdateMovie(movie));
//   }
//   handleDelete() {
//     console.log('clicked delete');

//     this.props.dispatch(startDeleteMovie(this.props.title));
//   }
//   render() {
//     return (
//       <div className="movie-container">
//         {this.props.rating ? (
//           <Rating
//             onChange={e => this.changeStarCount(e)}
//             start={0}
//             fractions={100}
//             initialRating={this.props.rating}
//             emptySymbol={<img src="../../public/img/star-empty.png" />}
//             fullSymbol={<img src="../../public/img/star-full.png" />}
//             placeholderSymbol={<img src="../../public/img/star-red.png" />}
//           />
//         ) : (
//           <Rating
//             onChange={e => this.changeStarCount(e)}
//             start={0}
//             fractions={1}
//             placeholderRating={3}
//             emptySymbol={<img src="../../public/img/star-empty.png" />}
//             fullSymbol={<img src="../../public/img/star-full.png" />}
//             placeholderSymbol={<img src="../../public/img/star-red.png" />}
//           />
//         )}

//         <h1>{this.props.title}</h1>
//         <h3>{this.props.genre}</h3>
//         <button onClick={this.handleAddToList}>
//           {this.props.onWatchList ? (
//             <span>remove from {this.props.watched && <span>re</span>}watch list</span>
//           ) : (
//             <span>add to {this.props.watched && <span>re</span>}watch list</span>
//           )}
//         </button>
//         <button onClick={this.handleDelete}>Delete me from movies</button>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     updateMovie: () => {
//       dispatch(startUpdateMovie);
//     },
//     deleteMovie: () => {
//       dispatch(startDeleteMovie);
//     },
//   };
// };

// export default connect(mapDispatchToProps)(Movie);
