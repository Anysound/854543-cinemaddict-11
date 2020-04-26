import {createElement} from '../utils.js';
import {createFilmCardsContainerTemplate} from '../templates/filmCardsContainer.js';

class FilmCardsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmCardsContainerTemplate();
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

export default FilmCardsContainer;
