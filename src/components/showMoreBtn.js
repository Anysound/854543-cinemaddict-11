import {createElement} from '../utils.js';
import {createShowMoreBtnTemplate} from '../templates/showMoreBtn.js';

class ShowMoreBtn {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreBtnTemplate();
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

export default ShowMoreBtn;
