import MovieController from '../controllers/movieController.js';
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

class PageController {
  constructor(container) {
    this._container = container;
    this._showMoreBtnComponent = new ShowMoreBtnComponent();
    this._mostCommentedFilmsContainerComponent = new MostCommentedFilmsContainerComponent();
    this._topRatedFilmsContainerComponent = new TopRatedFilmsContainerComponent();
    this._filmsBoardComponent = new FilmsBoardComponent();
    this._filmCardsContainerComponent = new FilmCardsContainerComponent();
    this._sortComponent = new SortComponent();

    this._showingFilmsCount = INITIAL_FILMS_COUNT + 1;
    this._films = [];

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._onDataChange = this._onDataChange.bind(this);
    this._showedFilmsControllers = [];
  }

  renderBoard() {
    const containerMain = document.querySelector(`.main`);
    // рендер контейнера для карточек фильмов
    render(containerMain, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent.getElement(), this._filmCardsContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(container, films, onDataChange) {
    return films.map((film) => {
      const movieController = new MovieController(container, onDataChange);
      movieController._renderFilm(film);
      return movieController;
    });
    
  }

  _renderShowMoreBtn(films) {
    const filmCardContainer = document.querySelector(`.films-list__container`);

    if (this._showingFilmsCount >= films.length) {
      return;
    }
    this._showMoreBtnComponent.removeElement();
    render(filmCardContainer, this._showMoreBtnComponent, RenderPosition.AFTEREND);

    this._showMoreBtnComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_BY_BTN;

      // this._films.slice(prevFilmsCount, showingFilmsCount)
      //   .forEach((film) => this._renderFilm(filmCardContainer, film, RenderPosition.BEFOREEND));
      const sortedFilms = this._getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
      const newFilms = this._renderFilms(filmCardContainer, sortedFilms, this._onDataChange);
      
      console.log(sortedFilms);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
      console.log(this._showedFilmsControllers);

      if (this._showingFilmsCount >= films.length) {
        remove(this._showMoreBtnComponent);
      }
    });
  }

  _getSortedFilms(films, sortType, from, to) {
    let sortedFilms = [];
    const showingFilms = films.slice();

    switch (sortType) {
      case SortType.RATING:
        sortedFilms = showingFilms.sort((a, b) => b.rank - a.rank);
        break;

      case SortType.DATE:
        sortedFilms = showingFilms.sort((a, b) => b.releaseYear - a.releaseYear);
        break;

      case SortType.DEFAULT:
        sortedFilms = showingFilms;
        break;
    }

    return sortedFilms.slice(from, to);
  }

  _onSortTypeChange(sortType) {
    // this._showingFilmsCount = INITIAL_FILMS_COUNT + 1;
    const filmCardContainer = document.querySelector(`.films-list__container`);
    const filmsContainer = document.querySelector(`.films-list`);

    const sortedFilms = this._getSortedFilms(this._films, sortType, 1, this._showingFilmsCount);
    console.log(sortedFilms);
    filmCardContainer.innerHTML = ``;

    const newFilms = this._renderFilms(filmCardContainer, sortedFilms, this._onDataChange);
    this._showedFilmsControllers = newFilms;

    // sortedFilms.slice(1, this._showingFilmsCount)
    //   .forEach((film) => this._renderFilm(filmCardContainer, film, RenderPosition.AFTERBEGIN));

    // рендер кнопки
    // при клике по фильтрам, если не нажимать loadMoreBtn, кнопка не рендерилась,
    // добавил проверку чтобы рендер кнопки не дублировался
    if (!filmsContainer.contains(this._showMoreBtnComponent.getElement())) {
      this._renderShowMoreBtn(this._films);
    }
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);
  
    if (index === -1) {
      return;
    }

    console.log(this._films);
    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    this._showedFilmsControllers[index]._renderFilm(newData);
  }


  render(films) {
    this._films = films;
    const filmCardContainer = document.querySelector(`.films-list__container`);
    const filmsContainer = document.querySelector(`.films-list`);
    // let showingFilmsCount = INITIAL_FILMS_COUNT + 1;

    //render(filmCardContainer, this._)

    document.querySelector(`.films-list__container`).contains(document.querySelector(`.films-list__show-more`));
    // сортировка
    render(filmCardContainer, this._sortComponent, RenderPosition.BEFOREBEGIN);

    // начальный рендер фильмов и кнопки
    const initialFilms = this._renderFilms(filmCardContainer, films.slice(1, this._showingFilmsCount), this._onDataChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(initialFilms);
    console.log(this._showedFilmsControllers);

    this._showedFilmsControllers.concat(initialFilms);

    this._renderShowMoreBtn(films);

    // рендер mostCommented-контейнера
    const extraFilmsContainer = document.querySelector(`.films-list`);
    render(extraFilmsContainer, this._mostCommentedFilmsContainerComponent, RenderPosition.AFTEREND);

    // рендер карточек mostCommented-фильмов
    const extraFilms = films.slice(1, EXTRA_FILMS_COUNT + 1);
    const mostCommentedFilmsContainer = document.querySelector(`.films-list--most-commented .films-list__container`);

    this._renderFilms(mostCommentedFilmsContainer, extraFilms, this._onDataChange);

    // рендер topRated-контейнера
    render(extraFilmsContainer, this._topRatedFilmsContainerComponent, RenderPosition.AFTEREND);
    const topRatedFilmsContainer = document.querySelector(`.films-list--top-rated .films-list__container`);

    // рендер карточек topRated-фильмов
    this._renderFilms(topRatedFilmsContainer, extraFilms, this._onDataChange);
  }

}

export default PageController;
