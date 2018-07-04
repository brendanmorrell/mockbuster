export const addMovie = (title, length, watched, onWatchList, genre, rating, url) => ({
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

export const updateMovie = (title, watched, onWatchList, rating) => ({
  type: 'UPDATE_MOVIE',
  payload: {
    title,
    watched,
    onWatchList,
    rating,
  },
});

export const deleteMovie = title => ({
  type: 'DELETE_MOVIE',
  payload: { title },
});
