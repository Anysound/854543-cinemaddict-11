import {createAllFilmsCount} from '../templates/allFilmsCount.js';
import AbstractComponent from './abstractComponent.js';

class AllFilmsCount extends AbstractComponent {
  getTemplate() {
    return createAllFilmsCount();
  }
}

export default AllFilmsCount;
