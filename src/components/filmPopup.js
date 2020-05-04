import {createFilmPopupTemplate} from '../templates/filmPopup.js';
import AbstractComponent from './abstractComponent.js';

class FilmPopup extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film);
  }

  closeBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`mousedown`, handler);
  }
}

export default FilmPopup;
