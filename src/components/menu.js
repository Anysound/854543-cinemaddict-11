import {createElement} from '../utils.js';
import {createMenuTemplate} from '../templates/menu.js';
class Menu {
  constructor(menuFiltersData) {
    this._menuFiltersData = menuFiltersData;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._menuFiltersData);
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

export default Menu;
