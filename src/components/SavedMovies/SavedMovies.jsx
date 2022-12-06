import Header from "../Header/Header";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesLoadMore from "../MoviesLoadMore/MoviesLoadMore";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies() {
  return (
    <div className="saved-movies">
      <Header></Header>
      <SearchForm></SearchForm>
      <MoviesCardList>
        <MoviesCard icon={"movies-card__button movies-card__button_remove"} ariaLabel="Удалить" onClick={() => console.log('remove')} buttonName="remove"></MoviesCard>
      </MoviesCardList>
      <MoviesLoadMore></MoviesLoadMore>
    </div>
  );
}

export default SavedMovies;
