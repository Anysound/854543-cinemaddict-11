import {createElement} from '../utils.js';
import {createMostCommentedFilmsContainerTemplate} from '../templates/mostCommentedFilmsContainer.js';

class MostCommentedFilmsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedFilmsContainerTemplate();
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

export default MostCommentedFilmsContainer;
