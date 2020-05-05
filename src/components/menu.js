import {createMenuTemplate} from '../templates/menu.js';
import AbstractComponent from './abstractComponent.js';

class Menu extends AbstractComponent {
  constructor(menuFiltersData) {
    super();
    this._menuFiltersData = menuFiltersData;
  }

  getTemplate() {
    return createMenuTemplate(this._menuFiltersData);
  }
}

export default Menu;
