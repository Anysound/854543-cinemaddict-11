import {createElement} from '../utils.js';
import {createFilmPopupTemplate} from '../templates/filmPopup.js';

class FilmPopup {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FilmPopup;
