// импорт компонентов
import UserRankComponent from './components/userRank.js';
// import FilterComponent from './components/filter.js';
import AllFilmsCountComponent from './components/allFilmsCount.js';
import {generateMenuFiltersData} from './mocks/menuFilters.js';
import {render, RenderPosition} from './utils/render.js';
import PageController from './controllers/pageController.js';
import FilterController from './controllers/filterController.js';
import {generateMocks} from './mocks/filmData.js';
import MoviesModel from './models/movies.js';

// моки
let mocks = generateMocks(15);
let extraMocksTopRated = generateMocks(2);
let extraMocksMostCommented = generateMocks(2);
let filtersMocks = generateMenuFiltersData();

let moviesModel = new MoviesModel();
moviesModel.setMovies(mocks);

// звание пользователя
const containerUserRank = document.querySelector(`.header`);
const userRankComponent = new UserRankComponent();
render(containerUserRank, userRankComponent, RenderPosition.BEFOREEND);

// меню
const containerMain = document.querySelector(`.main`);
// const menuComponent = new FilterComponent(filtersMocks);
const filterController = new FilterController(containerMain, moviesModel);
filterController.render();

// menuComponent._menuFiltersData.forEach(() => {
//   render(containerMain, menuComponent, RenderPosition.AFTERBEGIN);
// });

// работа контроллера
const pageController = new PageController(containerMain, moviesModel);

pageController.renderBoard();
pageController.render(extraMocksMostCommented, extraMocksTopRated);


// рендер кол-ва фильмов
const filmsCountContainer = document.querySelector(`.footer__statistics`);
const allFilmsCountComponent = new AllFilmsCountComponent();
render(filmsCountContainer, allFilmsCountComponent, RenderPosition.AFTERBEGIN);
