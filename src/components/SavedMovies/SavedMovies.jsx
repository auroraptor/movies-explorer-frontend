import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesLoadMore from "../MoviesLoadMore/MoviesLoadMore";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies() {
  return (
    <div className="saved-movies">
      <SearchForm></SearchForm>
      <MoviesCardList>
        <MoviesCard icon={"movies-card__button movies-card__button_remove"}></MoviesCard>
      </MoviesCardList>
      <MoviesLoadMore></MoviesLoadMore>
    </div>
  );
}

export default SavedMovies;
