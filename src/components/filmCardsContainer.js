import {createFilmCardsContainerTemplate} from '../templates/filmCardsContainer.js';
import AbstractComponent from './abstractComponent.js';

class FilmCardsContainer extends AbstractComponent {
  getTemplate() {
    return createFilmCardsContainerTemplate();
  }
}

export default FilmCardsContainer;
