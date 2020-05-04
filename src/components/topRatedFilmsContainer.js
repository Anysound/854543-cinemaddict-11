import {createTopRatedFilmsContainerTemplate} from '../templates/topRatedFilmsContainer.js';
import AbstractComponent from './abstractComponent.js';

class TopRatedFilmsContainer extends AbstractComponent {
  getTemplate() {
    return createTopRatedFilmsContainerTemplate();
  }
}

export default TopRatedFilmsContainer;
