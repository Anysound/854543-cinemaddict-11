const filterTitles = [`Watchlist`, `History`, `Favorites`];

const generateMenuFiltersData = () => {
  return filterTitles.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10)
    };
  });
};

export {generateMenuFiltersData};
