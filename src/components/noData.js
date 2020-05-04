import {createNoDataTemplate} from '../templates/noData.js';
import AbstractComponent from './abstractComponent.js';

class NoData extends AbstractComponent {
  getTemplate() {
    return createNoDataTemplate();
  }
}

export default NoData;
