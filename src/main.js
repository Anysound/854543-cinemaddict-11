// импорт компонентов
import UserRankComponent from './components/userRank.js';
import MenuComponent from './components/menu.js';
import AllFilmsCountComponent from './components/allFilmsCount.js';
import {generateMenuFiltersData} from './mocks/menuFilters.js';
import {render, RenderPosition} from './utils/render.js';
import PageController from './controllers/pageController.js';
import {generateMocks} from './mocks/filmData.js';
// моки
let mocks = generateMocks(15);
let filtersMocks = generateMenuFiltersData();

// звание пользователя
const containerUserRank = document.querySelector(`.header`);
const userRankComponent = new UserRankComponent();
render(containerUserRank, userRankComponent, RenderPosition.BEFOREEND);

// меню
const containerMain = document.querySelector(`.main`);
const menuComponent = new MenuComponent(filtersMocks);

menuComponent._menuFiltersData.forEach(() => {
  render(containerMain, menuComponent, RenderPosition.AFTERBEGIN);
});

// работа контроллера
const pageController = new PageController(containerMain);

pageController.renderBoard();
pageController.render(mocks);

// рендер кол-ва фильмов
const filmsCountContainer = document.querySelector(`.footer__statistics`);
const allFilmsCountComponent = new AllFilmsCountComponent();
render(filmsCountContainer, allFilmsCountComponent, RenderPosition.AFTERBEGIN);
