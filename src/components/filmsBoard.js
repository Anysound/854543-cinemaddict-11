import {createElement} from '../utils.js';
import {createFilmsBoardTemplate} from '../templates/filmsBoard.js';

class FilmsBoard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsBoardTemplate();
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

export default FilmsBoard;
