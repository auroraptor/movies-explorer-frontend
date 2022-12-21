import "./MoviesLoadMore.css";

function MoviesLoadMore() {
  return (
    <section className="movies-load-more">
        <button type="button" name="load-more" id="load-more" className="movies-load-more__button" aria-label="Показать" onClick={() => alert("Actually enough")}>Ещё</button>
    </section>
  );
}

export default MoviesLoadMore;
