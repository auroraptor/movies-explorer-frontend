import './MoviesCardList.css';

function MoviesCardList({children}) {
  return (
    <div className="movies-card-list">
      {children}
    </div>
  );
}

export default MoviesCardList;