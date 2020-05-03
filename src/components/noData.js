import {createElement} from '../utils.js';
import {createNoDataTemplate} from '../templates/noData.js';

class NoData {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoDataTemplate();
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

export default NoData;
