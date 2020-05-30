import FilmCardComponent from '../components/filmCard.js';
import FilmCardPopupComponent from '../components/filmPopup.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';

class MovieController {
  constructor(container, onDataChange, movieType) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._movieType = movieType;

    this._filmCardComponent = null;
    this._filmCardPopupComponent = null;
    // this._img = this._filmCardPopupComponent.getElement(`.film-details__add-emoji-label img`);

    this._isRendered = false;
  }

  _renderFilm(film) {

    const filmCardComponent = new FilmCardComponent(film);
    const filmCardPopupComponent = new FilmCardPopupComponent(film);
    // this._filmCardPopupComponent = new FilmCardPopupComponent(film);

    // обработчики клика появления/закрытия попапа
    const onElementsClick = () => {
      document.body.appendChild(filmCardPopupComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyClose);
      filmCardPopupComponent.closeBtnClickHandler(removePopupComponent);
    };

    const removePopupComponent = () => remove(filmCardPopupComponent);

    filmCardComponent.posterClickHandler(onElementsClick);
    filmCardComponent.titleClickHandler(onElementsClick);
    filmCardComponent.commentsClickHandler(onElementsClick);

    const onEscKeyClose = (evt) => {
      evt.preventDefault();
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(filmCardPopupComponent);
        document.removeEventListener(`keydown`, onEscKeyClose);
      }
    };

    filmCardComponent.watchlistClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAdded: !film.isAdded
      }))
    });

    filmCardComponent.alreadyWatchedClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched
      }))
    });

    filmCardComponent.favoritesClickHandler(() => {
      const newData = Object.assign({}, film, {isFavorite: !film.isFavorite});
      this._onDataChange(this, film, newData, this._movieType)

      
    });

    filmCardPopupComponent.setSmileEmotionHandler(() => {
      const label = document.querySelector(`.film-details__add-emoji-label`);
      const img = document.createElement(`img`);
      const oldImg = label.querySelector(`img`);
      img.src = filmCardPopupComponent.getElement().querySelector(`.film-details__emoji-label--smile img`).src;
      if (label.contains(oldImg)) {
        oldImg.src = filmCardPopupComponent.getElement().querySelector(`.film-details__emoji-label--smile img`).src;
      } else {
        label.prepend(img);
      }
      
    });

    filmCardPopupComponent.setSleepingEmotionHandler(() => {
      const label = document.querySelector(`.film-details__add-emoji-label`);
      const img = document.createElement(`img`);
      const oldImg = label.querySelector(`img`);
      img.src = filmCardPopupComponent.getElement().querySelector(`.film-details__emoji-label--sleeping img`).src;
      
      if (label.contains(oldImg)) {
        oldImg.src = filmCardPopupComponent.getElement().querySelector(`.film-details__emoji-label--sleeping img`).src;
      } else {
        label.prepend(img);
      }      
    });

    filmCardPopupComponent.setPukeEmotionHandler(() => {
      const label = document.querySelector(`.film-details__add-emoji-label`);
      const img = document.createElement(`img`);
      const oldImg = label.querySelector(`img`);
      img.src = filmCardPopupComponent.getElement().querySelector(`.film-details__emoji-label--puke img`).src;
      
      if (label.contains(oldImg)) {
        oldImg.src = filmCardPopupComponent.getElement().querySelector(`.film-details__emoji-label--puke img`).src;
      } else {
        label.prepend(img);
      }
    });

  filmCardPopupComponent.setAngryEmotionHandler(() => {
    const label = document.querySelector(`.film-details__add-emoji-label`);
    const img = document.createElement(`img`);
    const oldImg = label.querySelector(`img`);
    img.src = filmCardPopupComponent.getElement().querySelector(`.film-details__emoji-label--angry img`).src;
    
    if (label.contains(oldImg)) {
      oldImg.src = filmCardPopupComponent.getElement().querySelector(`.film-details__emoji-label--angry img`).src;
    } else {
      label.prepend(img);
    }
  });

    // проверка существованния компонента
    if (this._isRendered) {
      replace(filmCardComponent, this._filmCardComponent);
    } else {
      render(this._container, filmCardComponent, RenderPosition.BEFOREEND);
      this._isRendered = true;
    }
    this._filmCardComponent = filmCardComponent;
  }
}

export default MovieController;
