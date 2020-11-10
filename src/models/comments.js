// import {createComments} from '../templates/filmPopup.js';
import {getRandomComments} from '../mocks/filmData';

class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  createComments(commentsData) {
    let commentsTemplate = ``;
    this._comments = commentsData;
    console.log(this._comments);
    commentsData.forEach((it) => {
      const {emoji, message, author, commentDate} = it;
      commentsTemplate += `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-${emoji}">
        </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
      </li>`;
    })
    return commentsTemplate;
  };

  getComments() {
    this._comments = getRandomComments();
    return getRandomComments();
  }

  removeComment() {
    this._comments = [];
  }
}

export default Comments;
