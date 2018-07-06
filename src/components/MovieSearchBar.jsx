import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import urlencode from 'urlencode';

import MovieResult from './MovieResult.jsx';

const tmdb = {
  baseURL: 'https://api.themoviedb.org/3/search/movie?api_key=',
  apiKey: '661bc5cd3fd31a045bb31e5f692ad849',
  apiReadAccessToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjFiYzVjZDNmZDMxYTA0NWJiMzFlNWY2OTJhZDg0OSIsInN1YiI6IjViM2Q5NTllOTI1MTQxMTFhYjAwNDE4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNlH6t5Zyaq_zqJ3Ag1LTS_JtEpvZ4Z7KVYjCucOB_Q',
  example: 'https://api.themoviedb.org/3/movie/550?api_key=661bc5cd3fd31a045bb31e5f692ad849',
};

class MovieSearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
      movies: [],
    };
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
    const urlEncodedQuery = urlencode(e.target.value);
    axios
      // .get(`https://api.themoviedb.org/3/movie/550?api_key=661bc5cd3fd31a045bb31e5f692ad849`)
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${tmdb.apiKey}&query=${urlEncodedQuery}`
      )
      .then(res => {
        let movies = res.data.results.filter(movie => movie.poster_path !== null).map(movie => {
          let { genre_ids, overview, release_date, vote_average, poster_path, title } = movie;
          poster_path = `http://image.tmdb.org/t/p/w500/${poster_path}`;
          return { genre_ids, overview, release_date, vote_average, poster_path, title };
        });
        this.setState({ movies });
      });
  }
  render() {
    const posters = this.state.movies.length
      ? this.state.movies.map(movie => {
          return (
            <MovieResult
              favorites={this.props.favorites}
              movie={{ ...movie }}
              key={movie.url + `${Math.random()}`}
              searchMovie={true}
            />
          );
        })
      : [];
    return (
      <div>
        <h3>search bar</h3>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <div className="movies-container">{posters.length ? posters : ''}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.movies,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch(actionCreator);
    },
  };
};

export default connect(mapStateToProps)(MovieSearchBar);
