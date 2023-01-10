const matched = (str, match) => str.toLowerCase().includes(match.toLowerCase());

export const filter = (movies, params) => {
  const { search, checked } = params;

  if (checked) {
    movies = movies.filter(({ duration }) => duration <= 40);
  }

  movies = movies.filter(
    ({ nameEN, nameRU }) => matched(nameRU, search) || matched(nameEN, search)
  );

  return movies;
};
