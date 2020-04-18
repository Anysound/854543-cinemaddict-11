// импорт компонентов
import {createUserRankTemplate} from './components/userRank.js';
import {createMenuTemplate} from './components/menu.js';
// закомментировано, чтобы не ругался линтер
// import {createFilmPopupTemplate} from './components/filmPopup.js';
import {createFilmCardTemplate} from './components/filmCard.js';
import {createShowMoreBtnTemplate} from './components/showMoreBtn.js';
import {createFilmCardsContainer} from './components/filmCardsContainer.js';
import {createTopRatedFilmsContainer} from './components/topRatedFilmsContainer.js';
import {createMostCommentedFilmsContainer} from './components/mostCommentedFilmsContainer';
import {generateMocks} from './mock/filmData.js';
import {generateMenuFiltersData} from './mock/menuFilters.js';
import {createAllFilmsCount} from './components/allFilmsCount.js';

// константы
const EXTRA_FILMS_COUNT = 2;
const INITIAL_FILMS_COUNT = 5;
const SHOWING_FILMS_BY_BTN = 5;

// моки
let mocks = generateMocks(15);
let filtersMocks = generateMenuFiltersData();

// рендеринг
const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// звание пользователя
const containerUserRank = document.querySelector(`.header`);
renderTemplate(containerUserRank, createUserRankTemplate(), `beforeend`);

// меню
const containerMain = document.querySelector(`.main`);
renderTemplate(containerMain, createMenuTemplate(filtersMocks), `afterbegin`);

// рендер контейнера для карточек фильмов
renderTemplate(containerMain, createFilmCardsContainer(), `beforeend`);

// рендер карточек фильмов
let filmCardContainer = document.querySelector(`.films-list__container`);
let showingFilmsCount = INITIAL_FILMS_COUNT + 1;

mocks.slice(1, showingFilmsCount)
  .forEach((film) => renderTemplate(filmCardContainer, createFilmCardTemplate(film), `afterbegin`));

// рендер попапа (пока отключено, т.к. появляется при клике на карточку фильма)
// renderTemplate(filmCardContainer, createFilmPopupTemplate(mocks[FIRST_ELEMENT], `afterbegin`));

// рендер кнопки
renderTemplate(filmCardContainer, createShowMoreBtnTemplate(), `afterend`);

// рендер mostCommented-контейнера
renderTemplate(document.querySelector(`.films-list`), createMostCommentedFilmsContainer(), `afterend`);

// рендер карточек mostCommented-фильмов
const mostCommentedFilmsContainer = document.querySelector(`.films-list--most-commented .films-list__container`);
const mostCommentedFilms = mocks.slice(1, EXTRA_FILMS_COUNT + 1);

mostCommentedFilms.forEach((film) => renderTemplate(mostCommentedFilmsContainer, createFilmCardTemplate(film), `afterbegin`));

// рендер topRated-контейнера
renderTemplate(document.querySelector(`.films-list`), createTopRatedFilmsContainer(), `afterend`);

// рендер карточек topRated-фильмов
const topRatedFilmsContainer = document.querySelector(`.films-list--extra .films-list__container`);
const topRatedFilms = mocks.slice(1, EXTRA_FILMS_COUNT + 1);

topRatedFilms.forEach((film) => renderTemplate(topRatedFilmsContainer, createFilmCardTemplate(film), `afterbegin`));

// появление карточек при клике на кнопку "show more"
let showMoreBtn = containerMain.querySelector(`.films-list__show-more`);
showMoreBtn.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BTN;

  mocks.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderTemplate(filmCardContainer, createFilmCardTemplate(film), `afterbegin`));

  if (showingFilmsCount >= mocks.length) {
    showMoreBtn.remove();
  }
});

// рендер кол-ва фильмов
const filmsCountContainer = document.querySelector(`.footer__statistics`);
renderTemplate(filmsCountContainer, createAllFilmsCount(), `afterbegin`);
