import "./MoviesLoadMore.css";

function MoviesLoadMore({ loadMore }) {
  return (
    <div className="movies-load-more">
      <button
        type="button"
        name="load-more"
        id="load-more"
        className="movies-load-more__button"
        aria-label="Показать"
        onClick={loadMore}
      >
        Ещё
      </button>
    </div>
  );
}

export default MoviesLoadMore;
