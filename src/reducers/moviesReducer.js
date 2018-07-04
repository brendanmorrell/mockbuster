const initialState = [
  {
    title: 'bridge over the river kwai',
    length: '3hrs',
    watched: true,
    onWatchList: false,
    rating: 5,
    genre: 'drama',
  },

  {
    title: 'BTiLC',
    length: '2hrs',
    onWatchList: true,
    genre: 'action',
    rating: 2,
    watched: false,
  },
  {
    title: 'Pee Wee',
    length: '2hrs',
    onWatchList: true,
    genre: 'comedy',
    rating: 4,
    watched: true,
  },
  {
    title: 'Goodfellas',
    length: '2hrs',
    onWatchList: true,
    genre: 'drama',
    rating: 5,
    watched: false,
  },
  {
    title: 'The Ring',
    length: '2hrs',
    onWatchList: true,
    genre: 'horror',
    rating: 1,
    watched: true,
  },
  {
    title: "Schindler's List",
    length: '2hrs',
    onWatchList: true,
    genre: 'drama',
    rating: 2,
    watched: false,
  },
];

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
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
