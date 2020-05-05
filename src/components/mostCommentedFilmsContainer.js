import {createMostCommentedFilmsContainerTemplate} from '../templates/mostCommentedFilmsContainer.js';
import AbstractComponent from './abstractComponent.js';
class MostCommentedFilmsContainer extends AbstractComponent {
  getTemplate() {
    return createMostCommentedFilmsContainerTemplate();
  }
}

export default MostCommentedFilmsContainer;
