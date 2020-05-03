// импорт компонентов
import UserRankComponent from './components/userRank.js';
import MenuComponent from './components/menu.js';
import FilmCardPopupCompoment from './components/filmPopup.js';
import FilmCardComponent from './components/filmCard.js';
import ShowMoreBtnComponent from './components/showMoreBtn.js';
import FilmCardsContainerComponent from './components/filmCardsContainer.js';
import TopRatedFilmsContainerComponent from './components/topRatedFilmsContainer.js';
import MostCommentedFilmsContainerComponent from './components/mostCommentedFilmsContainer';
import AllFilmsCountComponent from './components/allFilmsCount.js';
import FilmsBoardComponent from './components/filmsBoard.js';
import {generateMocks} from './mock/filmData.js';
import {generateMenuFiltersData} from './mock/menuFilters.js';
import {render, RenderPosition} from './utils.js';

// константы
const EXTRA_FILMS_COUNT = 2;
const INITIAL_FILMS_COUNT = 5;
const SHOWING_FILMS_BY_BTN = 5;

// моки
let mocks = generateMocks(15);
let filtersMocks = generateMenuFiltersData();

// звание пользователя
const containerUserRank = document.querySelector(`.header`);
const userRankComponent = new UserRankComponent();
render(containerUserRank, userRankComponent.getElement(), RenderPosition.BEFOREEND);

// меню
const containerMain = document.querySelector(`.main`);
const menuComponent = new MenuComponent(filtersMocks);

menuComponent._menuFiltersData.forEach(() => {
  render(containerMain, menuComponent.getElement(), RenderPosition.AFTERBEGIN);
});


// рендер контейнера для карточек фильмов
const filmsBoardComponent = new FilmsBoardComponent();
render(containerMain, filmsBoardComponent.getElement(), RenderPosition.BEFOREEND);
const filmCardsContainerComponent = new FilmCardsContainerComponent();
render(filmsBoardComponent.getElement(), filmCardsContainerComponent.getElement(), RenderPosition.BEFOREEND);
const filmCardContainer = document.querySelector(`.films-list__container`);

// рендер фильмов
const renderFilm = (container, film, place) => {
  const filmCardComponent = new FilmCardComponent(film).getElement();
  const poster = filmCardComponent.querySelector(`.film-card__poster`);
  const title = filmCardComponent.querySelector(`.film-card__title`);
  const comments = filmCardComponent.querySelector(`.film-card__comments`);
  const filmCardPopupComponent = new FilmCardPopupCompoment(film).getElement();
  const closeBtn = filmCardPopupComponent.querySelector(`.film-details__close-btn`);
  const elements = [poster, title, comments];

  // обработчики клика появления/закрытия попапа
  const onElementsClick = () => {

    document.body.appendChild(filmCardPopupComponent);
    document.addEventListener(`keydown`, onEscKeyClose);
  };

  const onEscKeyClose = (evt) => {
    evt.preventDefault();
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      document.body.removeChild(filmCardPopupComponent);
      document.removeEventListener(`keydown`, onEscKeyClose);
    }
  };

  closeBtn.addEventListener(`click`, () => {
    document.body.removeChild(filmCardPopupComponent);
  });

  elements.forEach((elem) => {
    elem.addEventListener(`click`, onElementsClick);
  });

  render(container, filmCardComponent, place);
};

let showingFilmsCount = INITIAL_FILMS_COUNT + 1;
mocks.slice(1, showingFilmsCount)
  .forEach((film) => renderFilm(filmCardContainer, film, RenderPosition.AFTERBEGIN));

// рендер кнопки
const showMoreBtnComponent = new ShowMoreBtnComponent();
render(filmCardContainer, showMoreBtnComponent.getElement(), RenderPosition.AFTEREND);

// рендер mostCommented-контейнера
const extraFilmsContainer = document.querySelector(`.films-list`);
const mostCommentedFilmsContainerComponent = new MostCommentedFilmsContainerComponent();

render(extraFilmsContainer, mostCommentedFilmsContainerComponent.getElement(), RenderPosition.AFTEREND);

// рендер карточек mostCommented-фильмов
const extraFilms = mocks.slice(1, EXTRA_FILMS_COUNT + 1);
const mostCommentedFilmsContainer = document.querySelector(`.films-list--most-commented .films-list__container`);

extraFilms.forEach((film) => renderFilm(mostCommentedFilmsContainer, film, RenderPosition.AFTERBEGIN));

// рендер topRated-контейнера
const topRatedFilmsContainerComponent = new TopRatedFilmsContainerComponent();
render(extraFilmsContainer, topRatedFilmsContainerComponent.getElement(), RenderPosition.AFTEREND);
const topRatedFilmsContainer = document.querySelector(`.films-list--top-rated .films-list__container`);

// рендер карточек topRated-фильмов
extraFilms.forEach((film) => renderFilm(topRatedFilmsContainer, film, RenderPosition.AFTERBEGIN));

// появление карточек при клике на кнопку "show more"
let showMoreBtn = containerMain.querySelector(`.films-list__show-more`);
showMoreBtn.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BTN;

  mocks.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderFilm(filmCardContainer, film, RenderPosition.BEFOREEND));

  if (showingFilmsCount >= mocks.length) {
    showMoreBtn.remove();
  }
});

// рендер кол-ва фильмов
const filmsCountContainer = document.querySelector(`.footer__statistics`);
const allFilmsCountComponent = new AllFilmsCountComponent();
render(filmsCountContainer, allFilmsCountComponent.getElement(), RenderPosition.AFTERBEGIN);
