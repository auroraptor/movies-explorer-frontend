import './MoviesCardList.css';

function MoviesCardList({children}) {
  return (
    <ul className="movies-card-list">
      {children}
    </ul>
  );
}

export default MoviesCardList;