import {createUserRankTemplate} from '../templates/userRank.js';
import AbstractComponent from './abstractComponent.js';

class UserRank extends AbstractComponent {
  getTemplate() {
    return createUserRankTemplate();
  }
}

export default UserRank;
