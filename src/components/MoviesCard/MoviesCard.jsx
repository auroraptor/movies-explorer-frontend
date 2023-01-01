import "./MoviesCard.css";

function MoviesCard(props) {
  const {icon, ariaLabel, buttonName, thumbnail, nameEN, nameRU, duration, movie, onMovieClick, savedMovies } = props;

  const isLiked = savedMovies.some((i) => i.id === movie.id);

  const handleLikeClick = () => {
    onMovieClick(movie);
  };

  return (
    <li className="movies-card">
      <img
        src={thumbnail}
        alt={`Миниатюрное изображение постера к фильму ${nameRU}`}
        className="movies-card__thumbnail"
      ></img>
      <div className="movies-card__container">
        <p className="movies-card__name">{nameEN}</p>
        <button type="button" name={buttonName} className={`${icon} ${isLiked && 'movies-card__button_active'}`} aria-label={ariaLabel} onClick={handleLikeClick}></button>
      </div>

      <p className="movies-card__duration">{duration}</p>
    </li>
  );
}

export default MoviesCard;
