import "./MoviesCard.css";

function MoviesCard(props) {
  const {icon, ariaLabel, onClick, buttonName, thumbnail, nameEN, nameRU, duration} = props;

  return (
    <li className="movies-card">
      <img
        src={thumbnail}
        alt={`Миниатюрное изображение постера к фильму ${nameRU}`}
        className="movies-card__thumbnail"
      ></img>
      <div className="movies-card__container">
        <p className="movies-card__name">{nameEN}</p>
        <button type="button" name={buttonName} className={icon} aria-label={ariaLabel} onClick={onClick}></button>
      </div>

      <p className="movies-card__duration">{duration}</p>
    </li>
  );
}

export default MoviesCard;
