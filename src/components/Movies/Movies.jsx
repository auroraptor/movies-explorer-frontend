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
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
      </MoviesCardList>
      <MoviesLoadMore></MoviesLoadMore>
    </div>
  );
}

export default Movies;
