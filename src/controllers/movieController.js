import FilmCardComponent from '../components/filmCard.js';
import FilmCardPopupComponent from '../components/filmPopup.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';

class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmCardComponent = null;
    this._filmCardPopupComponent = null;
    this._isRendered = false;
  }

  _renderFilm(film) {
    debugger;
    const filmCardComponent = new FilmCardComponent(film);
    this._filmCardPopupComponent = new FilmCardPopupComponent(film);

    // обработчики клика появления/закрытия попапа
    const onElementsClick = () => {
      document.body.appendChild(this._filmCardPopupComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyClose);
      this._filmCardPopupComponent.closeBtnClickHandler(removePopupComponent);
    };

    const removePopupComponent = () => remove(this._filmCardPopupComponent);

    filmCardComponent.posterClickHandler(onElementsClick);
    filmCardComponent.titleClickHandler(onElementsClick);
    filmCardComponent.commentsClickHandler(onElementsClick);

    const onEscKeyClose = (evt) => {
      evt.preventDefault();
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(this._filmCardPopupComponent);
        document.removeEventListener(`keydown`, onEscKeyClose);
      }
    };

    filmCardComponent.watchlistClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isAdded: !film.isAdded
      }))
    });

    filmCardComponent.alreadyWatchedClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isWatched: !film.isWatched
      }))
    });

    filmCardComponent.favoritesClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isFavorite: !film.isFavorite
      }))
    });

    if (this._isRendered) {
      replace(filmCardComponent, this._filmCardComponent);
      this._filmCardComponent = filmCardComponent;
    } else {
      render(this._container, filmCardComponent, RenderPosition.BEFOREEND);
      this._isRendered = true;
      this._filmCardComponent = filmCardComponent;
    } 
  }
}

export default MovieController;
