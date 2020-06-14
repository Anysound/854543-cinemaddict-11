import {createFilmPopupTemplate} from '../templates/filmPopup.js';
import AbstractSmartComponent from './abstract-smart-component.js';

class FilmPopup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._imgSmile = ``;

    this._closeBtnClickHandler = null;
    this._favoritesClickHandler = null;
    this._alreadyWatchedClickHandler = null;
    this._watchlistClickHandler = null;

    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film, this._imgSmile);
  }

  closeBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`mousedown`, handler);

    this._closeBtnClickHandler = handler;
  }

  favoritesClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);

    this._favoritesClickHandler = handler;
  }

  alreadyWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);

    this._alreadyWatchedClickHandler = handler;
  }

  watchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);

    this._watchlistClickHandler = handler;
  }

  recoveryListeners() {

    // заново вешаем обработчики
    this.closeBtnClickHandler(this._closeBtnClickHandler);
    this.favoritesClickHandler(this._favoritesClickHandler);
    this.alreadyWatchedClickHandler(this._alreadyWatchedClickHandler);
    this.watchlistClickHandler(this._watchlistClickHandler);

    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    // smileHandler
    element.querySelector(`.film-details__emoji-label--smile`)
      .addEventListener(`click`, () => {
        const imgPath = element.querySelector(`.film-details__emoji-label--smile img`).src;
        this._imgSmile = imgPath;

        this.rerender();
      });

    // sleepingHandler
    element.querySelector(`.film-details__emoji-label--sleeping`)
      .addEventListener(`click`, () => {
        const imgPath = element.querySelector(`.film-details__emoji-label--sleeping img`).src;
        this._imgSmile = imgPath;

        this.rerender();
      });

    // pukeHandler
    element.querySelector(`.film-details__emoji-label--puke`)
    .addEventListener(`click`, () => {
      const imgPath = element.querySelector(`.film-details__emoji-label--puke img`).src;
      this._imgSmile = imgPath;

      this.rerender();
    });

    // angryHandler
    element.querySelector(`.film-details__emoji-label--angry`)
    .addEventListener(`click`, () => {
      const imgPath = element.querySelector(`.film-details__emoji-label--angry img`).src;
      this._imgSmile = imgPath;

      this.rerender();
    });
  }
}

export default FilmPopup;
