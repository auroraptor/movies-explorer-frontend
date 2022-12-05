import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesLoadMore from "../MoviesLoadMore/MoviesLoadMore";

import "./Movies.css";

function Movies() {
  return (
    <div className="movies">
      <SearchForm></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList>
        <MoviesCard icon={"movies-card__button"}></MoviesCard>
         <MoviesCard icon={"movies-card__button movies-card__button_active"}></MoviesCard>
        <p className="movies-card-list_empty movies-card-list_empty_hidden">Без результатов поиска</p>
      </MoviesCardList>
      <MoviesLoadMore></MoviesLoadMore>
    </div>
  );
}

export default Movies;
