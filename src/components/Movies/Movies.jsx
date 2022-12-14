import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Navigation from "../Navigation/Navigation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesLoadMore from "../MoviesLoadMore/MoviesLoadMore";
import Footer from "../Footer/Footer";

import "./Movies.css";
import Header from "../Header/Header";

function Movies({ isClickMenu, handleMenu }) {
  const [like, setLike] = useState("♥︎");

  const handleLike = () => {
    alert(like);
    setLike(like === "♥︎" ? "♡" : "♥︎");
  };

  const items = [...Array(12)].map((item, index) => (
    <MoviesCard
      key={index}
      icon={`movies-card__button movies-card__button_like ${
        index % 3 === 0 && "movies-card__button_active"
      }`}
      ariaLabel="Нравится"
      onClick={handleLike}
      buttonName="like"
    ></MoviesCard>
  ));

  return (
    <div className="movies">
      <Header className={"header"}>
        <HamburgerMenu
          click={isClickMenu}
          handleMenu={handleMenu}
        ></HamburgerMenu>
        {isClickMenu && <div className="background"></div>}
        <Navigation
          className={`menu menu_desktop ${isClickMenu && "menu_active"}`}
          handleMenu={handleMenu}
        />
      </Header>
      <SearchForm></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList>
        {items}
        <li>
          <p className="movies-card-list__container movies-card-list__container_empty movies-card-list__container_empty_hidden">
            Без результатов поиска
          </p>
        </li>
      </MoviesCardList>
      <MoviesLoadMore></MoviesLoadMore>
      <Footer></Footer>
    </div>
  );
}

export default Movies;
