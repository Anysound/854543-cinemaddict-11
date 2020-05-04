import {createFilmsBoardTemplate} from '../templates/filmsBoard.js';
import AbstractComponent from './abstractComponent.js';
class FilmsBoard extends AbstractComponent {
  getTemplate() {
    return createFilmsBoardTemplate();
  }
}

export default FilmsBoard;
