import {createMenuTemplate} from '../templates/filter.js';
import AbstractComponent from './abstractComponent.js';

class Filter extends AbstractComponent {
  constructor(FiltersData) {
    super();
    this._filtersData = FiltersData;
  }

  getTemplate() {
    return createMenuTemplate(this._filtersData);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`mousedown`, (evt) => {
      debugger;
      const href = evt.target.href;
      const index = href.indexOf('#');
      const id = evt.target.href.slice(index + 1)
      // const filterName = getFilterNameById(id);
      handler(id);
    })
  }
}

export default Filter;
