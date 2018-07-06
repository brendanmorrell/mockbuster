const initialState = [];

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOVIES': {
      return action.payload;
    }
    case 'ADD_MOVIE': {
      const notInMoviesList = !state.some(movie => movie.title === action.payload.title);
      const newMoviesList = notInMoviesList ? state.concat(action.payload) : state.slice();
      return newMoviesList;
    }
    case 'UPDATE_MOVIE': {
      const { title, watched, onWatchList, rating } = action.payload;
      const newMoviesList = state.map(movie => {
        if (movie.title !== title) return movie;
        const updatedMovie = movie;
        if (watched !== undefined) updatedMovie.watched = watched;
        if (onWatchList !== undefined) updatedMovie.onWatchList = onWatchList;
        if (rating !== undefined) updatedMovie.rating = rating;
        return updatedMovie;
      });
      return newMoviesList;
    }
    case 'DELETE_MOVIE': {
      let title;
      if (action.payload && action.payload.title) title = action.payload.title;
      const newMovieList = state.filter(movie => movie.title !== title);
      return newMovieList;
    }
    default: {
      return state;
    }
  }
};

export default moviesReducer;
