import {FilterType} from '../const.js';

const getWatchlistMovies = (movies) => {
  return movies.filter((it) => it.isAdded);
}

const getWatchedMovies = (movies) => {
  return movies.filter((it) => it.isWatched);
}

const getFavoriteMovies = (movies) => {
  return movies.filter((it) => it.isFavorite);
}

const getMoviesByFilter = (movies, filterType) => {
  switch(filterType) {
    case FilterType.ALL:
      return movies;

    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);

    case FilterType.HISTORY:
      return getWatchedMovies(movies);

    case FilterType.FAVORITES:
      return getFavoriteMovies(movies);
  }
}

export {getWatchlistMovies, getWatchedMovies, getFavoriteMovies, getMoviesByFilter};
