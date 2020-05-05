import FilmCardPopupCompoment from '../components/filmPopup.js';
import FilmCardComponent from '../components/filmCard.js';
import ShowMoreBtnComponent from '../components/showMoreBtn.js';
import FilmCardsContainerComponent from '../components/filmCardsContainer.js';
import TopRatedFilmsContainerComponent from '../components/topRatedFilmsContainer.js';
import MostCommentedFilmsContainerComponent from '../components/mostCommentedFilmsContainer';
import FilmsBoardComponent from '../components/filmsBoard.js';

import {render, RenderPosition, remove} from '../utils/render.js';

// константы
const EXTRA_FILMS_COUNT = 2;
const INITIAL_FILMS_COUNT = 5;
const SHOWING_FILMS_BY_BTN = 5;

class PageControoler {
  constructor(container) {
    this._container = container;
    this._showMoreBtnComponent = new ShowMoreBtnComponent();
    this._mostCommentedFilmsContainerComponent = new MostCommentedFilmsContainerComponent();
    this._topRatedFilmsContainerComponent = new TopRatedFilmsContainerComponent();
    this._filmsBoardComponent = new FilmsBoardComponent();
    this._filmCardsContainerComponent = new FilmCardsContainerComponent();
  }

  renderBoard() {
    const containerMain = document.querySelector(`.main`);
    // рендер контейнера для карточек фильмов
    render(containerMain, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent.getElement(), this._filmCardsContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(container, film, place) {
    const filmCardComponent = new FilmCardComponent(film);
    const filmCardPopupComponent = new FilmCardPopupCompoment(film);

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

    render(container, filmCardComponent, place);
  }

  render(films) {
    const filmCardContainer = document.querySelector(`.films-list__container`);
    let showingFilmsCount = INITIAL_FILMS_COUNT + 1;
    films.slice(1, showingFilmsCount)
      .forEach((film) => this._renderFilm(filmCardContainer, film, RenderPosition.AFTERBEGIN));

    // рендер кнопки
    render(filmCardContainer, this._showMoreBtnComponent, RenderPosition.AFTEREND);

    // рендер mostCommented-контейнера
    const extraFilmsContainer = document.querySelector(`.films-list`);
    render(extraFilmsContainer, this._mostCommentedFilmsContainerComponent, RenderPosition.AFTEREND);

    // рендер карточек mostCommented-фильмов
    const extraFilms = films.slice(1, EXTRA_FILMS_COUNT + 1);
    const mostCommentedFilmsContainer = document.querySelector(`.films-list--most-commented .films-list__container`);

    extraFilms.forEach((film) => this._renderFilm(mostCommentedFilmsContainer, film, RenderPosition.AFTERBEGIN));

    // рендер topRated-контейнера
    render(extraFilmsContainer, this._topRatedFilmsContainerComponent, RenderPosition.AFTEREND);
    const topRatedFilmsContainer = document.querySelector(`.films-list--top-rated .films-list__container`);

    // рендер карточек topRated-фильмов
    extraFilms.forEach((film) => this._renderFilm(topRatedFilmsContainer, film, RenderPosition.AFTERBEGIN));

    // появление карточек при клике на кнопку "show more"
    this._showMoreBtnComponent.setClickHandler(() => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BTN;

      films.slice(prevFilmsCount, showingFilmsCount)
        .forEach((film) => this._renderFilm(filmCardContainer, film, RenderPosition.BEFOREEND));

      if (showingFilmsCount >= films.length) {
        remove(this._showMoreBtnComponent);
      }
    });
  }
}

export default PageControoler;
