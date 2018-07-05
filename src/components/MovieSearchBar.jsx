import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import urlencode from 'urlencode';

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
        console.log(res);

        let names = res.data.results.map(movie => movie.title);
        let urls = res.data.results.map(
          movie => `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
        );
        this.setState({ movies: urls });
      });
  }
  render() {
    const posters = this.state.movies.map(url => {
      return <img src={url} key={url} height="42" width="42" />;
    });
    return (
      <div>
        <h3>search bar</h3>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        {posters}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop,
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
