import "./MoviesCard.css";

function MoviesCard(props) {
  const {
    icon,
    ariaLabel,
    buttonName,
    thumbnail,
    nameEN,
    nameRU,
    duration,
    movie,
    onMovieClick,
    savedMovies,
    trailerLink,
  } = props;

  let isLiked = savedMovies?.movies?.some((i) => i.movieId === movie.id);

  const handleClick = (e) => {
    onMovieClick(movie);
  };

  return (
    <li className="movies-card">
      <a
        className="movies-card__trailer-link"
        target="_blank"
        href={trailerLink}
        rel="noreferrer"
      >
        <img
          src={thumbnail}
          alt={`Миниатюрное изображение постера к фильму ${nameRU}`}
          className="movies-card__thumbnail"
        ></img>{" "}
      </a>
      <div className="movies-card__container">
        <p className="movies-card__name" title={nameRU}>{nameEN}</p>
        <button
          type="button"
          name={buttonName}
          className={`${icon} ${isLiked && "movies-card__button_active"}`}
          aria-label={ariaLabel}
          onClick={handleClick}
        ></button>
        <p className="movies-card__duration">{duration}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
