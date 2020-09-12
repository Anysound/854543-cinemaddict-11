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
const INITIAL_FILMS_COUNT = 5;
const SHOWING_FILMS_BY_BTN = 5;

const FilmType = {
  ALL: `filmType.all`,
  MOST_COMMENTED: `filmType.mostCommented`,
  TOP_RATED: `filmType.topRated`
};

class PageController {
  constructor(container, moviesModel) {

    this._container = container;
    this._moviesModel = moviesModel;

    this._showMoreBtnComponent = new ShowMoreBtnComponent();
    this._mostCommentedFilmsContainerComponent = new MostCommentedFilmsContainerComponent();
    this._topRatedFilmsContainerComponent = new TopRatedFilmsContainerComponent();
    this._filmsBoardComponent = new FilmsBoardComponent();
    this._filmCardsContainerComponent = new FilmCardsContainerComponent();
    this._sortComponent = new SortComponent();
    this._showingFilmsCount = INITIAL_FILMS_COUNT;

    this._films = [];
    this._topRatedFilms = [];
    this._mostCommentedFilms = [];

    

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onLoadMoreBtnClick = this._onLoadMoreBtnClick.bind(this);

    this._showedFilmsControllers = [];
    this._mostCommentedFilmsControllers = [];
    this._topRatedFilmsControllers = [];
  }

  renderBoard() {
    const containerMain = document.querySelector(`.main`);
    // рендер контейнера для карточек фильмов
    render(containerMain, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent.getElement(), this._filmCardsContainerComponent, RenderPosition.BEFOREEND);
  }

  _removeFilms() {
    debugger;
    this._showedFilmsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmsControllers = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._moviesModel.getMoviesAll().slice(0, count));
    this._renderShowMoreBtn();
  }

  _onFilterChange() {
    this._updateFilms(INITIAL_FILMS_COUNT);
  }

  _renderFilms(container, films, onDataChange, filmType, onViewChange) {
    return films.map((film) => {
      const movieController = new MovieController(container, onDataChange, filmType, onViewChange);
      movieController._filmType = filmType;
      movieController.render(film);
      return movieController;
    });
  }

  _renderShowMoreBtn() {
    const filmCardContainer = document.querySelector(`.films-list__container`);
    const movies = this._moviesModel.getMovies();

    if (this._showingFilmsCount >= movies.length) {
      return;
    }
    this._showMoreBtnComponent.removeElement();
    render(filmCardContainer, this._showMoreBtnComponent, RenderPosition.AFTEREND);

    this._showMoreBtnComponent.setClickHandler(this._onLoadMoreBtnClick);
  }

  _getSortedFilms(sortType, from, to) {
    let sortedFilms = [];
    const showingFilms = this._moviesModel.getMoviesAll();

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

    const sortedFilms = this._getSortedFilms(sortType, 0, this._showingFilmsCount);
    filmCardContainer.innerHTML = ``;

    const newFilms = this._renderFilms(filmCardContainer, sortedFilms, this._onDataChange, FilmType.ALL, this._onViewChange);
    this._showedFilmsControllers = newFilms;

    // рендер кнопки
    // при клике по фильтрам, если не нажимать loadMoreBtn, кнопка не рендерилась,
    // добавил проверку чтобы рендер кнопки не дублировался
    if (!filmsContainer.contains(this._showMoreBtnComponent.getElement())) {
      this._renderShowMoreBtn(this._moviesModel.getMovies());
    }
  }

  _onDataChange(controller, oldData, newData) {

    let controllers; // eslint-disable-line no-unused-vars

    switch (controller._movieType) {
      case `filmType.all`:
        controllers = this._showedFilmsControllers;
        break;

      case `filmType.mostCommented`:
        controllers = this._mostCommentedFilmsControllers;
        break;

      case `filmType.topRated`:
        controllers = this._topRatedFilmsControllers;
        break;
    }

    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);
    if (isSuccess) {
      controller.render(newData);
    }

    // const index = films.findIndex((it) => it === oldData);

    // controllers = [].concat(controllers.slice(0, index), controller, controllers.slice(index + 1));
    // controller.render(newData);

    // if (index === -1) {
    //   return;
    // }
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((item) => item.setDefaultView());
    this._mostCommentedFilmsControllers.forEach((item) => item.setDefaultView());
    this._topRatedFilmsControllers.forEach((item) => item.setDefaultView());
  }

  _onLoadMoreBtnClick() {
      const filmCardContainer = document.querySelector(`.films-list__container`);
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_BY_BTN;
      const movies = this._moviesModel.getMoviesAll();

      const sortedFilms = this._getSortedFilms(this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);

      const newFilms = this._renderFilms(filmCardContainer, sortedFilms, this._onDataChange, FilmType.ALL, this._onViewChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

      if (this._showingFilmsCount >= movies.length) {
        remove(this._showMoreBtnComponent);
      }

  }

  render(mostCommentedFilms, topRatedFilms) {
    const films = this._moviesModel.getMovies();
    this._topRatedFilms = topRatedFilms;
    this._mostCommentedFilms = mostCommentedFilms;
    const filmCardContainer = document.querySelector(`.films-list__container`);
    // const filmsContainer = document.querySelector(`.films-list`);
    // let showingFilmsCount = INITIAL_FILMS_COUNT + 1;

    // document.querySelector(`.films-list__container`).contains(document.querySelector(`.films-list__show-more`));
    // сортировка
    render(filmCardContainer, this._sortComponent, RenderPosition.BEFOREBEGIN);

    // начальный рендер фильмов и кнопки
    const initialFilms = this._renderFilms(filmCardContainer, films.slice(0, this._showingFilmsCount), this._onDataChange, FilmType.ALL, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(initialFilms);

    this._renderShowMoreBtn();

    const extraFilmsContainer = document.querySelector(`.films-list`);

    // рендер mostCommented-контейнера
    render(extraFilmsContainer, this._mostCommentedFilmsContainerComponent, RenderPosition.AFTEREND);

    // рендер карточек mostCommented-фильмов
    const mostCommentedFilmsContainer = document.querySelector(`.films-list--most-commented .films-list__container`);
    const extraFilms = this._moviesModel.getMovies().slice(0, 2);
    const mostCommentedControllers = this._renderFilms(mostCommentedFilmsContainer, extraFilms, this._onDataChange, FilmType.MOST_COMMENTED, this._onViewChange);
    this._mostCommentedFilmsControllers = this._mostCommentedFilmsControllers.concat(mostCommentedControllers);

    // рендер topRated-контейнера
    render(extraFilmsContainer, this._topRatedFilmsContainerComponent, RenderPosition.AFTEREND);

    // рендер карточек topRated-фильмов
    const topRatedFilmsContainer = document.querySelector(`.films-list--top-rated .films-list__container`);
    const topRatedControllers = this._renderFilms(topRatedFilmsContainer, extraFilms, this._onDataChange, FilmType.TOP_RATED, this._onViewChange);
    this._topRatedFilmsControllers = this._topRatedFilmsControllers.concat(topRatedControllers);
  }
}

export default PageController;
