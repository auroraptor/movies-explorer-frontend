import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesLoadMore from "../MoviesLoadMore/MoviesLoadMore";
import Footer from "../Footer/Footer";

import "./Movies.css";
import Header from "../Header/Header";

function Movies({isClickMenu, handleMenu}) {
  const [like, setLike] = useState('♥︎');

  const handleLike = () => {
    alert(like);
    setLike(like === '♥︎' ? "♡" : '♥︎');
  }

  return (
    <div className="movies">
      <Header className={"header"} click={isClickMenu}>
        <HamburgerMenu click={isClickMenu} handleMenu={handleMenu}></HamburgerMenu>
      </Header>
      <SearchForm></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList>
        <MoviesCard
          icon={"movies-card__button"}
          ariaLabel="Нравится"
          onClick={handleLike}
          buttonName="like"
        ></MoviesCard>
        <MoviesCard
          icon={"movies-card__button movies-card__button_active"}
          ariaLabel="Не нравится"
          onClick={handleLike}
          buttonName="like"
        ></MoviesCard>
        <p className="movies-card-list_empty movies-card-list_empty_hidden">
          Без результатов поиска
        </p>
      </MoviesCardList>
      <MoviesLoadMore></MoviesLoadMore>
      <Footer></Footer>
    </div>
  );
}

export default Movies;
