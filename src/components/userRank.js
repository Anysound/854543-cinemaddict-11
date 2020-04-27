import {createElement} from '../utils.js';
import {createUserRankTemplate} from '../templates/userRank.js';

class UserRank {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createUserRankTemplate();
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

export default UserRank;
