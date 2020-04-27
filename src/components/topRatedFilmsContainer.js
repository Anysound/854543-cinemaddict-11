import {createElement} from '../utils.js';
import {createTopRatedFilmsContainerTemplate} from '../templates/topRatedFilmsContainer.js';

class TopRatedFilmsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTopRatedFilmsContainerTemplate();
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

export default TopRatedFilmsContainer;
