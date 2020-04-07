// импорт компонентов
import {createUserRankTemplate} from './components/userRank.js';
import {createMenuTemplate} from './components/menu.js';
import {createFilmCardTemplate} from './components/filmCard.js';
import {createShowMoreBtnTemplate} from './components/showMoreBtn.js';
import {createFilmCardsContainer} from './components/filmCardsContainer.js';
import {createTopRatedFilmsContainer} from './components/topRatedFilmsContainer.js';
import {createMostCommentedFilmsContainer} from './components/mostCommentedFilmsContainer';

// константы
const FILM_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

// рендеринг
const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// звание пользователя
const containerUserRank = document.querySelector(`.header`);
renderTemplate(containerUserRank, createUserRankTemplate(), `beforeend`);

// меню
const containerMain = document.querySelector(`.main`);
renderTemplate(containerMain, createMenuTemplate(), `afterbegin`);

// рендер контейнера для карточек фильмов
renderTemplate(containerMain, createFilmCardsContainer(), `beforeend`);

// рендер карточек фильмов
const filmCardContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  renderTemplate(filmCardContainer, createFilmCardTemplate(), `afterbegin`);
}

// рендер кнопки
renderTemplate(filmCardContainer, createShowMoreBtnTemplate(), `afterend`);

// рендер mostCommented-контейнера
renderTemplate(document.querySelector(`.films-list`), createMostCommentedFilmsContainer(), `afterend`);

// рендер карточек mostCommented-фильмов
const mostCommentedFilmsContainer = document.querySelector(`.films-list--most-commented .films-list__container`);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  renderTemplate(mostCommentedFilmsContainer, createFilmCardTemplate(), `afterbegin`);
}

// рендер topRated-контейнера
renderTemplate(document.querySelector(`.films-list`), createTopRatedFilmsContainer(), `afterend`);

// рендер карточек topRated-фильмов
const topRatedFilmsContainer = document.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  renderTemplate(topRatedFilmsContainer, createFilmCardTemplate(), `afterbegin`);
}
