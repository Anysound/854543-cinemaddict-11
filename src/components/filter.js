import {createMenuTemplate} from '../templates/filter.js';
import AbstractComponent from './abstractComponent.js';

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
}

class Filter extends AbstractComponent {
  constructor(FiltersData) {
    super();
    this._filtersData = FiltersData;
  }

  getTemplate() {
    return createMenuTemplate(this._filtersData);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    })
  }
}

export default Filter;
