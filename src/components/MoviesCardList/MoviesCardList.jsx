import "./MoviesCardList.css";

function MoviesCardList({ children, cardListHelpText }) {
  return (
    <ul
      className={`movies-card-list ${
        children?.length === 0 && "movies-card-list_empty"
      }`}
    >
      {children}
      <li>
        <p
          className={`movies-card-list__container movies-card-list__container_empty ${
            children?.length > 0 && "movies-card-list__container_empty_hidden"
          }`}
        >
          {cardListHelpText}
        </p>
      </li>
    </ul>
  );
}

export default MoviesCardList;
