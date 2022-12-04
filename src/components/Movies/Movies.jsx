import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

import "./Movies.css";

function Movies() {
  return (
    <div className="movies">
      <SearchForm></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList>
        <MoviesCard></MoviesCard>
      </MoviesCardList>
    </div>
  );
}

export default Movies;
