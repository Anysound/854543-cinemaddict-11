const createMenuFilterTemplate = (menuFilterData) => {
  const {name, count} = menuFilterData;
  return (
    `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createMenuTemplate = (menuFiltersData) => {
  const filtersMarkup = menuFiltersData.map((it) => createMenuFilterTemplate(it)).join(`\n`);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export {createMenuTemplate};
