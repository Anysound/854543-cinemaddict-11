import FilmCardComponent from '../components/filmCard.js';
import FilmCardPopupComponent from '../components/filmPopup.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import CommentsModel from '../models/comments.js';

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`
}

export const EmptyMovie = {};

class MovieController {
  constructor(container, onDataChange, movieType, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._movieType = movieType;

    this._filmCardComponent = null; // старый компонент
    this._filmCardPopupComponent = null;

    this._isRendered = false;
  }

  render(film) {

    const commentsModel = new CommentsModel();
    const commentsMocks = commentsModel.getComments();
    // console.log(comments);
    // const buildComments = commentsModel.createComments(commentsMocks);
    const filmCardComponent = new FilmCardComponent(film, commentsMocks); // новый компонент с новыми данными
    this._filmCardPopupComponent = new FilmCardPopupComponent(film, commentsMocks);
    const filmsContainer = document.querySelector(`.films-list__container`);
    // обработчики клика появления/закрытия попапа
    const onElementsClick = () => {
      // запуск viewChange
      this._onViewChange();

      render(filmsContainer, this._filmCardPopupComponent, RenderPosition.BEFOREEND);
      // document.body.appendChild(filmCardPopupComponent.getElement());
      document.addEventListener(`keydown`, this._onEscKeyClose);
      this._filmCardPopupComponent.closeBtnClickHandler(removePopupComponent);
    };

    const removePopupComponent = () => remove(this._filmCardPopupComponent);

    filmCardComponent.posterClickHandler(onElementsClick);
    filmCardComponent.titleClickHandler(onElementsClick);
    filmCardComponent.commentsClickHandler(onElementsClick);

    this._onEscKeyClose = (evt) => {
      evt.preventDefault();
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(this._filmCardPopupComponent);
        document.removeEventListener(`keydown`, this._onEscKeyClose);
      }
    };

    filmCardComponent.watchlistClickHandler(() => {
      const newData = Object.assign({}, film, {isAdded: !film.isAdded});
      this._onDataChange(this, film, newData);
    });

    filmCardComponent.alreadyWatchedClickHandler(() => {
      const newData = Object.assign({}, film, {isWatched: !film.isWatched});
      this._onDataChange(this, film, newData);
    });

    filmCardComponent.favoritesClickHandler(() => {
      const newData = Object.assign({}, film, {isFavorite: !film.isFavorite});
      this._onDataChange(this, film, newData);
    });


    // проверка существования компонента
    if (this._isRendered) {
      replace(filmCardComponent, this._filmCardComponent);
    } else {
      render(this._container, filmCardComponent, RenderPosition.BEFOREEND);
      this._isRendered = true;
    }
    this._filmCardComponent = filmCardComponent; // обновляется значение
  }

  setDefaultView() {
    remove(this._filmCardPopupComponent);
  }
}

export default MovieController;
