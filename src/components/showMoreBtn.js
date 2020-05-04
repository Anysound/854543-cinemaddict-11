import {createShowMoreBtnTemplate} from '../templates/showMoreBtn.js';
import AbstractComponent from './abstractComponent.js'

class ShowMoreBtn extends AbstractComponent {
  getTemplate() {
    return createShowMoreBtnTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler)
  }
}

export default ShowMoreBtn;
