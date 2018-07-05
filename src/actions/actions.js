import axios from 'axios';

const database = [
  {
    title: 'database movie',
    length: '3hrs',
    watched: true,
    onWatchList: false,
    rating: 5,
    genre: 'drama',
  },
];

export const setMovies = movies => ({
  type: 'SET_MOVIES',
  payload: movies,
});

export const startSetMovies = () => {
  return (dispatch, getState) => {
    axios.get('http://localhost:8080/getdata').then(res => {
      dispatch(setMovies(res.data.movies));
    });
  };
};

export const addMovie = ({
  title,
  length = undefined,
  watched,
  onWatchList,
  genre,
  rating,
  url,
}) => ({
  type: 'ADD_MOVIE',
  payload: {
    title,
    length,
    watched,
    onWatchList,
    genre,
    rating,
    url,
  },
});

export const startAddMovie = (movie = {}) => (dispatch, getState) => {
  const updatedList = getState().movies.concat(movie);
  dispatch(addMovie(movie));
  axios({
    url: '/updatedata',
    method: 'POST',
    data: updatedList,
  });
};

export const updateMovie = ({ title, watched, onWatchList, rating }) => ({
  type: 'UPDATE_MOVIE',
  payload: {
    title,
    watched,
    onWatchList,
    rating,
  },
});

export const startUpdateMovie = (movie = {}) => (dispatch, getState) => {
  const updatedList = getState().movies.map(mov => {
    if (mov.title === movie.title) return movie;
    return mov;
  });
  dispatch(updateMovie(movie));
  axios({
    url: '/updatedata',
    method: 'POST',
    data: updatedList,
  });
};

export const deleteMovie = ({ title }) => ({
  type: 'DELETE_MOVIE',
  payload: { title },
});

export const startDeleteMovie = (movie = {}) => (dispatch, getState) => {
  const updatedList = getState().movies.filter(mov => mov.title !== movie.title);
  dispatch(deleteMovie(movie));
  axios({
    url: '/updatedata',
    method: 'POST',
    data: updatedList,
  });
};
