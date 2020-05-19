const FIRST_FILM_BIRTH_YEAR = 1895;
const NOVADAYS = 2020;
const MIN_RANK = 1;
const MAX_RANK = 10;
const MAX_HOURS_DURATION = 3;
const MAX_MINUTES_DURATION = 60;
const MIN_AMOUNT_OF_COMMENTS = 1;
const MAX_AMOUNT_OF_COMMENTS = 5;

const filmTitles = [
  `Made for each other`,
  `Popeye meets Sinbad`,
  `Sagebrush Trail`,
  `Santa-claus conquers the martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const genres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Film-Noir`
];

const emojis = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`
];

const directors = [
  `Anthony Mann`,
  `Oliver Kahn`,
  `Joachim Löw`
];

const writers = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`
];

const ageLimits = [
  `0+`,
  `6+`,
  `16+`,
  `18+`
];
const actors = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Nancy Caroll`
];

const authors = [
  `Bastian Shweinsteiger`,
  `Miroslav Close`,
  `Peter Schulz`,
  `Michael Ballack`
];

const countries = [
  `USA`,
  `Germany`,
  `England`,
  `France`
];

const messages = [
  `Almost two hours? Seriously?`,
  `Very very old. Meh`,
  `Interesting setting and a good cast`,
  `Boooooring`
];

const descriptionItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const getRandomValue = (array) => array[Math.round(Math.random() * (array.length - 1))];

const getRandomRate = (min, max) => (min + Math.random() * (max - min)).toFixed(1);

const getRandomDigit = (min, max) => (min + Math.floor(Math.random() * (max - min)));

const getRandomComments = () => {
  const comments = [];
  const amountOfComments = getRandomDigit(MIN_AMOUNT_OF_COMMENTS, MAX_AMOUNT_OF_COMMENTS);

  for (let i = 0; i < amountOfComments; i++) {
    comments.push({
      emoji: getRandomValue(emojis),
      commentDate: getRandomDate(),
      author: getRandomValue(authors),
      message: getRandomValue(messages)
    });
  }

  return comments;
};

const getRandomSeveralValues = (items) => {
  let descriptionWords = [];
  let count = Math.round(Math.random() * items.length);
  count = count < 1 ? 2 : count;

  for (let i = 0; i < count; i++) {
    descriptionWords.push(items[i]);
  }

  let description = descriptionWords.join(` `);
  if (description.length > 140) {
    description = `${description.slice(0, 139)}${`...`}`;
  }

  return description;
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomDigit(0, 5);

  targetDate.setDate(targetDate.getDate() + diffValue);

  const formatDate = `${targetDate.getFullYear()}/${targetDate.getMonth() + 1}/${targetDate.getDate()} ${targetDate.getHours()}:${targetDate.getMinutes()}`;
  return parseInt(formatDate, 10);
};

const getRandomGenres = () => {
  const genresAmount = getRandomSeveralValues(genres);
  const genreItems = genresAmount.split(` `);
  let genresTemplate = ``;

  for (let i = 0; i < genreItems.length; i++) {
    genresTemplate += `<span class="film-details__genre">${genreItems[i]}</span>`;
  }

  return genresTemplate;
};

const getRandomDuration = () => {
  const hours = Math.round(Math.random() * MAX_HOURS_DURATION);
  const minutes = Math.round(Math.random() * MAX_MINUTES_DURATION);
  return `${hours}h ${minutes}m`;
};

const generateFilmData = () => {
  return {
    poster: getRandomValue(posters),
    title: getRandomValue(filmTitles),
    rank: getRandomRate(MIN_RANK, MAX_RANK),
    director: getRandomValue(directors),
    writers: getRandomSeveralValues(writers),
    actors: getRandomSeveralValues(actors),
    date: getRandomDate(),
    ageLimit: getRandomValue(ageLimits),
    releaseYear: getRandomDigit(FIRST_FILM_BIRTH_YEAR, NOVADAYS),
    duration: getRandomDuration(),
    country: getRandomValue(countries),
    genre: getRandomValue(genres),
    genres: getRandomGenres(),
    description: getRandomSeveralValues(descriptionItems),
    comments: getRandomComments(),
    isChecked: Math.random() > 0.5,
    isAdded: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    isWatched: Math.random() > 0.5
  };
};

const generateMocks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmData);
};

export {generateFilmData, generateMocks};
