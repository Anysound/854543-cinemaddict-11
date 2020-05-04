import FilmCardPopupCompoment from '../components/filmPopup.js';
import FilmCardComponent from '../components/filmCard.js';
import ShowMoreBtnComponent from '../components/showMoreBtn.js';
import FilmCardsContainerComponent from '../components/filmCardsContainer.js';
import TopRatedFilmsContainerComponent from '../components/topRatedFilmsContainer.js';
import MostCommentedFilmsContainerComponent from '../components/mostCommentedFilmsContainer';
import FilmsBoardComponent from '../components/filmsBoard.js';
import {generateMocks} from '../mock/filmData.js';
import {render, RenderPosition, remove} from '../utils/render.js';

// константы
const EXTRA_FILMS_COUNT = 2;
const INITIAL_FILMS_COUNT = 5;
const SHOWING_FILMS_BY_BTN = 5;

// моки
let mocks = generateMocks(15);
const containerMain = document.querySelector(`.main`);
// рендер контейнера для карточек фильмов
const filmsBoardComponent = new FilmsBoardComponent();
render(containerMain, filmsBoardComponent, RenderPosition.BEFOREEND);
const filmCardsContainerComponent = new FilmCardsContainerComponent();
render(filmsBoardComponent.getElement(), filmCardsContainerComponent, RenderPosition.BEFOREEND);
const filmCardContainer = document.querySelector(`.films-list__container`);

// рендер фильмов
const renderFilm = (container, film, place) => {
  const filmCardComponent = new FilmCardComponent(film);
  // const poster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  // const title = filmCardComponent.getElement().querySelector(`.film-card__title`);
  // const comments = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  const filmCardPopupComponent = new FilmCardPopupCompoment(film);
  // const closeBtn = filmCardPopupComponent.getElement().querySelector(`.film-details__close-btn`);
  // const elements = [comments];

  

  // обработчики клика появления/закрытия попапа
  const onElementsClick = () => {
    document.body.appendChild(filmCardPopupComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyClose);
    filmCardPopupComponent.closeBtnClickHandler(removePopup);
  };

  const removePopup = () => remove(filmCardPopupComponent);

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

 
  
  // closeBtn.addEventListener(`click`, () => {
    
  // });

  // elements.forEach((elem) => {
  //   elem.addEventListener(`click`, onElementsClick);
  // });

  render(container, filmCardComponent, place);
};

let showingFilmsCount = INITIAL_FILMS_COUNT + 1;
mocks.slice(1, showingFilmsCount)
  .forEach((film) => renderFilm(filmCardContainer, film, RenderPosition.AFTERBEGIN));

// рендер кнопки
const showMoreBtnComponent = new ShowMoreBtnComponent();
render(filmCardContainer, showMoreBtnComponent, RenderPosition.AFTEREND);

// рендер mostCommented-контейнера
const extraFilmsContainer = document.querySelector(`.films-list`);
const mostCommentedFilmsContainerComponent = new MostCommentedFilmsContainerComponent();

render(extraFilmsContainer, mostCommentedFilmsContainerComponent, RenderPosition.AFTEREND);

// рендер карточек mostCommented-фильмов
const extraFilms = mocks.slice(1, EXTRA_FILMS_COUNT + 1);
const mostCommentedFilmsContainer = document.querySelector(`.films-list--most-commented .films-list__container`);

extraFilms.forEach((film) => renderFilm(mostCommentedFilmsContainer, film, RenderPosition.AFTERBEGIN));

// рендер topRated-контейнера
const topRatedFilmsContainerComponent = new TopRatedFilmsContainerComponent();
render(extraFilmsContainer, topRatedFilmsContainerComponent, RenderPosition.AFTEREND);
const topRatedFilmsContainer = document.querySelector(`.films-list--top-rated .films-list__container`);

// рендер карточек topRated-фильмов
extraFilms.forEach((film) => renderFilm(topRatedFilmsContainer, film, RenderPosition.AFTERBEGIN));

// появление карточек при клике на кнопку "show more"
// showMoreBtnComponent = containerMain.querySelector(`.films-list__show-more`);
showMoreBtnComponent.setClickHandler(() => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BTN;

  mocks.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderFilm(filmCardContainer, film, RenderPosition.BEFOREEND));

  if (showingFilmsCount >= mocks.length) {
    remove(showMoreBtnComponent);
  }
});

// class BoardControoler {
//   constructor(container) {
//     this._container = container;
//   }

//   render(films) {

//   }
// }

export default BoardControoler;
