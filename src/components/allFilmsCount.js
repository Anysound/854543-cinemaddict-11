import {createElement} from '../utils.js';
import {createAllFilmsCount} from '../templates/allFilmsCount.js';

class AllFilmsCount {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createAllFilmsCount();
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

export default AllFilmsCount;
