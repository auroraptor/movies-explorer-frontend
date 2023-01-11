const matched = (str, match) => str.toLowerCase().includes(match.toLowerCase());

export const filterShortFilm = (m) =>
  m.filter(({ duration }) => duration <= 40);

export const filter = (movies, params) => {
  const { search, checked } = params;

  if (search)
    movies = movies.filter(
      ({ nameRU, nameEN }) => matched(nameRU, search) || matched(nameEN, search)
    );

  if (checked) movies = filterShortFilm(movies);

  return movies;
};
