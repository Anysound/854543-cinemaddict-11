import {createFilmPopupTemplate} from '../templates/filmPopup.js';
import AbstractSmartComponent from './abstract-smart-component.js';
// import AbstractComponent from './abstractComponent.js';

class FilmPopup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._closeBtnClickHandler = null;
    this._favoritesClickHandler = null;
    this._alreadyWatchedClickHandler = null;
    this._watchlistClickHandler = null;
    this._setSmileEmotionHandler = null;
    this._setSleepingEmotionHandler = null;
    this._setPukeEmotionHandler = null;
    this._setAngryEmotionHandler = null;

    // this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film);
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

  setSmileEmotionHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-label--smile`)
      .addEventListener(`click`, handler);

    this._setSmileEmotionHandler = handler;
  }

  setSleepingEmotionHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-label--sleeping`)
      .addEventListener(`click`, handler);

    this._setSleepingEmotionHandler = handler;
  }

  setPukeEmotionHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-label--puke`)
      .addEventListener(`click`, handler);

    this._setPukeEmotionHandler = handler;
  }

  setAngryEmotionHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-label--angry`)
      .addEventListener(`click`, handler);

    this._setAngryEmotionHandler = handler;
  }

  recoveryListeners() {

    // заново вешаем обработчики
    this.closeBtnClickHandler(this._closeBtnClickHandler);
    this.favoritesClickHandler(this._favoritesClickHandler);
    this.alreadyWatchedClickHandler(this._alreadyWatchedClickHandler);
    this.watchlistClickHandler(this._watchlistClickHandler);
    this.setSmileEmotionHandler(this._setSmileEmotionHandler);
    this.setSleepingEmotionHandler(this._setSleepingEmotionHandler);
    this.setPukeEmotionHandler(this._setPukeEmotionHandler);
    this.setAngryEmotionHandler(this._setAngryEmotionHandler);

    // this._subscribeOnEvents();
  }

  // _subscribeOnEvents() {
  //   const element = this.getElement();

  //   element.querySelector(`.film-details__control-label--favorite`)
  //     .addEventListener(`click`, () => {
  //       this._isFavorite = !this._isFavorite
  //     });
    
  //   // this.rerender();
  // }
}

export default FilmPopup;
