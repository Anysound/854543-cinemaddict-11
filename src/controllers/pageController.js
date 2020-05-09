import FilmCardPopupCompoment from '../components/filmPopup.js';
import FilmCardComponent from '../components/filmCard.js';
import ShowMoreBtnComponent from '../components/showMoreBtn.js';
import FilmCardsContainerComponent from '../components/filmCardsContainer.js';
import TopRatedFilmsContainerComponent from '../components/topRatedFilmsContainer.js';
import MostCommentedFilmsContainerComponent from '../components/mostCommentedFilmsContainer';
import FilmsBoardComponent from '../components/filmsBoard.js';
import SortComponent from '../components/sort.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {SortType} from '../templates/sort.js';

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
    this._sortComponent = new SortComponent();
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

  _renderShowMoreBtn(films) {
    const filmCardContainer = document.querySelector(`.films-list__container`);
    let showingFilmsCount = INITIAL_FILMS_COUNT + 1;

    if (showingFilmsCount >= films.length) {
      return;
    }
    this._showMoreBtnComponent.removeElement();
    render(filmCardContainer, this._showMoreBtnComponent, RenderPosition.AFTEREND);

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

  _getSortedFilms(films, sortType, from, to) {
    let sortedFilms = [];
    const showingFilms = films.slice();

    switch (sortType) {
      case SortType.RATING:
        sortedFilms = showingFilms.sort((a, b) => a.rank - b.rank);
        break;

      case SortType.DATE:
        sortedFilms = showingFilms.sort((a, b) => a.releaseYear - b.releaseYear);
        break;

      case SortType.DEFAULT:
        sortedFilms = showingFilms;
        break;
    }

    return sortedFilms.slice(from, to);
  }

  render(films) {
    const filmCardContainer = document.querySelector(`.films-list__container`);
    const filmsContainer = document.querySelector(`.films-list`);
    let showingFilmsCount = INITIAL_FILMS_COUNT + 1;

    document.querySelector(`.films-list__container`).contains(document.querySelector(`.films-list__show-more`));
    // сортировка
    render(filmCardContainer, this._sortComponent, RenderPosition.BEFOREBEGIN);
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = INITIAL_FILMS_COUNT + 1;

      const sortedFilms = this._getSortedFilms(films, sortType, 0, showingFilmsCount);

      filmCardContainer.innerHTML = ``;

      sortedFilms.slice(1, showingFilmsCount)
        .forEach((film) => this._renderFilm(filmCardContainer, film, RenderPosition.AFTERBEGIN));
      // рендер кнопки
      // при клике по фильтрам, если не нажимать loadMoreBtn, кнопка не рендерилась,
      // добавил проверку чтобы рендер кнопки не дублировался
      if (!filmsContainer.contains(this._showMoreBtnComponent.getElement())) {
        this._renderShowMoreBtn(films);
      }
    });

    // начальный рендер фильмов и кнопки
    films.slice(1, showingFilmsCount)
      .forEach((film) => this._renderFilm(filmCardContainer, film, RenderPosition.AFTERBEGIN));

    this._renderShowMoreBtn(films);

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
  }
}

export default PageControoler;
