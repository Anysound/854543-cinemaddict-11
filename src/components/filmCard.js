import {createFilmCardTemplate} from '../templates/filmCard.js';
import AbstractSmartComponent from './abstract-smart-component.js';


class FilmCard extends AbstractSmartComponent {
  constructor(film, commentsCount) {
    super();

    this._film = film;
    this._commentsCount = commentsCount;

    this._posterClickHandler = null;
    this._titleClickHandler = null;
    this._commentsClickHandler = null;
    this._watchlistClickHandler = null;
    this._alreadyWatchedClickHandler = null;
    this._favoritesClickHandler = null;

    this._subscribeOnEvents();
  }

  recoveryListeners() {
    this.posterClickHandler(this._posterClickHandler);
    this.titleClickHandler(this._titleClickHandler);
    this.commentsClickHandler(this._commentsClickHandler);
    this.watchlistClickHandler(this._watchlistClickHandler);
    this.alreadyWatchedClickHandler(this._alreadyWatchedClickHandler);
    this.favoritesClickHandler(this._favoritesClickHandler);

    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, () => {
        this._isAdded = !this._isAdded;
      });

    element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, () => {
        this._isWatched = !this._isWatched;
      });

    element.querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, () => {
        this._isFavorite = !this._isFavorite;
      });
  }

  getTemplate() {
    return createFilmCardTemplate(this._film, this._commentsCount);
  }

  posterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);

    this._posterClickHandler = handler;
  }

  titleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);

    this._titleClickHandler = handler;
  }

  commentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);

    this._commentsClickHandler = handler;
  }

  watchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });

    this._watchlistClickHandler = handler;
  }

  alreadyWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });

    this._alreadyWatchedClickHandler = handler;
  }

  favoritesClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });

    this._favoritesClickHandler = handler;
  }
}

export default FilmCard;
