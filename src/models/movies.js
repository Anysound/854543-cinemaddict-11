import {getMoviesByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';

class Movies  {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;

    // колбеки на изменение данных
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getMovies() {
    return getMoviesByFilter(this._movies, this._activeFilterType)
  }

  getMoviesAll() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = movies;
    this._callHandlers(this._dataChangeHandlers);
  }

  updateMovie(id, currentMovie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }

    this._movies = [].concat(this._movies.slice(0, index), currentMovie, this._movies.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => {
      handler();
    })
  }
}

export default Movies;
